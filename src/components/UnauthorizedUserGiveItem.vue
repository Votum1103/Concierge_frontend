<template>

    <body>
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

        <main class="form-container">
            <header>
                <h1>Wydaj/odbierz bez autoryzacji</h1>
            </header>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="name-input">Imię</label>
                    <input type="text" id="name-input" v-model="formData.name" placeholder="Imię" required>
                </div>
                <div class="form-group">
                    <label for="surname-input">Nazwisko</label>
                    <input type="text" id="surname-input" v-model="formData.surname" placeholder="Nazwisko" required>
                </div>
                <div class="form-group">
                    <label for="email-input">Email</label>
                    <input type="email" id="email-input" v-model="formData.email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <label for="additional-info-textarea">Informacje dodatkowe</label>
                    <textarea name="additional-info-textarea" id="additional-info-textarea"
                        v-model="formData.note" cols="40" rows="5"
                        placeholder="Informacje dodatkowe"></textarea>
                </div>
                <div class="button-group">
                    <button class="primary-button" type="submit">Wydaj</button>
                </div>
            </form>
        </main>
    </body>
</template>

<script>
import axios from 'axios';
import GoogleFonts from './googleFonts.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import BackButton from './BackButton.vue';

export default {
    name: 'UnauthorizedUserGiveItem',
    components: {
        GoogleFonts,
        WUoT_Logo,
        BackButton
    },
    data() {
        return {
            formData: {
                name: '',
                surname: '',
                email: '',
                position: '',
                note: ''
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                // Ustawienie aktualnej daty i czasu w formacie ISO

                const token = sessionStorage.getItem('access_token');
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                // Wyślij dane do backendu przy użyciu axios

                await axios.post('http://127.0.0.1:8000/unauthorized-users', {
                    name: this.formData.name,
                    surname: this.formData.surname,
                    email: this.formData.email,
                    note: this.formData.note
                }, { headers });

                // Ewentualnie zresetuj formularz po wysłaniu
                this.formData = {
                    name: '',
                    surname: '',
                    email: '',
                    position: '',
                    note: ''
                };
            } catch (error) {
                console.error('Błąd podczas tworzenia użytkownika:', error);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
$background-color: black;
$text-color: white;
$primary-color: #0083BB;
$placeholder-color: #edede9;
$font-family-main: 'Open Sans', sans-serif;
$font-family-heading: 'Ubuntu';
$button-width-large: 12.5em;
$button-height-large: 3.125em;
$button-height-medium: 3.125em;
$button-height-small: 2.5em;
$font-size-large: 1.75em;
$font-size-medium: 1.125em;
$font-size-small: 1em;
$font-size-x-small: 0.875em;
$transition-duration: 0.3s;

body {
    background: $background-color url('../assets/back.jpg') top no-repeat;
    background-size: cover;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-family-main;
}

h1,
h2 {
    font-family: $font-family-heading;
}

button,
a,
p {
    font-family: $font-family-main;
}

nav {
    text-align: left;
    height: 3.125em;
}


.back-button {
    text-decoration: none;
    margin: 0.9375em;
    display: inline-flex;
    align-items: center;
    color: $text-color;
    font-size: 0.9375em;

    &:hover {
        transform: scale(1.07);
        cursor: pointer;
    }
}

#left-arrow {
    margin-right: 0.3125em;
}

.logo {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0.625em;
}

header h1 {
    font-size: $font-size-large;
}

header h2 {
    font-size: $font-size-medium;
    margin-bottom: 1.875em;
}

.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.125em;
}

.form-group {
    display: flex;
    align-items: flex-start;
    gap: 3.125em;
    margin-bottom: 3em;
}

label {
    display: none;
}

.form-group input,
.form-group select,
.form-group textarea {
    color: inherit;
    font-family: inherit;
    font-size: 1.125em;
    background-color: inherit;
    border: none;
    border-bottom: 0.1875em solid $primary-color;
    padding-bottom: 0.3125em;
    width: 25em;
    box-sizing: border-box;
    text-align: center;
    padding-top: 0.5em;

    &::placeholder {
        color: $placeholder-color;
        font-weight: 400;
        text-align: left;
    }

    &:focus::placeholder {
        color: transparent;
    }
}

.form-group select option {
    background-color: $background-color;
    color: $text-color;
}

.form-group textarea {
    border: 0.1875em solid $primary-color;
    border-radius: 0.9375em;
    padding: 0.625em;
    resize: vertical;
}

.button-group {
    display: flex;
    justify-content: center;
}

.primary-button {
    margin-top: 2.5em;
    color: $text-color;
    font-size: 1.2em;
    border: none;
    background-color: $primary-color;
    width: $button-width-large;
    height: $button-height-large;
    border-radius: 1.5625em;
    transition: all $transition-duration ease;

    &:hover {
        transform: scale(1.07);
        cursor: pointer;
    }
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    border-bottom: 0.1875em solid $primary-color;
    -webkit-text-fill-color: $text-color;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;

}

*:focus {
    outline: none;
}

input:-webkit-autofill:focus,
input:-webkit-autofill:hover,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    -webkit-text-fill-color: $text-color;
}

@media (max-width: 1040px) {
    .button-group button {
        height: $button-height-medium;
        width: 13.5em;
        font-size: 0.9em;
    }
}

@media (max-width: 768px) {
    .button-group button {
        height: $button-height-small;
    }

    header h1 {
        font-size: x-large;
    }

    header h2 {
        font-size: $font-size-x-small;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        font-size: 1em;
        width: 18.75em;
    }
}

@media (max-width: 560px) {

    .form-group input,
    .form-group select,
    .form-group textarea {
        font-size: 0.875em;
        width: 12.5em;
    }

    img,
    .back-button {
        display: none;
    }
}
</style>
