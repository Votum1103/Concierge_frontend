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

<script setup>
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from 'vue';

const router = useRouter();

const props = defineProps({
  routeName: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['click']);

async function handleClick() {
  await emit('click');
  router.push({ name: props.routeName });
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';

button {
  font-family: $font-main;
}

.primary-button {
  width: 200px;
  height: 50px;
  color: $text-color;
  font-size: $font-size-large;
  border: none;
  border-radius: 25px;
  transition: all $transition-duration;
}

button:hover {
  transform: scale(1.07);
  cursor: pointer;
}

.icon {
  margin-bottom: 2px;
}
</style>