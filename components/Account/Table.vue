<template>
    <div class="table">
        <div class="table__header">
            <p> {{ localizationStore.notes }} </p>
            <p> {{ localizationStore.noteType }} </p>
            <p> {{ localizationStore.login }} </p>
            <p> {{ localizationStore.password }} </p>
        </div>
        <div class="table__body">
            <AccountRow v-for="(item, index) in allAaccounts" :item="item" :key="index" />
        </div>
    </div>
</template>

<script setup lang="ts">
const localizationStore = useLocalizationStore();

const accountsStore = useAccountsStore();

const { allAaccounts } = storeToRefs(accountsStore);
</script>

<style lang="scss" scoped>
.table {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__header {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;

        padding-right: 30px;

        font-size: 20px;

        color: gray;
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
}
</style>