<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
*,
*::before,
*::after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body,
h1,
p {
  margin: 0;
}

body {
  min-height: 100vh;
  background: linear-gradient(#222, 90%, #1db954);
  background-color: #222;
}
</style>
