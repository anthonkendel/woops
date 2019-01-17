<template id="app">
  <v-app dark>
    <CallbackHandler />
    <TheToolbar />
    <v-container>
      <router-view v-if="auth.accessToken" />
      <Authorize v-else />
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { stateKey } from '@/store';
import Authorize from '@/views/Authorize';
import CallbackHandler from '@/components/CallbackHandler';
import TheToolbar from '@/components/TheToolbar';

export default {
  name: 'App',
  components: {
    Authorize,
    CallbackHandler,
    TheToolbar,
  },
  computed: {
    ...mapState({
      auth: stateKey.auth,
    }),
  },
};
</script>

<style lang="scss">
html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>
