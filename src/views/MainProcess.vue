<template>
    <GoogleFonts />

    <div class="container">
        <nav>
            <WUoT_Logo />
        </nav>
        <header :class="headerClass">
            <div class="employee-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="60px" fill="currentColor" class="bi bi-file-person-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
                </svg>
                <h1 id="employee-data">{{ username }} {{ surname }}</h1>
            </div>
            <h2>{{ role }}</h2>
            <h2>Wydział {{ faculty }}</h2>
        </header>
        <main>
            <div class="header-container">
                <div class="header-tab">
                    <div class="header-items">
                        <div class="header-item">Godzina</div>
                        <div class="header-item">Sala</div>
                        <div class="header-item ">Przedmiot</div>
                        <div class="header-item">Wesja</div>
                    </div>
                    <div v-show="!isSmallScreen" id="permissions-header">Uprawnienia</div>
                </div>

                <div class="table-section">
                    <div class="items-table">
                        <table>
                            <tbody>
                                <tr class="table-row" v-for="(item, index) in items" :key="index">
                                    <td class="table-cell">{{ item.time }}</td>
                                    <td class="table-cell">{{ item.roomNumber }}</td>
                                    <td class="table-cell">{{ item.items[0] }}</td>
                                    <td class="table-cell">{{ item.items[1] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="permissions-table">
                        <table>
                            <tbody>
                                <tr class="table-row-permissions" v-for="(permission, index) in permissions"
                                    :key="index">
                                    <td class="table-cell">{{ permission.col1 }}</td>
                                    <td class="table-cell">{{ permission.col2 }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-if="isSmallScreen" id="permissions-header-small-screen">
                    <p>Uprawnienia</p>
                </div>

                <div class="info-section">
                    <aside class="info-item" v-if="issued && issued.length">Wydano: {{ issued }}</aside>
                    <aside class="info-item" v-if="received && received.length">Odebrano: {{ received }}</aside>
                </div>
            </div>

            <section class="scan-section">
                <h1>Zeskanuj kod klucza, mikrofonu lub pilota</h1>
                <div class="loader"></div>

                <div class="button-group">
                    <RouteButton class="primary-button" routeName="AcceptOperationByConcierge" buttonText="Zakończ">
                        <template #icon>
                        </template>
                    </RouteButton>
                    <RouteButton class="secondary-button" routeName="GiveManuallyItemCode"
                        buttonText="Wpisz kod ręcznie">
                        <template #icon>
                        </template>
                    </RouteButton>
                    <RouteButton class="secondary-button" routeName="MainProcessNotes" buttonText="Dodaj notatkę">
                        <template #icon>
                        </template>
                    </RouteButton>
                </div>
            </section>
        </main>
    </div>
</template>
<script setup>

import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';
import RouteButton from '../components/RouteButton.vue';
import api from '../api';

import { ref } from 'vue';
import { onMounted } from 'vue';
import { onBeforeMount } from 'vue';



const username = ref('');
const surname = ref('');
const role = ref('');
const faculty = ref('');
const userId = ref('');
// const users = ref([]);
const items = ref([]);
const permissions = ref([]);
const issued = ref([]);
const received = ref([]);
const error = ref('');
const lastPage = sessionStorage.getItem('lastPage') || '';
let isSmallScreen = window.innerWidth <= 768;

function headerClass() {
    if (lastPage.value === 'UserLogin') {
        return 'text-white';
    } else if (lastPage === 'UnauthorizedUserGiveItem' || lastPage === 'UpdateUACredentials') {
        return 'text-red';
    }
    return '';
}
onMounted(() => {
    loadUserData();
    fetchLoggedUser();
    fetchPermissions();
    fetchUnapprovedOperations();
    window.addEventListener("resize", handleResize());
    handleResize();
},)
onBeforeMount(() => {
    window.removeEventListener("resize", handleResize());
})

function handleResize() {
    isSmallScreen = window.innerWidth <= 768;
}
function loadUserData() {
    username.value = sessionStorage.getItem('username') || 'Nieznane imię';
    userId.value = sessionStorage.getItem('userId');
    surname.value = sessionStorage.getItem('surname') || 'Nieznane nazwisko';
    role.value = sessionStorage.getItem('role') || 'Rola nieznana';
    faculty.value = sessionStorage.getItem('faculty') || 'nieznany';
}
async function fetchPermissions() {
    try {
        const response = await api.get(`/permissions/active/?user_id=${userId.value}`);
        const roomNumbers = response.data.map(permission => permission.room.number);

        permissions.value = [];
        for (let i = 0; i < roomNumbers.length; i += 2) {
            permissions.value.push({
                col1: roomNumbers[i],
                col2: roomNumbers[i + 1] || '',
            });
        }
    } catch (error) {
        console.warn('Błąd przy pobieraniu uprawnień:', error);
    }
}
async function fetchLoggedUser() {
    try {
        const response = await api.get(`/operations/users/${userId.value}`);
        const operations = response.data;

        items.value = operations.map(op => ({
            userIds: [op.session.user_id],
            roomNumber: op.device.room.number,
            time: formatTime(op.timestamp),
            items: formatItems(op),
        }));
    } catch (error) {
        console.warn('Błąd przy pobieraniu informacji o użytkowniku:', error);
    }
}

async function fetchUnapprovedOperations() {

    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
        error.value = "Brak aktywnej sesji. Upewnij się, że jesteś zalogowany.";
        return;
    }

    try {
        const response = await api.get('/operations/unapproved', {
            params: {
                session_id: sessionId,
            }
        });

        const operations = response.data;

        const issuedList = [];
        const receivedList = [];

        for (const operation of operations) {
            const roomNumber = operation.device.room.number;
            const itemType = operation.device.dev_type;

            const formattedEntry = `${roomNumber} (${itemType})`;

            if (operation.operation_type === 'pobranie') {
                issuedList.push(formattedEntry);
            } else {
                receivedList.push(formattedEntry);
            }
        }

        issued.value = issuedList.join(', ');
        received.value = receivedList.join(', ');

    } catch (error) {
        console.error("Błąd podczas pobierania niezatwierdzonych operacji:", error);
        error.value = "Wystąpił błąd podczas pobierania danych.";
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
// function getUserNames(userIds) {
//     const names = userIds.map(id => {
//         const user = users.value.find(user => user.id === id);
//         return user ? `${user.name} ${user.surname}` : 'Nieznany użytkownik';
//     });
//     return names.join(', ');
// }
// function getPermissionsForUser(employeeId) {
//     return permissions.value
//         .filter(permission => permission.employeeId === employeeId)
//         .map(permission => permission.roomNumber)
//         .join(', ');
// }
</script>
<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    background: $background-color url('../assets/back.jpg') top no-repeat;
    background-size: cover;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-main;
    height: 100vh;
    width: 100vw;
}

h2 {
    font-size: 1.125rem;
}

nav {
    text-align: left;
    height: 50px;
}

header {
    margin-bottom: 5%;
}

.employee-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
}

#employee-data {
    margin-left: 20px;
    display: inline;
    font-size: 2.25rem;
}

.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.button-group {
    display: flex;
    width: 70%;
    max-width: 900px;
    min-width: 400px;
    justify-content: space-between;
    margin-bottom: 10px;
}

.header-tab {
    display: flex;
    width: 90%;
    min-width: 400px;
    margin-bottom: 10px;
    justify-content: space-evenly;

}

.header-item {
    width: 24.8%;
    font-size: 20px;
}

.header-items {
    display: flex;
    width: 60%;
}

.table-section {
    display: flex;
    flex-direction: row;
    width: 90%;
    align-items: center;
    justify-content: space-evenly;
}

.items-table,
.permissions-table {
    display: flex;
    align-items: flex-start;
    background-color: #4D4D4D;
    border-radius: 15px;
    max-height: 200px;
    height: 200px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.items-table {
    width: 60%;
}

.permissions-table {
    width: 18%;
}

#permissions-header {
    width: 18%;
    font-size: 20px;
}

.table-cell {
    text-align: center;
    height: 50px;
    width: 100%;
    font-size: 1.25rem;
    text-wrap: nowrap;
}

.table-row {
    grid-template-columns: repeat(4, 1fr);
}

.table-row-permissions {
    grid-template-columns: repeat(2, 1fr);
}

.items-table table,
.permissions-table table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.items-table td:nth-child(1) {
    width: 1.5fr;
}

.header-item-large {
    width: 60%;
}

.info-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 75%;
    max-width: 75%;
    min-width: 400px;
    gap: 5px;
    overflow-x: auto;
    white-space: nowrap;
}

