<template>
  <button @click="handleClick" class="primary-button">
    <div class="button-content">
      <div class="icon">
        <slot name="icon"></slot>
      </div>
      <div class="text">
        <slot>{{ buttonText }}</slot>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'RouteButton',
  props: {
    routeName: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  },
  methods: {
    async handleClick() {

      await this.$emit('click');

      this.$router.push({ name: this.routeName });
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  font-family: 'Open Sans', sans-serif;
}

.primary-button {
  color: #FFFFFF;
  font-size: 1.2em;
  width: 250px;
  height: 50px;
  border-radius: 25px;
  transition: all 0.3s;
  border: none;
}


button:hover {
  transform: scale(1.07);
  cursor: pointer;
}

.icon {
  margin-bottom: 2px;
}

.text {
  font-size: 18px;
}
</style>
