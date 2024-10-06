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

<script>
export default {
    name: 'BackButton',
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
        redirectToRoute() {
            this.$router.push({ name: this.routeName });
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    font-family: 'Open Sans', sans-serif;
}

.back-button-component {
    color: #FFFFFF;
    font-size: 1.2em;
    width: 150px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
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
