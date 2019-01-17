<template>
  <v-layout
    align-center
    justify-center
    fill-height
  >
    <v-flex
      xs12
      md6
      lg4
      class="text-xs-center"
    >
      <h2 class="display-3">
        Welcome to Woops!
      </h2>
      <p class="body-2">
        For the application to work correctly it will need access to your Spotify.
        Click one the authorize button below to enter website.
      </p>
      <AuthorizeButton />
    </v-flex>
  </v-layout>
</template>

<script>
import AuthorizeButton from '@/components/AuthorizeButton';
import { SpotifyService } from '@/services/spotify';

export default {
  name: 'Authorize',
  components: { AuthorizeButton },
  methods: {
    onAuthorize: () => SpotifyService.authorize(),
  },
};
</script>
