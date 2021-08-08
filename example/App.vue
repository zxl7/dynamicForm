<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      |
      <router-link to="/fieldsDev">
        fieldsDev
      </router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  background-color: #f8f8f8;
  font-size: 20px;
}

* {
  box-sizing: border-box;
}

#app {
  color: #333333;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  overflow: scroll;
}

#nav {
  padding: 1.5rem;

  a {
    color: #2c3e50;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.container {
  margin: 0 1rem;
}
</style>
