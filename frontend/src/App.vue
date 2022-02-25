<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/connect">Connect</router-link> |
      <router-link to="/profil">My Profile</router-link>|
      <router-link to="/allposts">Blog</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  position: relative;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: red;
}
</style>
