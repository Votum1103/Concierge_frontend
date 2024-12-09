<template>

    <div class="container">
        <nav>
            <BackButton class="back-button" routeName="MainWindow" buttonText="Wróć">
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

            <!-- Kontener na przyciski -->
            <div class="button-container">
                <button class="add-button" v-if="!isAdding && editingIndex === null" @click="addNote">Dodaj
                    notatkę</button>

                <button class="save-button" v-if="isAdding" @click="saveNewNote()">Zapisz</button>
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
</template>

<script>
import api from '../api';
import BackButton from './BackButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    components: {
        BackButton,
        WUoT_Logo
    },
    data() {
        return {
            notes: [],
            roomNumber: null,
            devType: null,
            devVersion: null,
            newNote: '',
            editingIndex: null,
            selectedNote: null,
            isAdding: false,
            editedNote: "",
        };
    },
    mounted() {
        const selectedDevice = JSON.parse(sessionStorage.getItem('selectedDevice'));
        this.roomNumber = selectedDevice.room_number;
        this.devType = selectedDevice.dev_type;
        this.devVersion = selectedDevice.dev_version;
        console.log(this.devType, this.devVersion);
        this.fetchNotes(selectedDevice.device_id);
    },
    methods: {
        async fetchNotes(device_id) {
            try {
                const response = await api.get(`/notes/devices/?device_id=${device_id}`);
                this.notes = response.data.map(noteObj => ({ "id": noteObj.id, "device": device_id, "note": noteObj.note }));
            } catch (error) {
                if (error.status == "404") {
                    this.notes = [];
                }
            }
        },
        addNote() {
            this.notes.push({ text: '', isEditing: true });
            this.editingIndex = this.notes.length - 1;
            this.isAdding = true;
            this.editedNote = this.notes[this.editingIndex].note;
        },
        toggleNoteSelection(index) {
            if (this.editingIndex === null) {
                this.selectedNote = this.selectedNote === index ? null : index;
            }
        },
        cancelEditingOrAdding() {
            if (this.isAdding) {
                this.notes.pop(); // Usuń pustą notatkę, jeśli jest dodawana
                this.isAdding = false;
            }
            this.editingIndex = null;
            this.editedNote = '';
            this.selectedNote = null;
        },
        async saveNewNote() {
            const selectedDevice = JSON.parse(sessionStorage.getItem('selectedDevice'));
            const device_id = selectedDevice.device_id;

            try {
                await api.post('/notes/devices/', {
                    device_id: device_id,
                    note: this.editedNote
                });
                this.notes[this.editingIndex].note = this.editedNote;
                this.editingIndex = null;
                this.isAdding = false;
                this.editedNote = '';
                this.fetchNotes(selectedDevice.device_id);
            } catch (error) {
                console.error("Błąd podczas dodawania notatki: ", error);
            }
        },
        editNote() {
            this.editingIndex = this.selectedNote;
            this.editedNote = this.notes[this.selectedNote].note;
            this.isAdding = false;
        },
        async saveEditedNote() {
            const noteId = this.notes[this.editingIndex].id;

            try {
                await api.put(`/notes/devices/${noteId}`, { note: this.editedNote },);
                this.notes[this.editingIndex].note = this.editedNote;
                this.editingIndex = null;
                this.editedNote = '';
            } catch (error) {
                console.error('Błąd podczas zapisywania notatki:', error);
            }
        },
        async deleteNote() {
            const noteId = this.notes[this.selectedNote].id;
            const selectedDevice = JSON.parse(sessionStorage.getItem('selectedDevice'));

            try {
                await api.delete(`/notes/devices/${noteId}`);
                this.notes.pop();
                this.editingIndex = null;
                this.editedNote = '';
                this.selectedNote = null;
            } catch (error) {
                console.error('Błąd podczas usuwania notatki:', error);
            }
            this.fetchNotes(selectedDevice.device_id);
        }
    },
};
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

.note-editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $text-color;
    height: 100vh;
    padding: 20px;
}

nav {
    display: flex;
    justify-content: left;
    text-align: left;
    height: 50px;
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
    border: 2px solid $primary-color;
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
</style>
