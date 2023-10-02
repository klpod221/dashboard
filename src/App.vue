<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup>
import { provide, shallowRef } from 'vue';
import router from './router';
import layouts from './layouts';

const layout = shallowRef(layouts.DefaultLayout);

router.afterEach((to) => {
  layout.value = layouts[to.meta.layout] || layouts.DefaultLayout;
});

provide('app:layout', layout);
</script>
