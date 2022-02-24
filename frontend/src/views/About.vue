<template>
  <div class="about">
    <h1>Groupomania</h1>
    <img alt="Groupomania" src="@/assets/groupomania.png" />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "About",
  components: {
    Footer,
  },
};
</script>

<style>
img {
  width: 70%;
  height: 50%;
}
</style>
