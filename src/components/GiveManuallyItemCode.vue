<template>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <GoogleFonts />
        <title>e-portiernia - zeskanuj kartę</title>
    </head>

    <body>
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

        <main>
            <section class="main-group">
                <h1>Podaj kod przedmiotu</h1>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <input type="text" v-model="itemCode" id="code-input" name="code-input"
                            placeholder="Kod przemiotu" required>
                    </div>
                    <div class="button-group"><button class="primary-button">Potwierdź</button></div>
                </form>
            </section>
        </main>
    </body>
</template>

<script>
import GoogleFonts from './googleFonts.vue';
import WUoT_Logo from './WUoT_Logo.vue';
import BackButton from './BackButton.vue';

export default {
    name: 'GiveManuallyItemCode',
    components: {
        GoogleFonts,
        WUoT_Logo,
        BackButton
    },
    data() {
        return {
            itemCode: ''  
        };
    },
    methods: {
        submitForm() {
            this.$emit('submit-item-code', this.itemCode);
            this.itemCode = '';
        }
    }
};
</script>



<style lang="scss" scoped>
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

h1,
h2 {
    font-family: 'Ubuntu';
}

button,
a,
p,
label {
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
    background-color: transparent !important;
}


.logo {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
}

main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main-group {
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 45%;
    min-width: 300px;
    max-width: 600px;
    background: rgb(0, 0, 0);
    padding: 50px 0 50px 0;
    margin-top: 7%;
    height: 450px;
}

h1 {
    font-family: 'Ubuntu';
    font-size: xx-large;
    margin-bottom: 100px;
}

.form-group {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
}

input,
input::placeholder {
    color: inherit;
    font-family: inherit;
    font-size: 18px;
    background-color: inherit;
    border: none;
    border-bottom: 3px solid #0083BB;
    padding-bottom: 5px;
    width: 300px;
    box-sizing: border-box;
}

input:focus::placeholder {
    color: transparent;
}

.button-group {
    display: flex;
    justify-content: center;
}

.primary-button {
    margin-top: 80px;
    color: #FFFFFF;
    font-size: 1.2em;
    border: none;
    background-color: #0083BB;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    border-bottom: 3px solid #0083BB;
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
}

*:focus {
    outline: none;
}

@media (max-width: 1040px) {
    .button-group button {
        height: 45px;
        font-size: 0.9em;
    }

    input::placeholder,
    input {
        font-size: 16px;
        width: 230px;
    }
}

@media (max-width: 768px) {

    input::placeholder,
    input {
        font-size: 14px;
        width: 210px;
    }

    h1 {
        font-size: x-large;
    }

    .button-group button {
        height: 40px;
    }
}

@media (max-width: 560px) {

    input::placeholder,
    input {
        font-size: 12px;
        width: 190px;
    }

    img,
    .back-button {
        display: none;
    }
}
</style>