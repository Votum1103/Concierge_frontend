<template>
    <div>
        <GoogleFonts />
        <nav>
            <button class="back-button" aria-label="Wróć">
                <svg id="left-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
                Wróć
            </button>
            <WUoTLogo />
        </nav>

        <main>
            <header>
                <h1 id="room">Sala 95</h1>
                <h2>Mikrofon</h2>
            </header>
            <section>
                <label id="additional-info-label" for="additional-info">Notatka</label>
                <textarea readonly name="additional-info" id="additional-info"
                    placeholder="Brak dodatkowych informacji o przedmiocie" cols="40" rows="5"></textarea>
                <div class="button-group">
                    <button class="primary-button">Edytuj notatkę</button>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import WUoTLogo from "../components/WUoT_Logo.vue"; // Importuj komponent logo
import GoogleFonts from "../components/googleFonts.vue"; // Importuj komponent do zarządzania fontami

export default {
    name: "SalaComponent",
    components: {
        WUoTLogo,
        GoogleFonts,
    },
};
</script>

<style lang="scss" scoped>
$primary-color: #0083BB;
$secondary-color: #FFFFFF;
$placeholder-color: #edede9;
$background-color: black;
$font-primary: 'Open Sans', sans-serif;
$font-secondary: 'Ubuntu', sans-serif;

@mixin button-style($bg-color, $text-color, $width, $height) {
    border: none;
    background-color: $bg-color;
    color: $text-color;
    font-size: 1.2em;
    width: $width;
    min-width: 200px;
    height: $height;
    border-radius: 25px;
    transition: all 0.3s;

    &:hover {
        transform: scale(1.07);
        cursor: pointer;
    }
}

/* Stylowanie body */
body {
    background: $background-color url('../assets/back.jpg') top no-repeat;
    background-size: 1920px 1080px;
    color: $secondary-color;
    text-align: center;
    margin: 0;
    font-family: $font-primary;
}

h1,
h2 {
    font-family: $font-secondary;
}

button,
a,
p,
label {
    font-family: $font-primary;
}

nav {
    text-align: left;
    height: 50px;
}

.back-button {
    border: none;
    margin: 15px;
    display: inline-flex;
    align-items: center;
    color: $secondary-color;
    font-size: 15px;
    background-color: transparent;

    .back-button__icon {
        margin-right: 5px;
    }
}

.logo {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
}

header {
    margin-bottom: 60px;
}

#room {
    font-size: 28px;
}

h2 {
    font-size: 18px;
}

section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

textarea {
    color: inherit;
    width: 400px;
    font-family: inherit;
    background-color: inherit;
    font-size: 18px;
    text-align: left;
    border: 3px solid $primary-color;
    border-radius: 15px;
    padding: 10px;

    &::placeholder {
        color: $placeholder-color;
        font-size: 18px;
    }
}

.button-group {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.primary-button {
    @include button-style($primary-color, $secondary-color, 25%, 50px);
}

@media (max-width: 1040px) {
    .button-group button {
        height: 45px;
        font-size: 0.9em;
    }

    textarea {
        &::placeholder {
            font-size: 16px;
        }
    }
}

@media (max-width: 768px) {
    h1 {
        font-size: x-large;
    }

    h2 {
        font-size: 14px;
    }

    .button-group button {
        height: 40px;
    }

    textarea {
        width: 300px;

        &::placeholder {
            font-size: 14px;
        }
    }
}

@media (max-width: 560px) {

    img,
    .back-button {
        display: none;
    }

    textarea {
        width: 200px;

        &::placeholder {
            font-size: 12px;
        }
    }
}
</style>
