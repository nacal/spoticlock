<template>
  <div class="nowplaying">
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
    <main class="main">
      <div v-if="nowPlaying != null" class="nowPlaying">
        <div class="nowPlaying__main" :class="{ fullScreen: isFullScreen }">
          <div class="nowPlaying__artwork">
            <img
              :src="nowPlaying.item.album.images[1].url"
              class="nowPlaying__img"
            />
            <div class="fullScreen">
              <button class="fullScreen__button" @click="fullScreen">
                <font-awesome-icon
                  class="fullScreen__icon"
                  :icon="['fas', 'expand-arrows-alt']"
                />
              </button>
            </div>
          </div>
          <Clock :class="{ fullScreen: isFullScreen }" />
        </div>
        <p class="nowPlaying__text">
          {{ nowPlaying.item.artists[0].name }} - {{ nowPlaying.item.name }}
        </p>
      </div>
      <div v-else class="nowPlaying">
        <div class="nowPlaying__main" :class="{ fullScreen: isFullScreen }">
          <div class="nowPlaying__artwork">
            <img src="../assets/nowPlaying_null.png" class="nowPlaying__img" />
            <div class="fullScreen">
              <button class="fullScreen__button" @click="fullScreen">
                <font-awesome-icon
                  class="fullScreen__icon"
                  :icon="['fas', 'expand-arrows-alt']"
                />
              </button>
            </div>
          </div>
          <Clock :class="{ fullScreen: isFullScreen }" />
        </div>
        <p class="nowPlaying__text">artist - title</p>
      </div>
    </main>
    <footer class="footer">
      <article class="copyright">
        <small lang="en">&copy; 2020 Hikaru Nakata.</small>
      </article>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import Button from "../components/Button.vue";
import Clock from "../components/Clock.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueRouter);
library.add(faExpandArrowsAlt);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default {
  components: {
    Button,
    Clock,
  },
  data: function () {
    return {
      nowPlaying: null,
      isFullScreen: false,
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
    fullScreen: function () {
      this.isFullScreen == true
        ? (this.isFullScreen = false)
        : (this.isFullScreen = true);
      console.log(this.isFullScreen);
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes show {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

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

.nowPlaying {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 100vw;
  height: calc(100vh - 232px);
  max-height: calc(100vh - 232px);

  &__main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100% - 48px);
    object-fit: contain;

    &.fullScreen {
      position: fixed;
      top: 0;
      height: 100vh;
    }
  }

  &__artwork {
    position: relative;
    height: 100%;

    .fullScreen {
      position: absolute;
      right: 0;
      bottom: 0;
      display: none;
      margin: 0 8px 8px 0;

      &__button {
        position: relative;
        width: 32px;
        height: 32px;
        cursor: pointer;
        border-radius: 25%;
        outline: none;
      }

      &__icon {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 24px;
        height: 24px;
        margin: 2px;
        color: #333;
      }
    }

    &:hover {
      .fullScreen {
        @media screen and (orientation: landscape) {
          display: block;
          animation: show .25s linear 0s;
        }
      }
    }
  }

  &__img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__text {
    height: 48px;
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}

.footer {
  display: flex;
  justify-content: center;
  height: 32px;
}

.copyright {
  line-height: 32px;
  color: #222;
}
</style>
