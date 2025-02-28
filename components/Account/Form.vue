<template>
    <form class="form">
        <div class="form__header">
            <h3 class="form__header_title"> {{ localizationStore.accounts }} </h3>

            <CommonAddButton @click="onAddButtonClick" />
        </div>

        <div class="form__hint">
            <span class="form__hint_question-symbol"> ? </span>

            <p class="form__hint_text"> {{ localizationStore.hintForLabels }} </p>
        </div>

        <AccountTable />
    </form>
</template>

<script setup lang="ts">
const localizationStore = useLocalizationStore();

const accountsStore = useAccountsStore();

const onAddButtonClick = (): void => {
    accountsStore.createAcctount();
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__header {
        display: flex;
        align-items: center;
        gap: 15px;

        &_title {
            font-size: 30px;
            font-weight: 600;
        }
    }

    &__hint {
        display: flex;
        align-items: center;
        gap: 15px;

        background: #e4f1ff;
        padding: 10px;
        border-radius: 8px;

        &_question-symbol {
            border: 1px solid #000;
            border-radius: 50%;

            height: 22px;

            aspect-ratio: 1 / 1;

            line-height: 1;

            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>