<template>

    <div class="container">
    <GoogleFonts/>
        <nav>
            <WUoT_Logo/>
        </nav>
        <main>
            <section class="main-window">
                <h1>Zeskanuj przedmiot</h1>
                <span class="loader"></span>
                <div class="button-group">
                    <RouteButton class="primary-button" routeName="GiveManuallyItemCode" buttonText="Wpisz kod ręcznie">
                    </RouteButton>
                </div>
            </section>
        </main>
    </div>
</template>
<script>
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    name: 'ScanItem',
    components: {
        GoogleFonts,
        WUoT_Logo,
        RouteButton
    }

}
</script>
<style lang="scss" scoped>
@import '../assets/style/variables.scss';
.container {
    background: $background-color;
    background-image: url('../assets/back.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    color: $text-color;
    text-align: center;
    width: 100vw;
    height: 100vh;
}

h1 {
    font-size: xx-large;
}

nav {
    height: 50px;
}

main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-window {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2em;
    width: 45%;
    min-width: 300px;
    max-width: 600px;
    background: $background-color;
    padding: 50px 0 50px 0;
    margin-top: 7%;
    height: 450px;
    gap: 100px;
}


.loader {
    color: $text-color;
    font-size: 35px;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: translateZ(0);
    animation: mltShdSpin 1.7s infinite ease, round 1.7s infinite ease;
}

@keyframes mltShdSpin {
    0% {
        box-shadow: 0 -0.83em 0 -0.4em,
            0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    5%,
    95% {
        box-shadow: 0 -0.83em 0 -0.4em,
            0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
            0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }

    10%,
    59% {
        box-shadow: 0 -0.83em 0 -0.4em,
            -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em,
            -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em;
    }

    20% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
            -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
            -0.749em -0.34em 0 -0.477em;
    }

    38% {
        box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
            -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
            -0.82em -0.09em 0 -0.477em;
    }

    100% {
        box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em,
            0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
}

@keyframes round {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}

.button-group {
    display: flex;
    justify-content: space-around;
}

.primary-button {
    background-color: $primary-color;
    color: $text-color;
    font-size: $font-size-large;
    height: 50px;
    width: 25%;
    min-width: 200px;
    border: none;
    border-radius: 25px;
    transition: all $transition-duration;
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
}

@media (max-width: 768px) {
    h1 {
        font-size: x-large;
    }

    .button-group button {
        height: 40px;
    }

    .loader {
        font-size: 25px;
    }
}

@media (max-width: 560px) {
    img {
        display: none;
    }
}
</style>