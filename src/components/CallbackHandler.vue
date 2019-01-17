<template>
  <div />
</template>

<script>
import { SpotifyService } from '@/services/spotify';
import { mapState, mapActions } from 'vuex';
import { stateKey, actionType } from '@/store';

export default {
  name: 'CallbackHandler',
  computed: {
    ...mapState({
      auth: stateKey.auth,
    }),
  },
  created() {
    const { accessToken, expiresIn } = SpotifyService.authFromCallback();
    if (accessToken && expiresIn) {
      this.setAuth({ accessToken, expiresIn });
      this.$router.push({ name: 'Home' });
    }
  },
  methods: {
    ...mapActions({
      setAuth: actionType.setAuth,
    }),
  },
};
</script>
