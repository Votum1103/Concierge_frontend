<template>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <GoogleFonts />
    </head>

    <body>
        <nav>
            <a class="back-button" href="#" aria-label="Wróć">
                <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>Wróć</a>
            <WUoT_Logo />
        </nav>

        <main>
            <header>
                <div class="employee-container ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60px" fill="currentColor"
                        class="bi bi-file-person-fill" viewBox="0 0 16 16">
                        <path
                            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
                    </svg>
                    <h1 id="employee-data">Jan Kowalski</h1>
                </div>
                <h2>Pracownik</h2>
                <h2>Wydział: Geodezji i Kartografii</h2>
            </header>
            <section>
                <div class="alert danger-alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" fill=#661111 class="bi bi-x-circle-fill"
                        viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                    <p>Użytkownik nie posiada uprawnień do sali nr 342</p>
                </div>
                <div class="button-group">
                    <button class="primary-button">Wydaj</button>
                    <button class="secondary-button">Anuluj</button>
                </div>
            </section>
        </main>
    </body>

    </html>

</template>
<script>
import GoogleFonts from './googleFonts.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    name: 'UnauthorizedUserAlert',
    components: {
        GoogleFonts,
        WUoT_Logo
    }
}
</script>
<style lang="scss" scoped>
$background-color: black;
$text-color: white;
$primary-color: #0083BB;
$danger-color: #661111;
$success-color: #397031;
$info-color: #0083BB;
$font-family-main: 'Open Sans', sans-serif;
$font-family-heading: 'Ubuntu';
$button-width: 12.5em;
$button-height: 3.125em;
$border-radius: 1.5625em;
$font-size-large: 1.2em;
$font-size-medium: 1.375em;
$font-size-small: 0.9375em;
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
    font-size: $font-size-small;
    transition: transform $transition-duration ease;

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

.employee-container {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 5em;
}

#employee-data {
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
    border: 0.1875em solid $info-color;
}

p {
    font-size: $font-size-medium;
}

.loader {
    color: $text-color;
    font-size: 1.5625em;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 0.9375em;
    transform: translateZ(0);
    animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
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
</style>
