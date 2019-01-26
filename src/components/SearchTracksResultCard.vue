<template>
  <v-card flat>
    <template v-if="searchTracks.length > 0">
      <v-card-title>
        <h2>Search result</h2>
      </v-card-title>
      <SearchTracksResultList />
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
import SearchTracksResultList from '@/components/SearchTracksResultList';

export default {
  name: 'SearchTracksResultCard',
  components: { SearchTracksResultList },
  computed: {
    ...mapState({
      searchTracks: stateKey.searchTracks,
    }),
  },
};
</script>
