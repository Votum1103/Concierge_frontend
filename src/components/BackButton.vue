<template>
    <button @click="redirectToRoute" class="back-button-component">
        <div class="button-content">
            <div class="icon">
                <slot name="icon"></slot>
            </div>
            <div class="text">{{ buttonText }}</div>
        </div>
    </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

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

function redirectToRoute() {
  router.push({ name: props.routeName });
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';



.back-button-component {
    color: $text-color;
    font-size: $font-size-large;
    width: 150px;
    height: 50px;
    border-radius: 25px;
    transition: all $transition-duration;
    white-space: nowrap;
    border: none;
    background-color: transparent;

}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
}

.button-content {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 8px;

}

.text {
    font-size: 16px;
}
</style>
