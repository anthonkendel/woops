<template>
  <v-text-field
    v-model="query"
    clearable
    label="Search tracks"
    append-outer-icon="search"
    @click:append-outer="onSearch"
    @keydown.enter="onSearch"
  />
</template>

<script>
import { mapActions } from 'vuex';
import { actionType } from '@/store';

export default {
  name: 'SearchTracksInput',
  data: () => ({
    query: '',
  }),
  methods: {
    ...mapActions({
      search: actionType.loadSearchTracks,
    }),
    onSearch() {
      this.search(this.query);
    },
  },
};
</script>
