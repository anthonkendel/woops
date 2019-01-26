<template>
  <v-list>
    <div
      v-for="(playlist, index) in collaborativePlaylists"
      :key="playlist.id"
    >
      <v-list-tile
        avatar
        @click="onClickPlaylist(playlist)"
      >
        <v-list-tile-avatar tile>
          <img
            :src="playlist | playlistImage"
            alt="playlist image"
            height="40"
          >
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-checkbox
            :input-value="playlist.id === selectedPlaylist.id"
            :ripple="false"
            color="primary"
            readonly
          />
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="!collaborativePlaylists.length - 1 === index" />
    </div>
  </v-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { stateKey, actionType } from '@/store';

export default {
  name: 'CollaborativePlaylistsList',
  filters: {
    playlistImage(playlist) {
      const [image] = playlist.images;
      return image ? image.url || '' : '';
    },
  },
  computed: {
    ...mapState({
      selectedPlaylist: stateKey.selectedPlaylist,
      playlists: stateKey.playlists,
    }),
    collaborativePlaylists: vm =>
      vm.playlists.filter(playlist => playlist.collaborative),
  },
  created() {
    this.loadPlaylists();
  },
  methods: {
    ...mapActions({
      setSelectedPlaylist: actionType.setSelectedPlaylist,
      clearTracks: actionType.clearTracks,
      clearSelectedPlaylist: actionType.clearSelectedPlaylist,
      clearCurrentPlayback: actionType.clearCurrentPlayback,
      loadPlaylists: actionType.loadPlaylists,
    }),
    onClickPlaylist(playlist) {
      if (playlist.id === this.selectedPlaylist.id) {
        this.clearTracks();
        this.clearSelectedPlaylist();
        this.clearCurrentPlayback();
      } else {
        this.setSelectedPlaylist(playlist);
      }
    },
  },
};
</script>
