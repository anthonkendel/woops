<template>
  <div></div>
</template>

<script>
import { SpotifyService } from '@/services/spotify';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Callback',
  computed: {
    ...mapState(['auth']),
  },
  created() {
    const { accessToken, expiresIn } = SpotifyService.authFromCallback();
    if (accessToken && expiresIn) {
      this.setAuth({ accessToken, expiresIn });
      this.$router.push({ name: 'Start' });
    }
  },
  methods: {
    ...mapActions(['setAuth']),
  },
};
</script>
