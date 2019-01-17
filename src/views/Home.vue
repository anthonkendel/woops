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
        <Player />
      </v-layout>
    </v-flex>
    <v-flex
      sm12
      md8
    >
      <v-layout
        align-space-around
        justify-center
        wrap
      >
        <v-flex sm12>
          SEARCH AND ADD SONGS
        </v-flex>
        <Tracks />
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { SpotifyService } from '@/services/spotify';
import { stateKey } from '@/store';
import Info from '@/components/Info';
import Player from '@/components/Player';
import Playlists from '@/components/Playlists';
import Tracks from '@/components/Tracks';

export default {
  name: 'Home',
  components: { Info, Player, Playlists, Tracks },
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
