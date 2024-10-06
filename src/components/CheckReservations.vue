<template>
    <div>
        <GoogleFonts />
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
        <header>
            <h1>Sprawdź rezerwacje sali</h1>
        </header>
        <main>
            <div class="form-container">
                <form action="#">
                    <div class="form-group">
                        <label for="room-number">Numer sali</label>
                        <input type="text" id="room-number" name="room-number" placeholder="Podaj numer sali" required>
                    </div>
                </form>
            </div>
            <div class="container">
                <div class="header-items">
                    <div class="header-item">Sala</div>
                    <div class="header-item">Godzina<br>rozpoczęcia</div>
                    <div class="header-item">Godzina<br>zakończenia</div>
                    <div class="header-item header-item-large">Rezerwujący</div>
                </div>
                <div class="items-table">
                    <table>
                        <tbody>
                            <tr class="table-row">
                                <td class="table-cell">402A</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Włodzimierz Konstantynopolny-Kwardyfinikowiak</td>
                            </tr>
                            <tr class="table-row">
                                <td class="table-cell">12</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Jan Lak</td>
                            </tr>
                            <tr class="table-row">
                                <td class="table-cell">402A</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Włodzimierz Konstantynopolny-Kwardyfinikowiak</td>
                            </tr>
                            <tr class="table-row">
                                <td class="table-cell">12</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Jan Lak</td>
                            </tr>
                            <tr class="table-row">
                                <td class="table-cell">402A</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Włodzimierz Konstantynopolny-Kwardyfinikowiak</td>
                            </tr>
                            <tr class="table-row">
                                <td class="table-cell">12</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Jan Lak</td>
                            </tr>
                            <tr class="table-row">
                                <td class="table-cell">12</td>
                                <td class="table-cell">12:00</td>
                                <td class="table-cell">14:00</td>
                                <td class="table-cell cell-large">Jan Lak</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="button-group">
                <button class="primary-button" type="submit">Szukaj</button>
            </div>
        </main>
    </div>
</template>
<script>
import BackButton from './BackButton.vue';
import GoogleFonts from './googleFonts.vue';
//         RouteButton,
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    name: 'CheckReservations',
    components: {
        GoogleFonts,
        WUoT_Logo,
        // RouteButton,
        BackButton
    }
}
</script>

<style lang="scss" scoped>
body {
    background: black url('../assets/back.jpg') top no-repeat;
    background-size: cover;
    color: white;
    text-align: center;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
}

h1,
h2 {
    font-family: 'Ubuntu', sans-serif;
}

button,
a,
p,
label {
    font-family: 'Open Sans', sans-serif;
}

nav {
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


.back-button:hover,
button:hover {
    transform: scale(1.07);
    cursor: pointer;
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

header h1 {
    font-size: 28px;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 100px;
}

.form-group {
    display: flex;
    align-items: flex-start;
    gap: 50px;
}

.form-group label {
    font-size: 18px;
    text-align: right;
}

.form-group input {
    color: inherit;
    font-family: inherit;
    font-size: 18px;
    background-color: inherit;
    border: none;
    text-align: center;
    border-bottom: 3px solid #0083BB;
    padding-bottom: 5px;
    width: 400px;
    box-sizing: border-box;
}

.form-group input::placeholder {
    color: #edede9;
    font-weight: 400;
}

input:focus::placeholder {
    color: transparent;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;
    min-width: 380px;
    width: 80%;
}

.header-items {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.header-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 15%;
    font-size: 1.2em;
}

.header-item-large {
    width: 55%;
    text-align: center;
}

.items-table {
    display: flex;
    align-items: flex-start;
    background-color: #4B4B4B;
    border-radius: 15px;
    max-height: 250px;
    overflow-y: auto;
    width: 100%;
    margin-top: 10px;
}

table {
    width: 100%;
    table-layout: fixed;
}

.table-row {
    display: flex;
    justify-content: space-between;
}

.table-cell {
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
    width: 15%;
    word-wrap: break-word;
    font-size: 1.3em;
}

.cell-large {
    width: 55%;
}

.button-group {
    display: flex;
    justify-content: center;
}

.primary-button {
    color: #FFFFFF;
    font-size: 1.2em;
    border: none;
    background-color: #0083BB;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
}

.primary-button:hover {
    transform: scale(1.07);
    cursor: pointer;
}


/* Custom scrollbar styles */
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

/* Autofill input styles */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    border-bottom: 3px solid #0083BB;
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
}

*:focus {
    outline: none;
}

/* Responsive design */
@media (max-width: 1040px) {
    .button-group {
        gap: 10px;
        flex-direction: column;
        align-items: center;
    }

    .primary-button {
        height: 45px;
    }

    ::-webkit-scrollbar {
        width: 5px;
    }
}

@media (max-width: 900px) {
    main {
        gap: 80px;
    }

    .primary-button {
        height: 40px;
    }

    h1 {
        font-size: x-large;
    }

    .form-group label {
        display: none;
    }

    .container {
        font-size: 12px;
    }

    .items-table {
        max-height: 150px;
    }

    .form-group input {
        font-size: 16px;
        width: 300px;
    }
}

@media (max-width: 700px) {

    img,
    nav,
    .header-items {
        display: none;
    }

    .form-group input {
        font-size: 14px;
        width: 200px;
    }

    main {
        gap: 60px;
    }
}
</style>