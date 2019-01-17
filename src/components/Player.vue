<template>
  <v-flex
    v-if="selectedPlaylist.id"
    sm12
    class="py-2"
  >
    <v-card flat>
      <v-img
        :src="trackImage"
        aspect-ratio="2.75"
      />
      <v-card-title primary-title>
        <div>
          <h2>{{ track.name }}</h2>
          <div>{{ trackArtists }}</div>
        </div>
      </v-card-title>

      <v-layout wrap>
        <v-flex
          sm12
          v-if="currentPlayback.is_playing"
        >
          <v-progress-linear
            color="purple"
            :value="trackProgress"
          />
          <p class="text-xs-center">{{ progressLength }} - {{ trackLength }}</p>
        </v-flex>
        <v-flex sm12>
          <v-layout justify-center>
            <v-card-actions class="text-sm-center">
              <v-btn
                @click="onPlayPause"
                fab
                depressed
                color="primary"
              >
                <v-icon v-if="isPlaying">pause</v-icon>
                <v-icon v-else>play_arrow</v-icon>
              </v-btn>
            </v-card-actions>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { stateKey, actionType } from '@/store';
import { SpotifyService } from '@/services/spotify';

function toMinutesAndSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default {
  name: 'Player',
  computed: {
    ...mapState({
      selectedPlaylist: stateKey.selectedPlaylist,
      currentPlayback: stateKey.currentPlayback,
      auth: stateKey.auth,
    }),
    isPlaying: vm => vm.currentPlayback.is_playing,
    track() {
      return this.currentPlayback.item || {};
    },
    trackProgress() {
      const currentProgress = this.currentPlayback.progress_ms;
      const trackDuration = this.currentPlayback.item.duration_ms;
      return (currentProgress / trackDuration) * 100;
    },
    trackLength() {
      const trackDuration = this.track.duration_ms || 0;
      return toMinutesAndSeconds(trackDuration);
    },
    progressLength() {
      const currentProgress = this.currentPlayback.progress_ms;
      return toMinutesAndSeconds(currentProgress);
    },
    trackImage() {
      const [image] = (this.track.album || {}).images || [];
      return image ? image.url || '' : '';
    },
    trackArtists() {
      return (this.track.artists || []).map(artist => artist.name).join(', ');
    },
  },
  data: () => ({
    UPDATE_INTERVAL_IN_MS: 6000,
    interval: undefined,
  }),
  watch: {
    selectedPlaylist: {
      handler() {
        if (!this.selectedPlaylist.id) {
          this.removeInterval();
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.selectedPlaylist.id) {
      this.startInterval();
    }
  },
  methods: {
    ...mapActions({
      loadCurrentPlayback: actionType.loadCurrentPlayback,
      clearCurrentPlayback: actionType.clearCurrentPlayback,
    }),
    startInterval() {
      this.interval = setInterval(
        this.loadCurrentPlayback,
        this.UPDATE_INTERVAL_IN_MS
      );
    },
    removeInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.clearCurrentPlayback();
      }
    },
    async onPlayPause() {
      if (this.isPlaying) {
        await SpotifyService.pause(this.auth.accessToken);
        this.loadCurrentPlayback();
      } else {
        await SpotifyService.play(
          {
            context_uri: this.selectedPlaylist.uri,
          },
          this.auth.accessToken
        );
        this.loadCurrentPlayback();
      }
    },
  },
};
</script>
