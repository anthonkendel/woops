<template>
  <div>
    <p>Start</p>    
    <v-btn @click="onGetMe">Get me</v-btn>
    <v-btn @click="onGetMyPlaylist">Get my playlists</v-btn>
    <section>
      <h2>Me</h2>
      <div v-for="entry in Object.entries(me)" :key="entry[0]">
        <b>{{ entry[0] }}:</b>
        <span>{{ entry[1] }}</span>
      </div>
    </section>

    <section>
      <h2>Playlists</h2>
      <div v-for="entry in Object.entries(playlists)" :key="entry[0]">
        <b>{{ entry[0] }}:</b>
        <span>{{ entry[1] }}</span>
      </div>

      <h3>Playlists items</h3>
      <div v-for="(item, index) in playlists.items" :key="index">
        <div v-for="entry in Object.entries(item)" :key="entry[0]">
          <b>{{ entry[0] }}:</b>
          <span>{{ entry[1] }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { SpotifyService } from '@/services/spotify';
import { mapState } from 'vuex';
import { stateKey } from '@/store';

export default {
  name: 'Start',
  computed: {
    ...mapState({
      auth: stateKey.auth,
    }),
    collaborative: vm =>
      vm.playlists.items.filter(playlist => playlist.collaborative),
  },
  data: () => ({
    me: {},
    playlists: { items: [] },
  }),
  methods: {
    async onGetMe() {
      const response = await SpotifyService.me(this.auth.accessToken);
      this.me = response;
    },
    async onGetMyPlaylist() {
      const response = await SpotifyService.playlists(this.auth.accessToken);
      this.playlists = response;
    },
  },
};
</script>
