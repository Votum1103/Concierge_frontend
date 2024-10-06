<template>
    <button @click="redirectToRoute" class="primary-button">
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

.primary-button {
    color: #FFFFFF;
    font-size: 1.2em;
    width: 250px;
    height: 50px;
    border-radius: 25px;
    transition: all 0.3s;
    white-space: nowrap;
    border: none;
    background-color: #0083BB;

}

button:hover {
    transform: scale(1.07);
    cursor: pointer;
}

.button-content {
    display: flex;
    /* Ustawia Flexbox dla zawartości przycisku */
    align-items: center;
    /* Wyrównuje ikonę i tekst w pionie */
}

.icon {
    margin-right: 8px;
    /* Odstęp między ikoną a tekstem */
}

.text {
    font-size: 15px;
}
</style>
