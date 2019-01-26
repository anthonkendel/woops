<template>
  <v-card flat>
    <v-card-title>
      <h2>Playlists</h2>
    </v-card-title>
    <CollaborativePlaylistsList />
  </v-card>
</template>

<script>
import CollaborativePlaylistsList from '@/components/CollaborativePlaylistsList';

export default {
  name: 'CollaborativePlaylistsCard',
  components: { CollaborativePlaylistsList },
};
</script>
