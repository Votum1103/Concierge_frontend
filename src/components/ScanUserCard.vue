<template>
  <GoogleFonts />
  <nav>
    <BackButton class="back-button" routeName="MainWindow" buttonText="Wróć">
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
    <section class="container">
      <h1>Zeskanuj kartę pracownika</h1>
      <span class="loader"></span>
      <div class="button-group">
        <RouteButton routeName="UserLogin" buttonText="Zaloguj się" />
      </div>
    </section>
  </main>
</template>


<script>
import GoogleFonts from './googleFonts.vue';
import RouteButton from './RouteButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import BackButton from './BackButton.vue';

export default {
  name: 'ScanConciergeCard',
  components: {
    WUoT_Logo,
    GoogleFonts,
    RouteButton,
    BackButton
  }
}

</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';

html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

body {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: $font-main;
  color: $text-color;
  background-color: $background-color;
  background-image: url('../assets/back.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

h1,
h2 {
  font-family: $font-heading;
}

button,
a,
p,
label {
  font-family: $font-main;
}

nav {
  display: flex;
  align-items: start;
  justify-content: flex-start;
  height: 50px;

}

.logo {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2em;
  width: 45%;
  min-width: 18.75rem;
  max-width: 37.5rem;
  background-color: $background-color;
  padding: 3.125rem 1.25rem;
  height: 40%;
  max-height: calc(100vh - 6.25rem);
  gap: 3.125rem;
  overflow: auto;
}

h1 {
  font-size: 2rem;
}

.loader {
  color: $text-color;
  font-size: 2.1875rem;
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

.button-group {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.primary-button {
  color: $text-color;
  font-size: $font-size-large;
  width: 25%;
  border: none;
  background-color: $primary-color;
  min-width: 12.5rem;
  height: 3.125rem;
  border-radius: 1.5625rem;
  transition: transform $transition-duration;
}

button:hover {
  transform: scale(1.07);
  cursor: pointer;
}

.back-button {
  display: inline-flex;
  text-decoration: none;
  align-items: center;
  background-color: transparent;
  color: $text-color;
  margin: 15px;
}

@media (max-width: 1040px) {
  .primary-button {
    height: 2.8125rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .primary-button {
    height: 2.5rem;
  }

  .loader {
    font-size: 1.5625rem;
  }
}

@media (max-width: 560px) {
  img {
    display: none;
  }
}
</style>