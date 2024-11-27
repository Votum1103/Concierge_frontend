<template>
    <div class="main-content">
        <GoogleFonts />
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
        <header>
            <div class="employee-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="60px" fill="currentColor"
                    class="bi bi-file-person-fill" viewBox="0 0 16 16">
                    <path
                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11" />
                </svg>
                <h1 id="employee-data">{{ username }} {{ surname }}</h1>
            </div>
            <h2>{{ role }}</h2>
            <h2>Wydział {{ faculty }}</h2>
        </header>
        <div class="mainContent">
            <h1>W celu potwierdzenia zeskanuj kartę portiera</h1>
            <div class="loader"></div>
        </div>
        <div class="button-group">
                <button class="primary-button" >Podaj login i hasło</button>
                <button class="secondary-button" >Anuluj</button>
            </div>
    </div>
</template>

<script>
import BackButton from './BackButton.vue';
import GoogleFonts from './googleFonts.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
    components: {
        GoogleFonts,
        BackButton,
        WUoT_Logo
    },
    data() {
        return {
            username: '',
            surname: '',
            role: '',
            faculty: ''
        };
    },
    mounted() {
        this.loadUserData();
    },
    methods: {
        loadUserData() {
            this.username = sessionStorage.getItem('username') || 'Nieznane imię';
            this.surname = sessionStorage.getItem('surname') || 'Nieznane nazwisko';
            this.role = sessionStorage.getItem('role') || 'Nieznana rola';
            this.faculty = sessionStorage.getItem('faculty') || 'Nieznany wydział';
        }
    }
};
</script>

<style lang="scss">
$primary-color: #0083BB;
$error-color: #ff4d4d;
$text-color: #FFFFFF;
$background-color: rgb(41, 38, 38);
$font-main: 'Open Sans', sans-serif;
$font-heading: 'Ubuntu', sans-serif;
$font-size-large: 1.2em;
$button-width: 12.5em;
$button-height: 3.125em;
$border-radius: 1.5625em;
$transition-duration: 0.3s;

.main-content {
    background-color: $background-color;
    color: $text-color;
    text-align: center;
    margin: 0;
    font-family: $font-main;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
}

h1, h2, h3, h4, h5, h6 {
    font-family: $font-heading;
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
    background-color: transparent !important;
}

.logo {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
}

header {
    margin-top: 20px;
    margin-bottom: 20px;
}

.employee-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
}

#employee-data {
    margin-left: 20px;
    display: inline;
    font-size: 2.25rem;
}

h2 {
    font-size: 1.125rem;
    margin: 5px 0;
}

.mainContent {
    font-size: 20px;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    justify-content: space-around;
}

.button-group {
    margin-top: 4rem;
    display: flex;
    align-items: center;
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







.loader {
  color: $text-color;
  font-size: 3rem;
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
  95%,
  100% {
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

  20%,
  38% {
    box-shadow: 0 -0.83em 0 -0.4em,
      -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em,
      -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em;
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
</style>