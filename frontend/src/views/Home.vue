<template>
  <div class="home">
    <Header />

    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
  props: {
    mode: {
      type: String,
      default: "connexion",
    },
  },
};
</script>
<style>
.home h1 {
  margin-top: 10px;
}
</style>
