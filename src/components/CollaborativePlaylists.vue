<template>
  <v-flex sm12>
    <v-card>
      <v-card-title>Playlists</v-card-title>
      <v-list>
        <template v-for="(playlist, index) in collaborativePlaylists">
          <v-list-tile @click="onClickPlaylist(playlist)" :key="playlist.id" avatar>
            <v-list-tile-avatar tile>
              <img :src="getPlaylistImage(playlist)" alt="playlist image" height="40">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ playlist.name }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-checkbox
                :input-value="playlist.id === selectedPlaylist"
                :ripple="false"
                color="purple"
                readonly
              ></v-checkbox>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="!isLastPlaylist(index)" :key="playlist.id"/>
        </template>
      </v-list>
      <v-card-actions>
        <v-btn color="purple" round disabled>New playlist</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { stateKey, actionType } from '@/store';

export default {
  name: 'CollaborativePlaylists',
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
      loadPlaylists: actionType.loadPlaylists,
    }),
    onClickPlaylist(playlist) {
      if (playlist.id === this.selectedPlaylist) {
        this.setSelectedPlaylist(undefined);
      } else {
        this.setSelectedPlaylist(playlist.id);
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
