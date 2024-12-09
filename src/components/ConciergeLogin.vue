<template>
    <div class="container">
        <GoogleFonts />
        <nav>
            <BackButton class="back-button" routeName="eConcierge" buttonText="Wróć">
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

        <main>
            <section class="mainContent">
                <h1>Podaj login i hasło</h1>
                <form @submit.prevent="login">
                    <div>
                        <input :class="{ 'error-border': loginError }" type="text" id="login" name="login"
                            placeholder="Login" v-model="username" required>
                    </div>
                    <div>
                        <input :class="{ 'error-border': loginError }" type="password" id="password" name="password"
                            placeholder="Hasło" v-model="password" required>
                    </div>
                    <!-- Stałe miejsce na komunikat o błędzie -->
                    <div class="error-placeholder">
                        <span v-if="loginError" class="error-message">Niepoprawny login lub hasło</span>
                    </div>
                    <div class="login-button-group">
                        <RouteButton buttonText="Zaloguj się" class="primary-button" />
                    </div>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
import BackButton from './BackButton.vue';
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import api from '../api';

export default {
    name: 'ConciergeLogin',
    components: {
        GoogleFonts,
        WUoT_Logo,
        RouteButton,
        BackButton
    },
    data() {
        return {
            username: '',
            password: '',
            loginError: false
        };
    },
    methods: {
        async login() {
            try {
                const response = await api.post('/login', new URLSearchParams({
                    username: this.username,
                    password: this.password
                }));

                const refreshToken = response.data.refresh_token;
                const accessToken = response.data.access_token;

                sessionStorage.setItem('access_token', accessToken);
                sessionStorage.setItem('refresh_token', refreshToken);
                const userResponse = await api.get('/concierge', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const name = userResponse.data.name
                const surname = userResponse.data.surname
                const initials = (name[0] || '') + (surname[0] || '');
                sessionStorage.setItem('userInitials', initials.toUpperCase());

                this.$router.push({ name: 'MainWindow' });
            } catch (error) {
                this.loginError = true;
                console.error('Błąd logowania:', error);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    background: $background-color;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-main;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
}

nav {
    text-align: left;
    height: 50px;
}

h1 {
    font-size: 2rem;
    padding: 0 3.125rem;
    margin-bottom: 4.6875rem;
}

main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}

.mainContent {
    box-sizing: border-box;
    border-radius: 2em;
    padding-bottom: 6.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    min-width: 21.875rem;
    max-width: 37.5rem;
    height: 70%;
    background-color: rgb(0, 0, 0);
}

input {
    color: inherit;
    font-family: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    background-color: inherit;
    border: none;
    text-align: center;
    margin: 0.9375rem;
    width: 18.75rem;
    border-bottom: 3px solid $primary-color;
}

input::placeholder {
    text-align: left;
    color: #edede9;
    font-size: 1rem;
}

.error-border {
    border-bottom: 3px solid $error-color;
}

.error-placeholder {
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.error-message {
    color: $error-color;
    font-size: 1rem;
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
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
}

.primary-button {
    margin-top: 6.25rem;
    border: none;
    font-family: $font-heading;
    font-weight: 500;
    font-size: 1.125rem;
    background-color: $primary-color;
    color: $text-color;
    padding: 0.625rem 5rem;
    border-radius: 1.5625rem;
    transition: transform $transition-duration;
}

.primary-button:hover {
    transform: scale(1.07);
    cursor: pointer;
}


.login-button-group {
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 768px) {
    h1 {
        font-size: 1.75rem;
    }

    .container {
        height: 60%;
    }

    input {
        width: 15.625rem;
    }

    .primary-button {
        font-size: 1rem;
        padding: 0.625rem 2.5rem;
    }
}
</style>