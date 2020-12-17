<template>
  <div class="nowplaying">
    <header class="l-header">
      <div class="header">
        <h1 class="header__title">
          <span class="-main">SpotiClock</span>
          <span class="-sub" lang="en">Spotify NowPlayng Clock</span>
        </h1>
        <div class="header__button button">
          <Button buttonName="Link Spotify" @click.native="spotifyLogin" />
          <Button buttonName="Get NowPlaying" @click.native="getNowPlaying" />
        </div>
      </div>
    </header>
    <main class="main">
      <div v-if="nowPlaying != null" class="nowPlaying">
        <img
          :src="nowPlaying.item.album.images[1].url"
          class="nowPlaying__img"
        />
        <p class="nowPlaying__text">
          {{ nowPlaying.item.artists[0].name }} - {{ nowPlaying.item.name }}
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Button from "../components/Button.vue";

export default {
  components: {
    Button,
  },
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
    getNowPlaying: function () {
      let endpoint =
        "https://api.spotify.com/v1/me/player/currently-playing?market=JP";
      let data = {
        headers: {
          Authorization:
            this.routeParams.token_type + " " + this.routeParams.access_token,
        },
        data: {},
      };
      let self = this;
      let fetchData = function () {
        axios
          .get(endpoint, data)
          .then((res) => {
            self.nowPlaying = res.data;
          })
          .catch((err) => {
            console.error(err);
          });
      };
      fetchData();
      setInterval(fetchData, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.l-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.header {
  text-align: center;

  &__title {
    margin-bottom: 1rem;
    font-family: fieldwork, sans-serif;
    font-style: normal;
    display: flex;
    flex-direction: column;

    .-main {
      font-size: 3rem;
      font-weight: 500;
      color: #1db954;
      line-height: 1.2em;
    }

    .-sub {
      font-size: 1rem;
      font-weight: 300;
      color: #fff;
    }
  }

  &__button {
    margin-bottom: 1rem;
  }
}

.nowPlaying {
  &__img {
    max-width: 100vw;
    max-height: calc(100vh - 214px);
    height: calc(100vh - 214px);
    width: 100vw;
    object-fit: contain;
  }

  &__text {
    height: 48px;
    text-align: center;
    line-height: 48px;
    color: #fff;
  }
}
</style>
