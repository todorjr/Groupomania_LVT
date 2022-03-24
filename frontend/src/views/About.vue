<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/signup">Connect</router-link>
    <router-link to="/signin"></router-link>
    <router-link to="/profil"></router-link>
    <router-link to="/allposts"></router-link>
  </div>
  <div class="d-sm-md-flex flex-sm-md-column align-items-center">
    <div class="cardAbout img-fluid hover-shadow" style="width: 18rem">
      <img
        src="@/assets/icon-above-font.svg"
        class="card-img-top"
        alt="grp"
        @click="GoToHome()"
      />
      <div class="card-body">
        <p class="card-text">
          {{ aboutUs }}
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "About",
  components: {
    Footer,
  },
  data() {
    return {
      aboutUs: `Notre entreprise, spécialisée dans la grande distribution, est en
          pleine expansion. Nous avons actuellement plus de 600 collaborateurs
          et avons beaucoup recruté depuis quelques années. Nous étions
          uniquement 300 il y a 3 ans.`,
    };
  },
  methods: {
    GoToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.cardAbout {
  margin: auto;
  width: 60%;
  border-radius: 25px;
  padding: 10px;
  cursor: pointer;
}
</style>
