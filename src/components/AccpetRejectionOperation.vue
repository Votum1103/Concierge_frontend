<template>
    <GoogleFonts />

    <div class="container">
    <nav>
        <WUoT_Logo />
    </nav>
        <section>
            <div class="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" fill=#661111 class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                <!-- Wyświetlenie danych przedmiotu -->
                <p>Czy na pewno chcesz odrzucić operacje</p>
            </div>
            <div class="button-group">
                <button class="primary-button" @click="cancelOperation">Tak</button>
                <button class="secondary-button" @click="stopCancellingOpertaion">Nie</button>
            </div>
        </section>
    </div>
</template>


<script>
import GoogleFonts from './googleFonts.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import api from '../api';

export default {
    name: 'AccpetRejectionOperation',
    components: {
        GoogleFonts,
        WUoT_Logo
    },
    data() {
        return {
            session_id: sessionStorage.getItem('sessionId'),
        };
    },
    methods: {

        stopCancellingOpertaion() {
            this.$router.push({ name: 'MainProcess' })
        },

        async cancelOperation() {
            const sessionId = sessionStorage.getItem('sessionId'); // Pobranie sessionId z pamięci

            if (!sessionId) {
                console.error('Brak sessionId w sessionStorage');
                this.$router.push({ name: 'MainWindow' }); // Przekierowanie nawet bez sessionId
                return;
            }

            try {

                await api.post(`/reject/session/${sessionId}`);
                console.log(`Operacje dla sesji ${sessionId} zostały anulowane.`);

                sessionStorage.removeItem('sessionId');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('surname');
                sessionStorage.removeItem('faculty');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('lastPage');

                this.$router.push({ name: 'MainWindow' });
            } catch (error) {
                console.error('Błąd przy anulowaniu operacji:', error);
            }
        },
    }
};
</script>


<style lang="scss" scoped>
@import '../assets/style/variables.scss';

.container {
    background-color: $background-color;
    color: $text-color;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
}

h1,
h2 {
    font-family: $font-heading;
}

button,
a,
p {
    font-family: $font-main;
}

p {
    font-size: $font-size-medium;
}

h1 { 
    font-size: 15px
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
    border-radius: 1em;
    border: 0.1875em solid $danger-color;
    gap: 0.3125em;
}

.button-group {
    margin-top: 2.5em;
    display: flex;
    flex-direction: column;
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
    .button-group button {
        height: 2.8125em;
        font-size: 0.9em;
    }

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

    .button-group button {
        height: 2.5em;
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

    img,
    .back-button {
        display: none;
    }
}
@media (max-width: 426px) {
    .container {
        width: 426px;
    }
}
</style>
