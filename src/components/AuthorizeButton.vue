<template>
  <v-btn
    center
    large
    round
    color="primary"
    @click="onAuthorize"
  >
    Authorize
  </v-btn>
</template>


<script>
import { SpotifyService } from '@/services/spotify';

export default {
  name: 'AuthorizeButton',
  methods: {
    onAuthorize: () => SpotifyService.authorize(),
  },
};
</script>
