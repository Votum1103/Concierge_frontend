!<template>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <GoogleFonts />
    </head>

    <body>
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
        <header>
            <h1>Dodaj notatkę</h1>
        </header>
        <form action="#">
            <main class="form-container">
                <div class="user-item">
                    <div id="employee">
                        <p>Jan Kowalski</p>
                    </div>
                    <div class="form-group-select">
                        <select name="room" id="room-select" required>
                            <option value="" disabled selected>Wybierz salę</option>
                            <option value="35">35</option>
                            <option value="345">345</option>
                            <option value="345A">345A</option>
                        </select>
                        <select name="item" id="item-select" required>
                            <option value="" disabled selected>Wybierz przedmiot</option>
                            <option value="key">klucz</option>
                            <option value="microphone">mikrofon</option>
                            <option value="remote-controler">pilot</option>
                        </select>
                    </div>
                </div>
                <div class="note-group">
                    <div class="form-group">
                        <label for="add-note-textarea">Użytkownik</label>
                        <textarea name="add-note-textarea" id="add-note-textarea"
                            placeholder="Podaj dodatkowe informacje" cols="40" rows="5"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="add-note-textarea">Przedmiot</label>
                        <textarea name="add-note-textarea" id="add-note-textarea"
                            placeholder="Podaj dodatkowe informacje" cols="40" rows="5"></textarea>
                    </div>
                </div>
            </main>
            <div class="button-group">
                <RouteButton class="primary-button" routeName="AddedNote" buttonText="Dodaj notatkę">
                    <template #icon>
                    </template>
                </RouteButton>
            </div>
        </form>
    </body>
</template>
<script>
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import BackButton from './BackButton.vue';

export default {
    name: 'AddNote',
    components: {
        GoogleFonts,
        WUoT_Logo,
        RouteButton,
        BackButton
    }
}
</script>


<style lang="scss" scoped>
$primary-color: #0083BB;
$background-color: black;
$text-color: white;
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

.back-button {
    text-decoration: none;
    margin: 15px;
    display: inline-flex;
    align-items: center;
    color: $text-color;
    font-size: 15px;
    transition: transform 0.3s;
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
    margin-bottom: 80px;

    h1 {
        font-size: 1.75rem;
    }

    h2 {
        font-size: 1.125rem;
        margin-bottom: 30px;
    }
}

.form-container {
    display: flex;
    justify-content: center;
    gap: 50px;
}

.user-item,
.note-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 440px;
}

.user-item div {
    display: flex;
    align-items: center;
    height: 180px;
}

#employee {
    justify-content: center;
}

p {
    margin: 0;
    font-size: 1.125rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.form-group-select {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

.form-group label {
    font-size: 1.125rem;
    text-align: right;
}

.form-group-select select,
.form-group textarea {
    color: inherit;
    font-family: inherit;
    font-size: 1.125rem;
    background-color: inherit;
    border: none;
    text-align: center;
    border-bottom: 3px solid $primary-color;
    padding-bottom: 5px;
    width: 400px;
    box-sizing: border-box;
}

.form-group-select select {
    width: 190px;
}

.form-group-select select option {
    background-color: $background-color;
    color: $text-color;
}

.form-group textarea {
    text-align: left;
    border: 3px solid $primary-color;
    border-radius: 15px;
    padding: 10px;
    resize: vertical;
}

.form-group textarea::placeholder {
    color: #edede9;
    font-weight: 400;
}

.form-group textarea:focus::placeholder {
    color: transparent;
}

.button-group {
    margin-top: 80px;
    display: flex;
    justify-content: center;
}

.primary-button {
    margin-top: 40px;
    color: $text-color;
    font-size: 1.2em;
    border: none;
    background-color: $primary-color;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    border-bottom: 3px solid $primary-color;
    -webkit-text-fill-color: $text-color;
    -webkit-box-shadow: 0 0 0px 1000px $background-color inset;
    transition: background-color 5000s ease-in-out 0s;
}

*:focus {
    outline: none;
}
</style>
