<template id="app">
  <v-app dark>
    <v-toolbar></v-toolbar>
    <Callback />
    <v-container fluid>
      <router-view/>
    </v-container>
  </v-app>
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
