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
*:before,
*:after {
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
  background: linear-gradient(#222, 90%, #1db954);
  min-height: 100vh;
}
</style>
