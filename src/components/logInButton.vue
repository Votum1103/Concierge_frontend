!<template>
<button class="primary-button">Zaloguj się</button>
</template>
<script>
export default {
    name: 'LogInButton',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    redirectToUrl() {
      window.location.href = this.url;
    }
  }
}
</script>
<style lang="scss">
    
</style>