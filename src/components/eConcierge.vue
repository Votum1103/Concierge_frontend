<template>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <GoogleFons/>
    <title>e-portiernia - zeskanuj kartę</title>
</head>
<body>
    <nav>
      <WUoT_Logo class="kajman"/>
    </nav>

    <main>
        <section class="main-window">
        <h1>Zeskanuj kartę portiera</h1>
        <span class="loader"></span>
        <div class="button-group"><LogInButton/></div>
    </section>
    </main>
</body>
</template>

<script>
import GoogleFons from './googleFons.vue';
import LogInButton from './logInButton.vue';
import WUoT_Logo from './WUoT_Logo.vue';

export default {
  name: 'eConcierge',
  components: {
    WUoT_Logo,
    GoogleFons,
    LogInButton
  }
}

</script>


<style lang="scss">
body {
    background: rgb(41, 38, 38);
    color: white;
    text-align: center;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background-image: url('../assets/back.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

h1, h2 {
  font-family: 'Ubuntu';
}

button, a, p, label {
  font-family: 'Open Sans', sans-serif;
}

nav {
  height: 50px;
}

.logo {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
}

main{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-window{
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  min-width: 300px;
  max-width: 600px;
  background: rgb(0, 0, 0);
  padding: 50px 0 50px 0;
  margin-top: 7%;
  height: 450px;
  gap: 100px;
}

h1{
  font-family: 'Ubuntu';
  font-size: xx-large;
}

.loader {
    color: #ffffff;
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
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }

  .button-group {
    display: flex;
    justify-content: space-around;
}

.primary-button{
    color: #FFFFFF;
    font-size: 1.2em;
    width: 25%;
    border: none;
    background-color: #0083BB;
    min-width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
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
