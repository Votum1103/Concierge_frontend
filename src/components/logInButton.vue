<template>
    <button @click="redirectToRoute" class="primary-button">Zaloguj się</button>
  </template>
  
  <script>
  export default {
    name: 'LogInButton',
    props: {
      routeName: {
        type: String,
        required: true
      }
    },
    methods: {
      redirectToRoute() {
        this.$router.push({ name: this.routeName });
      }
    }
  }
  </script>
  
  <style lang="scss">
  </style>