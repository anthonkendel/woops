<template>
  <v-card flat>
    <template v-if="tracks.length > 0">
      <v-card-title>
        <h2>Search result</h2>
      </v-card-title>

      <v-list>
        <div
          v-for="(track, index) in tracks"
          :key="`${track.id}-${index}`"
        >
          <v-list-tile
            :color="track.id === currentPlaybackTrackId ? 'primary' : undefined"
            @click="() => undefined"
          >
            <v-list-tile-avatar tile>
              <img
                :src="getTrackImage(track)"
                alt="track image"
                height="40"
              >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ track.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ track.album.name }} - {{ getTrackArtists(track) }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="!isLastTrack(index)" />
        </div>
      </v-list>
    </template>
    <template v-else>
      <v-card-title>
        <h2>No search result</h2>
      </v-card-title>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { stateKey } from '@/store';

export default {
  name: 'SearchTracksResultCard',
  computed: {
    ...mapState({
      tracks: stateKey.searchTracks,
    }),
  },
  methods: {
    getTrackImage(track) {
      const [image] = track.album.images || [];
      return image ? image.url || '' : '';
    },
    getTrackArtists(track) {
      return (track.artists || []).map(artist => artist.name).join(', ');
    },
    isLastTrack(index) {
      return this.tracks.length - 1 === index;
    },
  },
};
</script>
