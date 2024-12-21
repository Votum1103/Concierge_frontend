<template>
    <div class="container">
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
                    <textarea name="additional-info-textarea" id="additional-info-textarea" v-model="formData.note"
                        cols="40" rows="5" placeholder="Informacje dodatkowe"></textarea>
                </div>
                <div class="button-group">
                    <button class="primary-button" type="submit">Wydaj</button>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import BackButton from '../components/BackButton.vue';
import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';
import api from '../api';

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
                const response = await api.post('/unauthorized-users', {
                    name: this.formData.name,
                    surname: this.formData.surname,
                    email: this.formData.email,
                    note: this.formData.note
                });

                this.formData = {
                    name: '',
                    surname: '',
                    email: '',
                    position: '',
                    note: ''
                };

                const createSessionUA = await api.post(`/start-session/unauthorized/${response.data.id}`);

                sessionStorage.setItem('userId', response.data.id);
                sessionStorage.setItem('lastPage', this.$route.name);
                sessionStorage.setItem('username', response.data.name);
                sessionStorage.setItem('surname', response.data.surname);
                sessionStorage.setItem('sessionId', createSessionUA.data.id);
                sessionStorage.setItem('userEmail', this.formData.email);

                this.$router.push({ name: 'MainProcess' });
            } catch (error) {
                console.error('Błąd podczas tworzenia użytkownika:', error);
                if (error.response && error.response.status === 409) {
                    sessionStorage.setItem('userEmail', this.formData.email);
                    sessionStorage.setItem('username', this.formData.name);
                    sessionStorage.setItem('surname', this.formData.surname);

                    this.$router.push({ name: 'UpdateUACredentials' });
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    text-align: center;
    background: $background-color url('../assets/back.jpg') top no-repeat;
    background-size: cover;
    color: $text-color;
    min-width: 550px;
}

nav {
    text-align: left;
    height: 7vh;
}

.back-button {
    display: inline-flex;
    align-items: center;
    color: $text-color;
    text-decoration: none;
    margin: 0.9375em;
    font-size: 0.9375em;

    &:hover {
        transform: scale(1.07);
        cursor: pointer;
    }
}

#left-arrow {
    margin-right: 0.3125em;
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
    height: 93vh;
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
    text-align: center;
    font-size: 1.125em;
    color: inherit;
    border: none;
    border-bottom: 0.1875em solid $primary-color;
    padding-bottom: 0.3125em;
    background-color: inherit;
    width: 25em;
    box-sizing: border-box;
    padding-top: 0.5em;

    &::placeholder {
        text-align: left;
        color: $placeholder-color;
        font-weight: 400;
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
    background-color: $primary-color;
    color: $text-color;
    font-size: 1.2em;
    width: $button-width;
    height: $button-height;
    border: none;
    border-radius: 1.5625em;
    margin-top: 2.5em;
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

@media (max-width: 768px) {

    header h1 {
        font-size: x-large;
    }

    header h2 {
        font-size: 0.875em;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        font-size: 1em;
        width: 18.75em;
    }
}
</style>