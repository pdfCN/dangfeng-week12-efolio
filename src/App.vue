<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BHeader from './components/BHeader.vue';

const route = useRoute();

const showHeader = computed(() => route.name !== 'CountBookAPI' && route.name !== 'GetAllBookAPI');


</script>

<template>
  <div>
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
