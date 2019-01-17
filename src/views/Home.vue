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
        <v-flex
          sm12
          class="py-2"
        >
          <CollaborativePlaylistsCard />
        </v-flex>
        <v-flex
          sm12
          class="py-2"
        >
          <SelectedPlaylistCard />
        </v-flex>
        <v-flex
          sm12
          class="py-2"
        >
          <SpotifyPlayerCard />
        </v-flex>
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
        <v-flex
          sm12
          class="py-2 pl-2"
        >
          <SelectedPlaylistTracksCard />
        </v-flex>
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { SpotifyService } from '@/services/spotify';
import { stateKey } from '@/store';
import CollaborativePlaylistsCard from '@/components/CollaborativePlaylistsCard';
import SelectedPlaylistCard from '@/components/SelectedPlaylistCard';
import SelectedPlaylistTracksCard from '@/components/SelectedPlaylistTracksCard';
import SpotifyPlayerCard from '@/components/SpotifyPlayerCard';

export default {
  name: 'Home',
  components: {
    CollaborativePlaylistsCard,
    SelectedPlaylistCard,
    SelectedPlaylistTracksCard,
    SpotifyPlayerCard,
  },
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
