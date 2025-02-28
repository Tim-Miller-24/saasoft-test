<template>
    <button class="add-button" @click.prevent.stop="emits('click')">
        +
    </button>
</template>

<script setup lang="ts">
const emits = defineEmits(['click']);
</script>

<style lang="scss" scoped>
.add-button {
    border: 1px solid #000;
    border-radius: 6px;

    font-size: 25px;
    line-height: 1;

    max-width: 40px;
    width: 100%;

    aspect-ratio: 1 / 1;

    cursor: pointer;
}
</style>