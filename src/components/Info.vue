<template>
  <v-flex
    sm12
    class="py-2"
  >
    <v-card flat>
      <template v-if="selectedPlaylist.id">
        <v-img
          :src="selectedPlaylistImage"
          aspect-ratio="2.75"
        />
        <v-card-title primary-title>
          <div>
            <h2>{{ selectedPlaylist.name }}</h2>
            <div>There is {{ slectedPlaylistTotalTracks }} tracks in this playlist.</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn
            :href="selectedPlaylistUrl"
            color="primary"
            flat
            round
          >Open in Spotify</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-title>
          <h2>No playlist selected</h2>
        </v-card-title>
      </template>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';
import { stateKey } from '@/store';

export default {
  name: 'Info',
  computed: {
    ...mapState({
      selectedPlaylist: stateKey.selectedPlaylist,
    }),
    selectedPlaylistImage() {
      const [image] = this.selectedPlaylist.images || [];
      return image ? image.url || '' : '';
    },
    slectedPlaylistTotalTracks() {
      return (this.selectedPlaylist.tracks || {}).total;
    },
    selectedPlaylistUrl() {
      return (this.selectedPlaylist.external_urls || {}).spotify || '';
    },
  },
};
</script>
