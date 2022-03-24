<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/signup">Connect</router-link>
    <router-link to="/signin"></router-link>
    <router-link to="/profil"></router-link>
    <router-link to="/allposts"></router-link>
  </div>
  <div class="header d-flex flex-column align-items-center">
    <img class="logo" alt="Logo" src="../assets/icon.svg" />
    <h1>{{ message }}</h1>
    <p class="message">{{ phrase }}<br />{{ teamName }}</p>
    <img
      alt="logo and name of company"
      class="logoname"
      src="@/assets/icon-left-font.png"
      style="cursor: pointer"
      @click="GoToProfil()"
    />
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      message: "Welcome to our company's social network ! Enjoy ! ",
      phrase: ` We are dedicated to have good team with happy and satisifed cooperators.Thank you for being with us! `,
      teamName: `Team "Groupomania"`,
    };
  },
  methods: {
    GoToProfil() {
      this.$router.push("/profil");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");
h1 {
  font-family: "Abel", sans-serif;
  color: red;
}
.message {
  font-size: 20px;
  color: black;
  font-family: "Abel", sans-serif;
}
.logo {
  width: 7%;
  height: 3%;
  animation: rotation 4s infinite linear;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.logoname {
  width: 350px;
  height: 350px;
}
</style>
