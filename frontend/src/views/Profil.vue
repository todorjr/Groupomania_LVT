<template>
  <ProfilPage />
  <Comment />
</template>

<script>
import ProfilPage from "@/components/ProfilPage.vue";
import Comment from "@/components/Comment.vue";

export default {
  name: "Profil",
  components: {
    ProfilPage,
    Comment,
  },
};
</script>
