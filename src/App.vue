<template id="app">
  <v-app dark>
    <Callback/>
    <Toolbar/>
    <v-container>     
      <router-view v-if="auth.accessToken"/>
      <Authorize v-else />
    </v-container>
  </v-app>
</template>

<script>
import Authorize from '@/components/Authorize';
import Callback from '@/components/Callback';
import Toolbar from '@/components/Toolbar';
import { mapState } from 'vuex';
import { stateKey } from '@/store';

export default {
  name: 'App',
  computed: {
    ...mapState({
      auth: stateKey.auth,
    }),
  },
  components: { Authorize, Callback, Toolbar },
};
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
