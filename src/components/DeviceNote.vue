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
                        <span v-else>{{ note }}</span>
                    </div>
                </div>
            </div>

            <!-- Przycisk "Dodaj notatkę" -->
            <div>
                <button class="add-button" @click="addNote">Dodaj notatkę</button>
            </div>

            <!-- Dynamiczne przyciski: Edytuj/Zapisz oraz Usuń -->
            <div v-if="selectedNote !== null">
                <button class="edit-button" v-if="editingIndex === null" @click="editNotes">Edytuj</button>
                <button class="save-button" v-else @click="saveNotes">Zapisz</button>
                <button class="delete-button" @click="deleteNote">Usuń</button>
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
            roomNumber: 95, // Numer sali
            deviceType: 'mikrofon', // Typ urządzenia
            notes: [], // Pusta tablica notatek, która zostanie zapełniona
            selectedNote: null, // Index klikniętej notatki, null oznacza brak zaznaczenia
            editingIndex: null, // Index aktualnie edytowanej notatki
            editedNote: '' // Zmienna przechowująca notatkę podczas edycji
        };
    },
    mounted() {
        this.roomNumber = this.$route.params.room_number;
        const selectedDevice = JSON.parse(localStorage.getItem('selectedDevice'));
        if (selectedDevice) {
            this.deviceType = selectedDevice.dev_type;
            this.fetchNotes(selectedDevice.device_id);
            console.log(selectedDevice.device_id)
        }
    },
    methods: {
        toggleNoteSelection(index) {
            if (this.editingIndex === null) {
                this.selectedNote = this.selectedNote === index ? null : index;
            }
        },
        editNotes() {
            this.editingIndex = this.selectedNote;
            this.editedNote = this.notes[this.selectedNote];
        },
        cancelEdit() {
            this.editingIndex = null;
            this.editedNote = '';
            this.selectedNote = null;
        },
        async fetchNotes(device_id) {
            try {
                const token = localStorage.getItem('access_token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`http://127.0.0.1:8000/notes/devices/${device_id}`, { headers });
                if (response.data && Array.isArray(response.data)) {
                    this.notes = response.data.map(noteObj => noteObj.note);
                } else {
                    this.notes = [];
                }
            } catch (error) {
                console.error('Błąd podczas pobierania notatek:', error);
                this.notes = [];
            }
        },
        async saveNotes() {
            try {
                const selectedDevice = JSON.parse(localStorage.getItem('selectedDevice'));
                const device_id = selectedDevice.device_id;
                const token = localStorage.getItem('access_token');
                const headers = { Authorization: `Bearer ${token}` };

                if (this.editingIndex >= this.notes.length - 1) {
                    // Nowa notatka
                    const response = await axios.post(
                        `http://127.0.0.1:8000/notes/devices/`,
                        { note: this.editedNote, device_id: device_id },
                        { headers }
                    );
                    this.notes[this.editingIndex] = this.editedNote;
                    console.log('Nowa notatka dodana', response.data);
                } else {
                    // Edycja istniejącej notatki
                    const response = await axios.put(
                        `http://127.0.0.1:8000/notes/devices/${device_id}`,
                        { note: this.editedNote },
                        { headers }
                    );
                    this.notes[this.editingIndex] = this.editedNote;
                    console.log('Notatka zaktualizowana', response.data);
                }

                // Resetuj stany po zapisaniu
                this.editingIndex = null;
                this.editedNote = '';
            } catch (error) {
                console.error('Błąd podczas zapisywania notatki:', error);
            }
        },
        async deleteNote() {
            try {
                const selectedDevice = JSON.parse(localStorage.getItem('selectedDevice'));
                const device_id = selectedDevice.device_id;
                const token = localStorage.getItem('access_token');
                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.delete(`http://127.0.0.1:8000/notes/devices/${device_id}/${this.selectedNote}`, { headers });
                this.notes.splice(this.selectedNote, 1);
                this.editingIndex = null;
                this.editedNote = '';
                this.selectedNote = null;
                console.log('Notatka usunięta', response.data);
            } catch (error) {
                console.error('Błąd podczas usuwania notatki:', error);
            }
        },
        addNote() {
            this.notes.push('Nowa notatka');
            this.selectedNote = this.notes.length - 1;
            this.editingIndex = this.selectedNote;
            this.editedNote = this.notes[this.selectedNote];
        }
    }
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
}

.selected-note {
    background-color: #0083BB;
    color: white;
}

textarea {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 18px;
    width: 100%;
    padding: 10px;
    resize: none;
}

.save-button,
.cancel-button,
.delete-button,
.add-button,
.edit-button {
    background-color: #0083BB;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 10px 30px;
    font-size: 18px;
    cursor: pointer;
    margin: 10px;
}

.save-button:hover,
.cancel-button:hover,
.delete-button:hover,
.add-button:hover,
.edit-button:hover {
    background-color: #007ecc;
}

h1 {
    font-family: $font-heading;
}
</style>
