<template>
    <div class="container">
        <GoogleFonts />

        <nav>
            <WUoT_Logo />
        </nav>
        <section>
            <div class="alert danger-alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" fill=#661111 class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                <p>Użytkownik nie posiada uprawnień do pokoju {{ roomNumber }}</p>
            </div>
            <div class="button-group">
                <button class="primary-button" @click="changeItemStatus">Potwierdź</button>
                <button class="secondary-button" @click="cancelOperation">Anuluj</button>
            </div>
        </section>
    </div>
</template>


<script>
import GoogleFonts from '../components/googleFonts.vue';
import WUoT_Logo from '../components/WUoT_Logo.vue';
import api from '@/api';

export default {
    name: 'UnauthorizedUserAlert',
    components: {
        GoogleFonts,
        WUoT_Logo
    },
    data() {
        return {
            error: '',
            session_id: sessionStorage.getItem('sessionId'),
            roomNumber: '',
        };
    },
    mounted() {
        this.fetchItemDetails()
    },
    methods: {
        async fetchItemDetails() {
            const selectedItemCode = sessionStorage.getItem('SelectedItemCode');

            try {
                const response = await api.get(`/devices/code/${selectedItemCode}`);
                const itemDetails = response.data;

                this.roomNumber = itemDetails.room.number;

                return itemDetails;
            } catch (error) {
                console.error('Błąd podczas pobierania szczegółów przedmiotu:', error);
                this.error = 'Nie udało się pobrać szczegółów przedmiotu.';
                throw error;
            }
        },
        async changeItemStatus() {
            try {
                const selectedItemCode = sessionStorage.getItem('SelectedItemCode');
                await api.post('/operations/change-status', {
                    device_code: selectedItemCode,
                    session_id: this.session_id,
                    force: true
                });

                this.$router.push({ name: 'MainProcess' });
            } catch (error) {
                console.error('Błąd podczas zmiany statusu:', error);
                this.error = 'Wystąpił błąd podczas operacji.';
            }
        },
        cancelOperation() {
            this.roomNumber = '';
            this.error = '';
            this.$router.push({ name: 'MainProcess' });
        }
    }
};
</script>


<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    background: $background-color url('../assets/back.jpg') top no-repeat;
    background-size: cover;
    color: $text-color;
    text-align: center;
}

nav {
    text-align: left;
    height: 5vh;
}

h2 {
    font-size: 1.125em;
}

.back-button {
    display: inline-flex;
    align-items: center;
    color: $text-color;
    font-size: $font-size-small;
    margin: 0.9375em;
    text-decoration: none;
    transition: transform $transition-duration ease;

    &:hover {
        transform: scale(1.07);
        cursor: pointer;
    }
}

#left-arrow {
    margin-right: 0.3125em;
}

header {
    margin-bottom: 5%;
}

.employee-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5em;
}

#employee-data {
    display: inline;
    font-size: 1.75em;
    margin-left: 1.25em;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 95vh;
}

.alert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 0.9375em 0.625em;
    width: 60%;
    max-width: 37.5em;
    border-radius: 0.9375em;
}

.danger-alert {
    border: 0.1875em solid $danger-color;
    gap: 0.3125em;
}

.success-alert {
    border: 0.1875em solid $success-color;
    gap: 0.3125em;
}

.info-alert {
    border: 0.1875em solid $primary-color;
}

p {
    font-size: $font-size-medium;
}

.loader {
    color: $text-color;
    font-size: 1.5625em;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 0.9375em;
    transform: translateZ(0);
    animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
    overflow: hidden;
}

@keyframes mltShdSpin {

    0%,
    5%,
    95% {
        box-shadow: 0 -0.83em 0 -0.4em,
            0 -0.83em 0 -0.42em,
            0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em,
            0 -0.83em 0 -0.477em;
    }

    10%,
    59% {
        box-shadow: 0 -0.83em 0 -0.4em,
            -0.087em -0.825em 0 -0.42em,
            -0.173em -0.812em 0 -0.44em,
            -0.256em -0.789em 0 -0.46em,
            -0.297em -0.775em 0 -0.477em;
    }

    20% {
        box-shadow: 0 -0.83em 0 -0.4em,
            -0.338em -0.758em 0 -0.42em,
            -0.555em -0.617em 0 -0.44em,
            -0.671em -0.488em 0 -0.46em,
            -0.749em -0.34em 0 -0.477em;
    }

    38% {
        box-shadow: 0 -0.83em 0 -0.4em,
            -0.377em -0.74em 0 -0.42em,
            -0.645em -0.522em 0 -0.44em,
            -0.775em -0.297em 0 -0.46em,
            -0.82em -0.09em 0 -0.477em;
    }

    100% {
        box-shadow: 0 -0.83em 0 -0.4em,
            0 -0.83em 0 -0.42em,
            0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em,
            0 -0.83em 0 -0.477em;
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
    display: flex;
    flex-direction: column;
    margin-top: 2.5em;
    gap: 0.9375em;
}

.primary-button,
.secondary-button {
    color: $text-color;
    font-size: $font-size-large;
    width: $button-width;
    height: $button-height;
    border-radius: $border-radius;
    transition: all $transition-duration ease;
}

.primary-button {
    border: none;
    background-color: $primary-color;
}

.secondary-button {
    border: 0.1875em solid $primary-color;
    background-color: transparent;
}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
}

@media (max-width: 1040px) {
    p {
        font-size: 1.125em;
    }

    .bi {
        width: 2.5em;
    }
}

@media (max-width: 768px) {
    p {
        font-size: 1em;
    }

    h1 {
        font-size: x-large;
    }

    header h2 {
        font-size: 0.875em;
    }

    .bi {
        width: 1.875em;
    }
}

@media (max-width: 560px) {
    p {
        font-size: 0.875em;
    }

    .bi {
        width: 1.5625em;
    }

    .primary-button,
    .secondary-button {
        height: 50px;
        width: 200px;
    }

    img,
    .back-button {
        display: none;
    }
}
</style>