.info-item {
    font-size: 0.925rem;
    overflow-x: auto;
}

.scan-section {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}

.scan-section h1 {
    font-size: 2.5rem;
}

.loader {
    color: $text-color;
    font-size: 20px;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: translateZ(0);
    animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
}

.text-white {
    color: $text-color;
}

.text-red {
    color: $error-color;
}

@keyframes mltShdSpin {

    0%,
    5%,
    95%,
    100% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em,
            0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    10%,
    59% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
            -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
            -0.297em -0.775em 0 -0.477em;
    }

    20%,
    38% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
            -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
            -0.749em -0.34em 0 -0.477em;
    }
}

@keyframes round {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.button-group {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
}



.primary-button,
.secondary-button {
    color: $text-color;
    font-size: 1.2em;
    width: 25%;
    min-width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: transform 0.3s;
}

.primary-button {
    border: none;
    background-color: $primary-color;
}

.secondary-button {
    border: 3px solid $primary-color;
    background-color: transparent;
}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
}

::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: rgb(185, 182, 182);
    border-radius: 10px;
}

@media (max-width: 1040px) {
    .container {
        overflow: auto;
    }

    .button-group {
        gap: 10px;
        flex-direction: column;
        align-items: center;
    }

    .button-group button {
        height: 45px;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }

    #permissions-header {
        display: block;
    }

    #permissions-header-small-screen {
        display: none;
    }
}

@media (max-width: 768px) {

    .logo {
        display: none;
    }

    .table-section {
        flex-direction: column;
        align-items: center;
    }

    .header-tab {
        flex-direction: column;
        align-items: center;
    }

    #permissions-header {
        display: none;
    }

    #permissions-header-small-screen {
        display: block;
        font-size: 20px;
    }

    .permissions-table {
        margin-top: 10px;
        height: 150px;
        width: 35%;
    }

    .header-items {
        width: 100%;
    }

    .items-table {
        margin-bottom: 10px;
        width: 100%;
    }
}

@media (max-width: 560px) {

    .container {
        width: 560px;
    }

    .header-tab,
    .table-section {
        justify-content: center;
    }
}

@media (max-height: 800px) {
    .button-group {
        margin-top: 0px;
    }
}
</style>