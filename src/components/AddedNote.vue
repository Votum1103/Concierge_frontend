<template>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>e-portiernia - uwaga</title>
        <GoogleFonts />
    </head>

    <body>
        <nav>
            <a class="back-button" href="#" aria-label="Wróć">
                <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>Wróć
            </a>
            <WUoT_Logo />
        </nav>

        <main>
            <header>
                <div class="employee-container">
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
                <div class="alert success-alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50px" fill="#397031" class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <p>Pomyślnie dodano notatkę</p>
                </div>

                <div class="button-group">
                    <RouteButton class="secondary-button" routeName="AddNote" buttonText="Dodaj następną">
                        <template #icon></template>
                    </RouteButton>
                    <RouteButton class="secondary-button" routeName="MainProcess" buttonText="Zakończ">
                        <template #icon></template>
                    </RouteButton>
                </div>
            </section>
        </main>
    </body>
</template>

<script>
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    name: 'AddedNote',
    components: {
        GoogleFonts,
        WUoT_Logo,
        RouteButton
    }
}
</script>

<style lang="scss" scoped>
body {
    background: black url('../assets/back.jpg') top no-repeat;
    background-size: 1920px 1080px;
    color: white;
    text-align: center;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
}

h1,
h2 {
    font-family: 'Ubuntu';
}

button,
a,
p {
    font-family: 'Open Sans', sans-serif;
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
    color: #FFFFFF;
    font-size: 15px;
}

#left-arrow {
    margin-right: 5px;
}

.back-button:hover {
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
    margin-bottom: 5%;
}

.employee-container {
    justify-content: center;
    display: flex;
    align-items: center;
    height: 80px;
}

#employee-data {
    margin-left: 20px;
    display: inline;
    font-size: 28px;
}

h2 {
    font-size: 18px;
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
    padding: 15px 10px 10px 10px;
    width: 60%;
    max-width: 600px;
    border-radius: 15px;
}

.danger-alert {
    border: 3px solid #661111;
    gap: 5px;
}

.success-alert {
    border: 3px solid #397031;
    gap: 5px;
}

.info-alert {
    border: 3px solid #0083BB;
}

p {
    font-size: 22px;
}

.loader {
    color: #ffffff;
    font-size: 25px;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 15px;
    transform: translateZ(0);
    animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
}

.button-group {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.primary-button,
.secondary-button {
    color: #FFFFFF;
    font-size: 1.2em;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
}

.primary-button {
    border: none;
    background-color: #0083BB;
}

.secondary-button {
    border: 3px solid #0083BB;
    background-color: transparent;
}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
}

@media (max-width: 1040px) {
    .button-group button {
        height: 45px;
        font-size: 0.9em;
    }

    p {
        font-size: 18px;
    }

    .bi {
        width: 40px;
    }
}

@media (max-width: 768px) {
    p {
        font-size: 16px;
    }

    h1 {
        font-size: x-large;
    }

    header h2 {
        font-size: 14px;
    }

    .button-group button {
        height: 40px;
    }

    .bi {
        width: 30px;
    }
}

@media (max-width: 560px) {
    p {
        font-size: 14px;
    }

    .bi {
        width: 25px;
    }

    img,
    .back-button {
        display: none;
    }
}
</style>
