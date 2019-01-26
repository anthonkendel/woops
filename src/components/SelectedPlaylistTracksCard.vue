<template>
  <v-card flat>
    <template v-if="selectedPlaylist.id">
      <v-card-title>
        <h2>Tracks</h2>
      </v-card-title>
      <SelectedPlaylistTracksList />
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
import SelectedPlaylistTracksList from '@/components/SelectedPlaylistTracksList';

export default {
  name: 'SelectedPlaylistTracksCard',
  components: { SelectedPlaylistTracksList },
  computed: {
    ...mapState({
      selectedPlaylist: stateKey.selectedPlaylist,
    }),
  },
};
</script>
