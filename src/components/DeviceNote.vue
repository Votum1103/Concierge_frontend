<template>

    <body>
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
                <p>{{ deviceType }}</p>
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
                <button class="add-button" v-if="!isAdding" @click="addNote">Dodaj notatkę</button>

                <button class="save-button" v-if="isAdding" @click="saveNewNote()">Zapisz</button>
                <button class="cancel-button" v-if="isAdding" @click="cancelAdding">Anuluj</button>

                <button class="edit-button" v-if="selectedNote !== null && editingIndex === null && !isAdding"
                    @click="editNote">Edytuj</button>
                <button class="save-button" v-if="selectedNote !== null && editingIndex !== null && !isAdding"
                    @click="saveEditedNote">Zapisz</button>

                <button class="delete-button" v-if="selectedNote !== null && !isAdding"
                    @click="deleteNote">Usuń</button>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
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
        this.devType = selectedDevice.dev_type;
        this.devVersion = selectedDevice.dev_version;
        this.notes = this.fetchNotes(selectedDevice.device_id);
        console.log(this.notes);



    },
    methods: {
        async fetchNotes(device_id) {
            try {
                const accesToken = sessionStorage.getItem('access_token');

                const headers = { Authorization: `Bearer ${accesToken}` };
                const response = await axios.get(`http://127.0.0.1:8000/notes/devices/${device_id}`, { headers });
                console.log("fefwfew")
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
            this.editedNote = this.notes[this.editingIndex].note
            console.log(this.notes[this.editingIndex].note)

        },
        toggleNoteSelection(index) {
            if (this.editingIndex === null) {
                this.selectedNote = this.selectedNote === index ? null : index;
            }
            console.log(this.notes[this.selectedNote]);
        },
        cancelAdding() {
            this.selectedNote = null;
            this.isAdding = false;
            this.notes.pop();
            this.editedNote = '';
            this.editingIndex = null;
        },
        async saveNewNote() {
            const accesToken = sessionStorage.getItem('access_token');
            const headers = { Authorization: `Bearer ${accesToken}` };
            const selectedDevice = JSON.parse(sessionStorage.getItem('selectedDevice'));

            const device_id = selectedDevice.device_id;
            console.log("device_id: ", device_id);

            try {
                const response = await axios.post('http://127.0.0.1:8000/notes/devices/', { device_id: device_id, note: this.editedNote }, { headers });

                this.notes[this.editingIndex].note = this.editedNote;

                this.editingIndex = null;
                this.isAdding = false;
                this.editedNote = '';
                this.fetchNotes(selectedDevice.device_id);

                console.log("Dodano następującą notatkę: ", response.data);
            } catch (error) {
                console.error("Błąd podczas dodawania notatki: ", error);
            }
        },

        editNote() {
            this.editingIndex = this.selectedNote;
            console.log(this.editingIndex);
            this.editedNote = this.notes[this.selectedNote].note;
            console.log(this.notes[this.selectedNote].note);
            this.isAdding = false;
        },

        async saveEditedNote() {
            const accessToken = sessionStorage.getItem('access_token')
            const headers = { Authorization: `Bearer ${accessToken}` }
            const noteId = this.notes[this.editingIndex].id

            try {
                const response = await axios.put(`http://127.0.0.1:8000/notes/devices/${noteId}`, { note: this.editedNote },
                    { headers });

                console.log(response.data)

                this.notes[this.editingIndex].note = this.editedNote;

                this.editingIndex = null;
                this.editedNote = '';


            } catch (error) {
                console.error('Błąd podczas zapisywania notatki:', error);
            }


        },

        async deleteNote() {
            const accesToken = sessionStorage.getItem('access_token');
            const headers = { Authorization: `Bearer ${accesToken}` };
            console.log(this.notes[this.selectedNote].id);
            const noteId = this.notes[this.selectedNote].id;
            const selectedDevice = JSON.parse(sessionStorage.getItem('selectedDevice'));

            try {
                const response = await axios.delete(`http://127.0.0.1:8000/notes/devices/${noteId}`, { headers })

                this.notes.pop();
                this.editingIndex = null;
                this.editedNote = '';
                this.selectedNote = null;

                console.log('Notatka usunięta', response.data);
            } catch (error) {
                console.error('Błąd podczas usuwania notatki:', error);
            }
            this.fetchNotes(selectedDevice.device_id);
        }
    },

};
</script>

<style lang="scss" scoped>
$primary-color: #0083BB;
$text-color: #FFFFFF;
$background-color: rgb(41, 38, 38);
$font-main: 'Open Sans', sans-serif;
$font-heading: 'Ubuntu', sans-serif;

body {
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
    color: white;
    height: 100vh;
    padding: 20px;
}

nav {
    display: flex;
    justify-content: left;
    text-align: left;
    height: 50px;
}

.back-button {
    text-decoration: none;
    margin: 15px;
    display: inline-flex;
    align-items: center;
    color: #FFFFFF;
    background-color: transparent !important;
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
}

.note-box {
    padding: 15px;
    border: 2px solid #0083BB;
    border-radius: 8px;
    font-size: 18px;
    background-color: transparent;
    color: white;
    min-height: 50px;
    margin-bottom: 0.5em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: normal;
    word-wrap: break-word;
    max-height: 150px;
    overflow-y: auto; 
}

.selected-note {
    background-color: #0083BB;
}

textarea {
    font-family: $font-main;
    width: 100%;
    height: 100%;
    background-color: transparent;
    color: white;
    font-size: 18px;
    border: none;
    outline: none;
    resize: vertical; 
    min-height: 50px; 
    max-height: 300px; 
    overflow-y: auto; 
}

/* Stylizacja przycisków */
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
    background-color: #0083BB;
    color: white;
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
    background-color: #007ecc;
}
</style>
