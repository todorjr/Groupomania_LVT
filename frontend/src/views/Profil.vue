<template>
  <div class="profile">
    <ProfilPage />
    <Footer />
  </div>
</template>

<script>
import ProfilPage from "@/components/ProfilPage.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Profil",
  components: {
    ProfilPage,
    Footer,
  },
};
</script>
