<template>
  <v-card flat>
    <v-card-title>
      <h2>Playlists</h2>
    </v-card-title>
    <v-list>
      <div
        v-for="(playlist, index) in collaborativePlaylists"
        :key="playlist.id"
      >
        <v-list-tile
          @click="onClickPlaylist(playlist)"
          avatar
        >
          <v-list-tile-avatar tile>
            <img
              :src="getPlaylistImage(playlist)"
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
            ></v-checkbox>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="!isLastPlaylist(index)"/>
      </div>
    </v-list>
    <v-card-actions>
      <v-btn
        color="primary"
        round
        flat
      >New playlist</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { stateKey, actionType } from '@/store';

export default {
  name: 'CollaborativePlaylistsCard',
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
    getPlaylistImage(playlist) {
      const [image] = playlist.images;
      return image ? image.url || '' : '';
    },
    isLastPlaylist(index) {
      return this.collaborativePlaylists.length - 1 === index;
    },
  },
};
</script>
