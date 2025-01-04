<template>
    <GoogleFonts />

    <div class="container">
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

        <main>
            <section class="main-group">
                <h1>Podaj kod przedmiotu</h1>
                <form @submit.prevent="fetchItemDetails">
                    <div class="form-group">
                        <input type="text" autocomplete="off" v-model="itemCode" id="code-input" name="code-input"
                            placeholder="Kod przedmiotu" :class="{ 'input-error': permissionError }" required />
                    </div>
                    <div class="error-container">
                        <div v-if="permissionError" class="error-message">
                            <p>{{ permissionError }}</p>
                        </div>
                    </div>
                    <div class="button-group">
                        <button class="primary-button">Potwierdź</button>
                    </div>
                </form>
            </section>
        </main>
    </div>
</template>

<script>
import api from "../api";
import BackButton from '../components/BackButton.vue';
import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';

export default {
    name: "GiveManuallyItemCode",
    components: {
        GoogleFonts,
        WUoT_Logo,
        BackButton,
    },
    data() {
        return {
            itemCode: "",
            itemDetails: null,
            error: null,
            permissionError: null,
            statusChange: "",
            session_id: sessionStorage.getItem('sessionId'),
            thisItem: "",
        };
    },
    methods: {
        async fetchItemDetails() {
            this.error = null;
            this.permissionError = null;
            this.itemDetails = null;
            

            try {
                const response = await api.get(`/devices/code/${this.itemCode}`);
                if (!response.data) {
                    this.itemCode = '';
                    this.permissionError = "Niepoprawny kod przedmiotu"
                    return;
                }
                const item = response.data;

                this.item = item;
                this.itemCode = item.code;
                console.log(this.session_id)

                try {
                    const changeStatusResponse = await api.post('/operations/change-status', {
                        device_code: this.itemCode,
                        session_id: this.session_id,
                        force: false
                    });
                    
                    this.statusChange = changeStatusResponse.data;

                    


                    sessionStorage.setItem('UnapprovedDevices', JSON.stringify([this.item]));

                    this.$router.push({ name: 'MainProcess' });
                } catch (error) {
                    if (error.response && error.response.status === 403) {
                        sessionStorage.setItem('SelectedItemCode', this.itemCode)
                        this.$router.push({ name: 'UnauthorizedUserAlert' });
                    } else {
                        this.error = "Wystąpił błąd podczas zmiany statusu urządzenia";
                    }

                }
            } catch (error) {
                this.error = "Wystąpił błąd podczas pobierania danych urządzenia";
            }
            this.itemCode = "";

        }
    }
};
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
}

h1 {
    font-size: xx-large;
    margin-bottom: 100px;
}

nav {
    text-align: left;
    height: 50px;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

.main-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    height: 450px;
    border-radius: 2em;
    min-width: 300px;
    max-width: 600px;
    width: 45%;
    background: $background-color;
    padding: 50px 0 50px 0;
    margin-top: 10vh;
}

.error-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    min-height: 20px;
}

.error-message {
    font-size: 16px;
    color: $error-color;
}

.error-container:not(:has(.error-message)) .error-message {
    visibility: hidden;
}

.input-error {
    border-bottom: 3px solid $error-color;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
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

input:focus::placeholder {
    color: transparent;
}

.button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.primary-button {
    margin-top: 80px;
    color: $text-color;
    font-size: $font-size-large;
    border: none;
    background-color: $primary-color;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: all $transition-duration;
}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
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

*:focus {
    outline: none;
}

@media (max-width: 768px) {
    h1 {
        font-size: large;
    }

    input,
    input::placeholder {
        font-size: 14px;
        width: 250px;
    }

}

@media (min-width: 769px) and (max-width: 1024px) {
    h1 {
        font-size: x-large;
    }

    input,
    input::placeholder {
        font-size: 16px;
        width: 280px;
    }
}

@media (min-width: 1025px) and (max-width: 1440px) {
    h1 {
        font-size: xx-large;
    }

    input,
    input::placeholder {
        font-size: 18px;
        width: 300px;
    }
}

@media (min-width: 1441px) {
    h1 {
        font-size: 2.5rem;
    }

    input,
    input::placeholder {
        font-size: 20px;
        width: 400px;
    }
}
</style>