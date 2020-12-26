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

export default {
  components: {
    Button,
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
