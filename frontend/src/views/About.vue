<template>
  <div class="about">
    <div class="cardAbout img-fluid hover-shadow" style="width: 18rem">
      <img src="@/assets/icon-above-font.svg" class="card-img-top" alt="grp" />
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
};
</script>

<style>
.cardAbout {
  margin: auto;
  width: 60%;
  border-radius: 25px;
  padding: 10px;
}
</style>
