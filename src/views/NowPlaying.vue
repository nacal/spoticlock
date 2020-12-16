<template>
  <div class="nowplaying">
    <header class="l-header">
      <div class="header">
        <h1 class="header__title">SpotyClock</h1>
        <div class="header__button button">
          <button @click="spotifyLogin" class="button__item">
            <span class="button__text">Link Spotify</span>
          </button>
          <button @click="getNowPlaying" class="button__item">
            <span class="button__text">Get NowPlaying</span>
          </button>
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
  height: 120px;
}

.header {
  text-align: center;

  &__title {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #1db954;
  }

  &__button {
    margin-bottom: 1rem;
  }
}

.button {
  &__item {
    position: relative;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    text-decoration: none;
    overflow: hidden;

    padding: 1.5rem 6rem;

    color: #fff;
    background: #000;
    position: relative;
    width: 220px;

    & + & {
      margin-left: 8px;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      width: 150%;
      height: 500%;

      content: "";
      transition: all 0.5s ease-in-out;
      transform: translateX(-80%) translateY(-25%) rotate(45deg);

      background: #1db954;
    }

    &:hover::before {
      transform: translateX(-9%) translateY(-25%) rotate(45deg);
    }
  }

  &__text {
    position: relative;
  }
}

.nowPlaying {
  &__img {
    max-width: 100vw;
    max-height: calc(100vh - 174px);
    height: calc(100vh - 174px);
    width: 100vw;
    object-fit: contain;
  }

  &__text {
    height: 48px;
    text-align: center;
    line-height: 48px;
  }
}
</style>
