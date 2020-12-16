<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
  font-size: 62.5%;
}

body,
h1,
p {
  margin: 0;
}

body {
  background-color: #222;
}
</style>
