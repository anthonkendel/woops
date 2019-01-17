<template>
  <v-card flat>
    <template v-if="selectedPlaylist.id">
      <v-card-title>
        <h2>Tracks</h2>
      </v-card-title>
      
      <v-list>
        <div
          v-for="(track, index) in tracks"
          :key="`${track.id}-${index}`"
        >
          <v-list-tile @click="() => undefined">
            <v-list-tile-avatar tile>
              <img
                :src="getTrackImage(track)"
                alt="track image"
                height="40"
              >
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ track.name }}</v-list-tile-title>
              <v-list-tile-sub-title>
                {{ track.album.name }} - {{ getTrackArtists(track) }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="!isLastTrack(index)"/>
        </div>
      </v-list>
    </template>
    <template v-else>
      <v-card-title>
        <h2>No playlist selected</h2>
      </v-card-title>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { stateKey } from '@/store';

export default {
  name: 'SelectedPlaylistTracksCard',
  computed: {
    ...mapState({
      selectedPlaylist: stateKey.selectedPlaylist,
      tracks: stateKey.tracks,
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
