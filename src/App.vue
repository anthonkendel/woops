<template>
  <div id="app">
    <Callback />
    <router-view/>
  </div>
</template>

<script>
import Callback from '@/components/Callback';

export default {
  name: 'App',
  components: { Callback },
};
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
