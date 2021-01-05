<template>
  <header class="l-header">
    <div class="header">
      <h1 class="header__title">
        <span class="-main">SpotiClock</span>
        <span class="-sub" lang="en">Spotify NowPlayng Clock</span>
      </h1>
      <div class="header__button">
        <Button buttonName="Link Spotify" @click.native="spotifyLogin" />
        <Button buttonName="Get NowPlaying" @click.native="getNowPlaying" />
      </div>
    </div>
  </header>
</template>

<script>
import Button from "../components/Button.vue";
import axios from "axios";

export default {
  components: {
    Button,
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
    fullScreen: function () {
      this.isFullScreen == true
        ? (this.isFullScreen = false)
        : (this.isFullScreen = true);
      console.log(this.isFullScreen);
    },
  },
};
</script>

<style lang="scss">
.l-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.header {
  text-align: center;

  &__title {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    font-family: fieldwork, sans-serif;
    font-style: normal;

    .-main {
      font-size: 3rem;
      font-weight: 500;
      line-height: 1.2em;
      color: #1db954;
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
</style>
