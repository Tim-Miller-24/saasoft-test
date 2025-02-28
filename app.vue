<template>
  <div class="app">
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const acctountsStore = useAccountsStore();

acctountsStore.setDefault();
</script>