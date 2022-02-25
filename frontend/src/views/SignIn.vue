<template>
  <SignInForm />
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";
import SignInForm from "@/components/SignInForm.vue";

export default {
  name: "SignIn",
  components: {
    SignInForm,
    Footer,
  },
};
</script>
