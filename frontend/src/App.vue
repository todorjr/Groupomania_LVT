<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      groupName: "Groupomania",
    };
  },

  created() {
    this.$store.dispatch("me");
  },
};
</script>
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
