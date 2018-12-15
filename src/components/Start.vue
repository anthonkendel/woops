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
        wrap
      >
        <Playlists />
        <Info />
      </v-layout>
    </v-flex>
    <v-flex
      sm12
      md8
    >SONGS IN SELECTED PLAYLISTS</v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { SpotifyService } from '@/services/spotify';
import { stateKey } from '@/store';
import Info from '@/components/Info';
import Playlists from '@/components/Playlists';

export default {
  name: 'Start',
  components: { Info, Playlists },
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
