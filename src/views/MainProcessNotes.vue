<template>
    <div class="container">
        <GoogleFonts />
        <nav>
            <BackButton class="back-button" routeName="MainProcess" buttonText="Wróć">
                <template #icon>
                    <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                    </svg>
                </template>
            </BackButton>
            <WUoT_Logo />
        </nav>
        <div class="mainContent">
            <div class="leftsideContent">
                <h2>Wybierz przedmiot</h2>
                <div class='device-buttons'>
                    <button v-for="(item, index) in items" :key="index" class="device-button" @click="fetchNotes(item)">
                        {{ item.roomNumber }} - {{ item.devType }}
                    </button>
                </div>
            </div>
            <div class="note-editor">
                <div class="note-header">
                    <h1>Sala: {{ roomNumber }}</h1>
                    <p>{{ devType }} wersja {{ devVersion }}</p>
                </div>
                <div class="notes-section">
                    <h2 class="note-h2">Notatki</h2>
                    <div class="notes-container">
                        <div class="note-box" v-for="(note, index) in notes" :key="index"
                            :class="{ 'selected-note': selectedNote === index }" @click="toggleNoteSelection(index)">
                            <textarea v-if="editingIndex === index" v-model="editedNote"></textarea>
                            <span v-else>{{ note.note }}</span>
                        </div>
                    </div>
                </div>

                <div class="button-container">
                    <button class="add-button" v-if="!isAdding && editingIndex === null && currentItem"
                        @click="addNote">Dodaj
                        notatkę</button>
                    <button class="save-button" v-if="isAdding" @click="saveNewNote">Zapisz</button>
                    <button class="save-button" v-if="editingIndex !== null && !isAdding"
                        @click="saveEditedNote">Zapisz</button>
                    <button class="cancel-button" v-if="isAdding || editingIndex !== null"
                        @click="cancelEditingOrAdding">Anuluj</button>
                    <button class="edit-button" v-if="selectedNote !== null && editingIndex === null && !isAdding"
                        @click="editNote">Edytuj</button>
                    <button class="delete-button" v-if="selectedNote !== null && editingIndex === null && !isAdding"
                        @click="deleteNote">Usuń</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BackButton from '../components/BackButton.vue';
import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';
import api from '../api';

import { ref } from 'vue';
import { onMounted } from 'vue';

const userId = ref('');
// const itemId = ref('');
const items = ref([]);
const notes = ref([]);
const currentItem = ref(null);
const roomNumber = ref(null);
const devType = ref(null);
const devVersion = ref(null);
// const newNote = ref('');
const editingIndex = ref(null);
const selectedNote = ref(null);
let isAdding = ref(false);
const editedNote = ref("");

onMounted(() => {
    loadUserData()
    fetchLoggedUser()
})

function loadUserData() {
    userId.value = sessionStorage.getItem('userId');
}

async function fetchLoggedUser() {
    try {
        const response = await api.get(`/operations/users/${userId.value}`);
        const operations = response.data;

        const serverItems = operations.map(op => ({
            userIds: [op.session.user_id],
            roomNumber: op.device.room?.number || 'Nieznany pokój',
            time: formatTime(op.timestamp),
            items: formatItems(op),
            id: op.device.id,
            devType: op.device.dev_type || 'Nieznany typ',
        }));

        const sessionId = sessionStorage.getItem("sessionId");
        if (!sessionId) {
            console.error("Brak aktywnej sesji. Upewnij się, że jesteś zalogowany.");
            return;
        }

        let unapprovedDevices = [];
        try {
            const unapprovedDevicesResponse = await api.get('/operations/unapproved', {
                params: { session_id: sessionId }
            });

            unapprovedDevices = unapprovedDevicesResponse.data.map(ud => ({
                id: ud.device.id,
                devType: ud.device.dev_type || 'Nieznany typ',
                devVersion: ud.device.dev_version,
                roomNumber: ud.device.room?.number || 'Nieznany pokój',
                items: formatItems(ud),
            }));
        } catch (error) {
            console.warn("Błąd podczas pobierania niezatwierdzonych urządzeń:", error);
            unapprovedDevices = [];
        }

        const serverItemIds = new Set(serverItems.map(item => item.id));
        const filteredUnapprovedDevices = unapprovedDevices.filter(
            device => !serverItemIds.has(device.id)
        );

        items.value = [...filteredUnapprovedDevices, ...serverItems];
    } catch (error) {
        console.error('Błąd przy pobieraniu danych użytkownika:', error);
    }
}

async function fetchNotes(item) {
    notes.value = [];
    selectedNote.value = null;
    currentItem.value = item;

    roomNumber.value = item.roomNumber;
    devType.value = item.items[0] || 'Brak typu';
    devVersion.value = item.items[1] || 'Brak wersji';

    try {
        const response = await api.get(`/notes/devices/?device_id=${item.id}`);
        notes.value = response.data.map(noteObj => ({
            id: noteObj.id,
            device: item.id,
            note: noteObj.note
        }));
    } catch (error) {
        if (error.status === "404") {
            notes.value = [];
        }
    }
}

