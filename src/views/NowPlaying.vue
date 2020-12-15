<template>
  <div class="nowplaying">
    <h1>NowPlaying</h1>
    <button @click="spotifyLogin">認証</button>
    <p>{{ routeParams }}</p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      nowPlaying: null,
    };
  },
  props: {
    routeParams: Object,
  },
  created: function () {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"));
    }
  },
  methods: {
    spotifyLogin: function () {
      let endpoint = "https://accounts.spotify.com/authorize";
      let response_type = "token";
      let client_id = "b64cf338c3774fb3a03c1e91100c8dac";
      let redirect_uri = "http://localhost:8080";
      let scope = "user-read-currently-playing";
      location.href =
        endpoint +
        "?response_type=" +
        response_type +
        "&client_id=" +
        client_id +
        "&redirect_uri=" +
        redirect_uri +
        "&scope=" +
        scope;
    },
  },
};
</script>
