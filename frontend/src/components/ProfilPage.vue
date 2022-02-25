<template>
  <div class="container">
    <h1 class="welcome">Welcome {{ name }} !</h1>
    <img alt="profil image" src="@/assets/pp.png" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      name: "Lazar",
    };
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 25px;
}
.welcome {
  text-align: left;
}
img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-top: 50px;
}
</style>
