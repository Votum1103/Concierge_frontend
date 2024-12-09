    <template>
        <div class="container">
            <GoogleFonts />
            <nav>
                <BackButton class="back-button" routeName="ScanUserCard" buttonText="Wróć">
                    <template #icon>
                        <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
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
                            <input type="text" id="login" name="login" placeholder="Login" v-model="username"
                                :class="{ 'error-border': loginError }" required>
                        </div>
                        <div>
                            <input type="password" id="password" name="password" placeholder="Hasło" v-model="password"
                                :class="{ 'error-border': loginError }" required>
                        </div>
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
    name: 'UserLogin',
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
                const response = await api.post('http://127.0.0.1:8000/start-session/login', new URLSearchParams({
                    username: this.username,
                    password: this.password
                }));

                const username = response.data.user.name;

                const surname = response.data.user.surname;
                const faculty = response.data.user.faculty;
                const role = response.data.user.role;
                const userId = response.data.user.id;
                const sessionId = response.data.id;

                sessionStorage.setItem('sessionId', sessionId);
                sessionStorage.setItem('userId', userId);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('surname', surname);
                sessionStorage.setItem('faculty', faculty);
                sessionStorage.setItem('role', role);
                sessionStorage.setItem('lastPage', this.$route.name)

                this.$router.push({ name: 'MainProcess' });
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
    color: $text-color;
    text-align: center;
    background-color: $background-color;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
}

h1 {
    font-size: 2rem;
    padding: 0 3.125rem;
    margin-bottom: 4.6875rem;
}

nav {
    text-align: left;
    height: 50px;
}

.primary-button {
    font-weight: 500;
    font-size: 1.125rem;
    background-color: $primary-color;
    color: $text-color;
    border: none;
    padding: 0.625rem 5rem;
    margin-top: 6.25rem;
    border-radius: 1.5625rem;
    transition: transform 0.3s, background-color 0.3s;
    white-space: nowrap;
}

.primary-button:hover {
    transform: scale(1.07);
    cursor: pointer;
    background-color: darken($primary-color, 10%);
}

.back-button {
    text-decoration: none;
    margin: 15px;
    display: inline-flex;
    align-items: center;
    color: $text-color;
    background-color: transparent !important;
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
    background-color: $background-color;
}

input {
    text-align: center;
    color: inherit;
    font-weight: 600;
    font-size: 1.25rem;
    background-color: inherit;
    border: none;
    margin: 0.9375rem;
    width: 18.75rem;
    border-bottom: 3px solid $primary-color;
}

input::placeholder {
    text-align: left;
    color: #edede9;
    font-size: 1rem;
}

.login-button-group {
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-border {
    border-bottom: 3px solid $error-color;
}

.error-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
}

.error-message {
    color: $error-color;
    font-size: 1rem;
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