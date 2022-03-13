<template>
  <!--SignIn -->
  <h1>Hi there ! 👋🏻 <br />Nice to see you again !</h1>

  <form class="signin shadow-5" method="post">
    <p class="h4 text-center mb-4">Sign In</p>
    <div class="grey-text">
      <MDBInput
        label="Your email"
        required
        icon="envelope"
        type="email"
        v-model="user.email"
      />
      <MDBInput
        class="pass"
        label="Your password"
        required
        icon="lock"
        type="password"
        v-model="user.password"
      />
    </div>
    <div class="text-center">
      <MDBBtn color="danger" type="submit" @click.prevent="LogIn()"
        >Login</MDBBtn
      >
    </div>
  </form>
  <!-- Material form login -->
  <Footer />
</template>

<script>
import axios from "axios";

import Footer from "@/components/Footer.vue";
import { MDBInput, MDBBtn } from "mdb-vue-ui-kit";

export default {
  name: "SignInForm",
  components: {
    MDBInput,
    MDBBtn,
    Footer,
  },

  data() {
    return {
      user: {
        password: null,
        email: null,
      },
    };
  },
  methods: {
    LogIn() {
      if (this.user.email !== null) {
        axios
          .post("http://localhost:3000/user/login", this.user)
          .then((result) => {
            console.log(result);
            localStorage.setItem("token", result.data.token);
            this.$router.push("/allposts");
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
<style>
.signin {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}
.text-center,
.pass {
  margin-top: 10px;
}
</style>