function addNote() {
    if (!currentItem.value) {
        console.error("Nie wybrano przedmiotu!");
        return;
    }

    notes.value.push({ id: null, device: currentItem.value.id, note: '', isEditing: true });
    editingIndex.value = notes.value.length - 1;
    isAdding.value = true;
    editedNote.value = '';
}

function toggleNoteSelection(index) {
    if (editingIndex.value === null) {
        selectedNote.value = selectedNote.value === index ? null : index;
    }
}

function cancelEditingOrAdding() {
    if (isAdding.value) {
        notes.value.pop();
        isAdding.value = false;
    }
    editingIndex.value = null;
    editedNote.value = '';
    selectedNote.value = null;
}

async function saveNewNote() {
    if (!currentItem.value) {
        console.error("Nie wybrano przedmiotu!");
        return;
    }

    try {
        const newNote = {
            device_id: currentItem.value.id,
            note: editedNote.value
        };

        const response = await api.post('/notes/devices/', newNote);
        const savedNote = response.data;
        notes.value[editingIndex.value] = { ...savedNote, isEditing: false };
        editingIndex.value = null;
        isAdding.value = false;
        editedNote.value = '';
    } catch (error) {
        console.error("Błąd podczas dodawania notatki: ", error);
    }
}

function editNote() {
    editingIndex.value = selectedNote.value;
    editedNote.value = notes.value[selectedNote.value].note;
    isAdding.value = false;
}

async function saveEditedNote() {
    const noteId = notes.value[editingIndex.value].id;

    try {
        await api.put(`/notes/devices/${noteId}`, { note: editedNote.value });
        notes.value[editingIndex.value].note = editedNote.value;
        editingIndex.value = null;
        editedNote.value = '';
    } catch (error) {
        console.error('Błąd podczas zapisywania notatki:', error);
    }
}

async function deleteNote() {
    const noteId = notes.value[selectedNote.value].id;

    try {
        await api.delete(`/notes/devices/${noteId}`);
        notes.value.splice(selectedNote.value, 1);
        selectedNote.value = null;
        editingIndex.value = null;
        editedNote.value = '';
    } catch (error) {
        console.error('Błąd podczas usuwania notatki:', error);
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
}

function formatItems(operation) {
    const items = [];
    if (operation.device.dev_type) items.push(operation.device.dev_type);
    if (operation.device.dev_version) items.push(operation.device.dev_version);
    return items;
}
</script>


<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    background-color: $background-color;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-main;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
}

nav {
    display: flex;
    justify-content: left;
    text-align: left;
    height: 50px;
}

.mainContent {
    display: flex;
    width: 100%;
}

.note-editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $text-color;
    height: 100vh;
    width: 58%;
    padding: 20px;
}

.note-header {
    text-align: center;
    margin-bottom: 20px;
}

.note-header h1 {
    font-size: 32px;
    font-weight: bold;
}

.note-header p {
    font-size: 24px;
}

.leftsideContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 630px;
    width: 16%;
    margin-top: 100px;
    margin-left: 5%;
}

.device-buttons {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: grey $background-color;
}

.device-button {
    background-color: transparent;
    color: $text-color;
    width: 75%;
    border: 3px solid $primary-color;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    flex-shrink: 0;
}

.room-button:hover {
    background-color: lighten($primary-color, 10%);
}

.notes-section {
    width: 100%;
    max-width: 600px;
    margin-bottom: 2em;
}

.notes-section h2 {
    font-size: 28px;
    text-align: center;
    margin-bottom: 2em;
}

.notes-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: grey $background-color;
}

.notes-container::-webkit-scrollbar {
    width: 8px;
}

.notes-container::-webkit-scrollbar-track {
    background: $background-color;
    border-radius: 10px;
}

.notes-container::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
    border: 2px solid $background-color;
}

.notes-container::-webkit-scrollbar-thumb:hover {
    background-color: lighten($primary-color, 10%);
}

.note-box {
    padding: 15px;
    border: 3px solid $primary-color;
    border-radius: 8px;
    font-size: 18px;
    background-color: transparent;
    color: $text-color;
    min-height: 50px;
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: background-color $transition-duration ease;
    white-space: normal;
    word-wrap: break-word;
    max-height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
}

.selected-note {
    background-color: $primary-color;
}

textarea {
    font-family: $font-main;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: $text-color;
    font-size: 18px;
    border: none;
    outline: none;
    resize: vertical;
    min-height: 50px;
    max-height: 300px;
    overflow-y: auto;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.add-button,
.edit-button,
.save-button,
.delete-button,
.cancel-button {
    background-color: $primary-color;
    color: $text-color;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.add-button:hover,
.edit-button:hover,
.save-button:hover,
.delete-button:hover,
.cancel-button:hover {
    background-color: $primary-color;
}

@media (max-width: 950px) {
    .device-button {
        font-size: 12px;

    }

    .leftsideContent {
        width: 20%;
    }

    .note-box {
        font-size: 14px;
        width: 80%;
    }

    .note-editor {
        padding-left: 50px;
    }

    .notes-container {
        align-items: center;
    }

}
</style>