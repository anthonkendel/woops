<template>
  <v-layout
    align-space-around
    justify-center
    fill-height
    wrap
  >
    <v-flex
      sm12
      md4
    >
      <v-layout
        align-space-around
        justify-center
        wrap
      >
        <v-flex
          sm12
          class="py-2"
        >
          <CollaborativePlaylistsCard />
        </v-flex>
        <v-flex
          sm12
          class="py-2"
        >
          <SelectedPlaylistCard />
        </v-flex>
        <v-flex
          sm12
          class="py-2"
        >
          <SpotifyPlayerCard />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      sm12
      md8
    >
      <v-layout
        align-space-around
        justify-center
        wrap
      >
        <v-flex
          sm12
          class="pt-2 pl-2"
        >
          <v-card
            class="pt-2 px-4"
            flat
          >
            <SearchTracksInput />
          </v-card>
        </v-flex>
        <v-flex
          sm12
          class="pt-2 pl-2"
        >
          <SearchTracksResultCard />
        </v-flex>
        <v-flex
          sm12
          class="py-2 pl-2"
        >
          <SelectedPlaylistTracksCard />
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import CollaborativePlaylistsCard from '@/components/CollaborativePlaylistsCard';
import SearchTracksResultCard from '@/components/SearchTracksResultCard';
import SearchTracksInput from '@/components/SearchTracksInput';
import SelectedPlaylistCard from '@/components/SelectedPlaylistCard';
import SelectedPlaylistTracksCard from '@/components/SelectedPlaylistTracksCard';
import SpotifyPlayerCard from '@/components/SpotifyPlayerCard';

export default {
  name: 'Home',
  components: {
    CollaborativePlaylistsCard,
    SearchTracksResultCard,
    SelectedPlaylistCard,
    SelectedPlaylistTracksCard,
    SpotifyPlayerCard,
    SearchTracksInput,
  },
};
</script>
