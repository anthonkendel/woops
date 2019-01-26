<template>
  <v-list>
    <div
      v-for="(track, index) in searchTracks"
      :key="`${track.id}-${index}`"
    >
      <v-list-tile
        :color="track.id === currentPlaybackTrackId ? 'primary' : undefined"
        @click="() => undefined"
      >
        <v-list-tile-avatar tile>
          <img
            :src="track | trackImage"
            alt="track image"
            height="40"
          >
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ track.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ track.album.name }} - {{ track | trackArtists }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="!searchTracks.length - 1 === index" />
    </div>
  </v-list>
</template>

<script>
import { mapState } from 'vuex';
import { stateKey } from '@/store';

export default {
  name: 'SearchTracksResultList',
  filters: {
    trackImage(track) {
      const [image] = track.album.images || [];
      return image ? image.url || '' : '';
    },
    trackArtists(track) {
      return (track.artists || []).map(artist => artist.name).join(', ');
    },
  },
  computed: {
    ...mapState({
      searchTracks: stateKey.searchTracks,
    }),
  },
};
</script>
