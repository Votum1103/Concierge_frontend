!<template>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>e-portiernia - uwaga</title>
        <link rel="stylesheet" href="alert.css">
        <GoogleFonts />
    </head>

    <body>
        <nav>
            <a class="back-button" aria-label="Wróć"><svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16"
                    height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg> Wróć</a>
            <WUoT_Logo />
        </nav>

        <main>
            <header>
                <div class="employee">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60px" fill="currentColor"
                        class="bi bi-file-person-fill" viewBox="0 0 16 16">
                        <path
                            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
                    </svg>
                    <h1 id="employee">Jan Kowalski</h1>
                </div>
                <h2>Pracownik</h2>
                <h2>Wydział: Geodezji i Kartografii</h2>
            </header>
            <section>
                <div class="alert info-alert">
                    <div class="loader"></div>
                    <p class="message-submit">W celu potwierdzenia zeskanuj kartę portiera</p>
                </div>
                <div class="button-group">
                    <button class="primary-button">Podaj login i hasło</button>
                    <button class="secondary-button">Anuluj operacje</button>
                </div>
            </section>
        </main>

    </body>
</template>
<script>
import GoogleFonts from './googleFonts.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    name: 'SubmitOperation',
    components: {
        GoogleFonts,
        WUoT_Logo,

    }
    

}
</script>
<style lang="scss" scoped>
@import '../assets/style/variables.scss';

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
p {
    font-family: $font-main;
}

nav {
    text-align: left;
    height: 50px;
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

header {
    margin-bottom: 5%;
}

.employee {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 5em;
}

#employee {
    margin-left: 1.25em;
    display: inline;
    font-size: 1.75em;
}

h2 {
    font-size: 1.125em;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.alert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 1.875em 0.625em 0.625em;
    width: 60%;
    max-width: 37.5em;
    border: 0.1875em solid $primary-color;
    border-radius: 0.9375em;
}

p {
    font-size: 1.375em;
}

.loader {
    color: $text-color;
    font-size: 1.9em;
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
    95% {
        box-shadow: 0 -0.052em 0 -0.025em,
            0 -0.052em 0 -0.026em,
            0 -0.052em 0 -0.027em,
            0 -0.052em 0 -0.029em,
            0 -0.052em 0 -0.03em;
    }

    10%,
    59% {
        box-shadow: 0 -0.052em 0 -0.025em,
            -0.0054em -0.0515em 0 -0.026em,
            -0.0108em -0.0512em 0 -0.027em,
            -0.016em -0.0495em 0 -0.029em,
            -0.0186em -0.0485em 0 -0.03em;
    }

    20% {
        box-shadow: 0 -0.052em 0 -0.025em,
            -0.0211em -0.0474em 0 -0.026em,
            -0.0346em -0.0386em 0 -0.027em,
            -0.0419em -0.0306em 0 -0.029em,
            -0.0469em -0.0213em 0 -0.03em;
    }

    38% {
        box-shadow: 0 -0.052em 0 -0.025em,
            -0.0235em -0.0462em 0 -0.026em,
            -0.0403em -0.0326em 0 -0.027em,
            -0.0484em -0.0186em 0 -0.029em,
            -0.0525em -0.0056em 0 -0.03em;
    }

    100% {
        box-shadow: 0 -0.052em 0 -0.025em,
            0 -0.052em 0 -0.026em,
            0 -0.052em 0 -0.027em,
            0 -0.052em 0 -0.029em,
            0 -0.052em 0 -0.03em;
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
    margin-top: 2.5em;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.primary-button,
.secondary-button {
    color: $text-color;
    font-size: 1.2em;
    width: 12em;
    height: $button-height;
    border-radius: $border-radius;
    transition: all 0.3s;
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

    .loader {
        font-size: 1.5625em;
    }
}

@media (max-width: 560px) {
    p {
        font-size: 0.875em;
    }

    img,
    .back-button {
        display: none;
    }

    .loader {
        font-size: 0.9375em;
    }
}
</style>
