<template>
  <v-layout
    align-space-around
    justify-center
    fill-height
    wrap
  >
    <v-flex
      sm12
      md4
    >
      <v-layout
        align-space-around
        justify-center
        fill-height
        wrap
      >
        <CollaborativePlaylists/>
        <v-flex sm12>
          INFORMATION SELECTED PLAYLIST
          CURRENTLY PLAYING SONG
          PLAYBACK CONTROLS
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      sm12
      md8
    >SONGS IN SELECTED PLAYLISTS</v-flex>
  </v-layout>
</template>

<script>
import { SpotifyService } from '@/services/spotify';
import { mapState } from 'vuex';
import { stateKey } from '@/store';
import CollaborativePlaylists from '@/components/CollaborativePlaylists';

export default {
  name: 'Start',
  components: { CollaborativePlaylists },
  computed: {
    ...mapState({
      auth: stateKey.auth,
    }),
    collaborative: vm =>
      vm.playlists.items.filter(playlist => playlist.collaborative),
  },
  data: () => ({
    me: {},
    playlists: { items: [] },
  }),
  methods: {
    async onGetMe() {
      const response = await SpotifyService.me(this.auth.accessToken);
      this.me = response;
    },
    async onGetMyPlaylist() {
      const response = await SpotifyService.playlists(this.auth.accessToken);
      this.playlists = response;
    },
  },
};
</script>
