<template>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <GoogleFonts />
    </head>

    <body>
        <nav>
            <WUoT_Logo />
        </nav>

        <main>
            <header>
                <div class="employee-container ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60px" fill="currentColor"
                        class="bi bi-file-person-fill" viewBox="0 0 16 16">
                        <path
                            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
                    </svg>
                    <h1 id="employee-data">Jan Kowalski</h1>
                </div>
                <h2>Pracownik</h2>
                <h2>Wydział: Geodezji i Kartografii</h2>
            </header>

            <div class="header-container">
                <div class="header-tab">
                    <div class="header-items">
                        <div class="header-item">Godzina</div>
                        <div class="header-item">Sala</div>
                        <div class="header-item header-item-large">Pobrane</div>
                    </div>
                    <div id="permissions-header">Uprawnienia</div>
                </div>

                <div class="table-section">
                    <div class="items-table">
                        <table>
                            <tbody>
                                <tr class="table-row" v-for="(item, index) in items" :key="index">
                                    <!-- #TODO zmienić na  z bazy -->
                                    <td class="table-cell">{{ getUserNames(item.userIds) }}</td>
                                    <td class="table-cell">{{ item.roomNumber }}</td>
                                    <td class="table-cell">{{ item.items[0] }}</td>
                                    <td class="table-cell">{{ item.items[1] }}</td>
                                    <td class="table-cell">{{ item.items[2] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="permissions-table">
                        <table>
                            <tbody>
                                <tr class="table-row">
                                    <td class="table-cell">14</td>
                                    <td class="table-cell">25</td>
                                </tr>
                                <tr class="table-row">
                                    <td class="table-cell">89</td>
                                    <td class="table-cell">100A</td>
                                </tr>
                                <tr class="table-row">
                                    <td class="table-cell">401</td>
                                    <td class="table-cell">415</td>
                                </tr>
                                <tr class="table-row">
                                    <td class="table-cell">422A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="info-section">
                    <aside class="info-item">Wydano:</aside>
                    <aside class="info-item">Odebrano:</aside>
                </div>
            </div>
            <!-- <div>
                <h1>Lista użytkowników</h1>
                <ul>
                    <li v-for="user in users" :key="user.id">
                        {{ user.name }} {{ user.surname }} Imię i nazwisko 
                    </li>
                </ul>
            </div> -->

            <section class="scan-section">
                <h1>Zeskanuj kod przedmiotu</h1>
                <div class="loader"></div>

                <div class="button-group">
                    <RouteButton class="primary-button" routeName="MainWindow" buttonText="Zakończ">
                        <template #icon>
                        </template>
                    </RouteButton>
                    <RouteButton class="secondary-button" routeName="GiveManuallyItemCode"
                        buttonText="Wpisz kod ręcznie">
                        <template #icon>
                        </template>
                    </RouteButton>
                    <RouteButton class="secondary-button" routeName="AddNote" buttonText="Dodaj notatkę">
                        <template #icon>
                        </template>
                    </RouteButton>
                </div>
            </section>
        </main>
    </body>

</template>
<script>
import axios from 'axios';
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';


export default {
    name: "MainProcess",
    components: {
        WUoT_Logo,
        GoogleFonts,
        RouteButton
    },
    data() {
        return {
            users: [],
            items: [
                { userIds: [10], roomNumber: '402A', items: ['klucz', 'mikrofon', 'pilot'] },
                { userIds: [13], roomNumber: '342', items: ['', 'mikrofon', ''] },
            ],
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {

                const accesToken = sessionStorage.getItem('access_token')
                const headers = { Authorization: `Bearer ${accesToken}` };

                const response = await axios.get('http://127.0.0.1:8000/users/', { headers });

                this.users = response.data;
            } catch (error) {
                console.error('Błąd przy pobieraniu użytkowników:', error);
            }
        },
        getUserNames(userIds) {
            const names = userIds.map(id => {
                const user = this.users.find(user => user.id === id);
                return user ? `${user.name} ${user.surname}` : 'Nieznany użytkownik';
            });
            return names.join(', ');
        },
    },
}

</script>
<style lang="scss" scoped>
$primary-color: #0083BB;
$secondary-color: #4B4B4B;
$text-color: #FFFFFF;
$background-color: black;
$font-main: 'Open Sans', sans-serif;
$font-heading: 'Ubuntu', sans-serif;

body {
    background: $background-color url('../assets/back.jpg') top no-repeat;
    background-size: cover;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-main;
}

h1,
h2 {
    font-family: $font-heading;
}

button,
a,
p,
label {
    font-family: $font-main;
}

nav {
    text-align: left;
    height: 50px;
}

.logo {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
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
    font-size: 1.75rem;
}

h2 {
    font-size: 1.125rem;
}

.header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.header-tab,
.table-section,
.info-section,
.button-group {
    display: flex;
    width: 70%;
    max-width: 900px;
    min-width: 400px;
    justify-content: space-between;
    margin-bottom: 10px;
}

.header-items {
    display: flex;
    width: 70%;
}

.items-table,
.permissions-table {
    display: flex;
    align-items: flex-start;
    background-color: $secondary-color;
    border-radius: 15px;
    max-height: 100px;
    overflow-y: auto;
}

.items-table {
    width: 70%;
}

.permissions-table,
#permissions-header,
.header-item {
    width: 20%;
}

.table-cell {
    text-align: center;
    height: 30px;
    font-size: 1.25rem;
}

.items-table table,
.permissions-table table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.header-item-large {
    width: 60%;
}

.info-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
}

.info-item {
    font-size: 0.875rem;
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
}

@media (max-width: 768px) {
    .button-group button {
        height: 40px;
    }

    h1,
    .scan-section h1 {
        font-size: 1.75rem;
    }

    .info-item {
        font-size: 0.75rem;
    }
}

@media (max-width: 560px) {

    .permissions-table,
    #permissions-header,
    .info-section,
    img,
    nav {
        display: none;
    }

    .header-tab,
    .table-section {
        justify-content: center;
    }
}
</style>
