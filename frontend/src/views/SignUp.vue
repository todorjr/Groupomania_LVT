<template>
  <h1>Welcome ! <br />Feel free to connect to our social network !</h1>
  <form class="shadow-5" method="post">
    <!-- 2 column grid layout with text inputs for the first and last names -->
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput
          type="text"
          label="First name"
          required
          id="firstName"
          v-model="user.firstName"
          value="firstName"
        />
      </MDBCol>
      <MDBCol>
        <MDBInput
          type="text"
          label="Last name"
          required
          id="lastName"
          v-model="user.lastName"
        />
      </MDBCol>
    </MDBRow>
    <!-- Email input -->
    <MDBInput
      type="email"
      label="Email address"
      required
      id="email"
      v-model="user.email"
      wrapperClass="mb-4"
    />
    <!-- Password input -->
    <MDBInput
      type="password"
      label="Password"
      required
      id="password"
      v-model="user.password"
      wrapperClass="mb-4"
    />

    <MDBInput
      type="password"
      label="Confirm password"
      required
      id="confirm-password"
      v-model="confirmPassword"
      wrapperClass="mb-4"
    />

    <!-- Checkbox -->
    <MDBCheckbox
      label="Remember me"
      id="form3SubscribeCheck"
      wrapperClass="d-flex justify-content-center mb-4"
    />

    <!-- Submit button -->
    <MDBBtn
      color="primary"
      block
      class="mb-4"
      type="submit"
      @click.prevent="SignUp()"
    >
      Sign up
    </MDBBtn>

    <!-- Register buttons -->
    <div class="text-center">
      <p>or sign up with:</p>
      <MDBBtn color="primary" floating class="mx-1">
        <MDBIcon iconStyle="fab" icon="facebook-f" />>
      </MDBBtn>

      <MDBBtn color="danger" floating class="mx-1">
        <MDBIcon iconStyle="fab" icon="google" />
      </MDBBtn>

      <MDBBtn color="info" floating class="mx-1">
        <MDBIcon iconStyle="fab" icon="twitter" />
      </MDBBtn>

      <MDBBtn color="dark" floating class="mx-1">
        <MDBIcon iconStyle="fab" icon="github" />
      </MDBBtn>
      <p class="small fw-bold mt-2 pt-1 mb-0">
        You already have an account?
        <MDBBtn color="danger" @click.prevent="GoToSignIn()" rounded
          >Sign In</MDBBtn
        >
      </p>
    </div>
  </form>
  <Footer />
</template>
<script>
import axios from "axios";
import Footer from "@/components/Footer.vue";

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-vue-ui-kit";

export default {
  name: "Connect",
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    Footer,
  },

  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        password: null,
        email: null,
      },
      confirmPassword: null,
    };
  },
  methods: {
    SignUp() {
      const userData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        password: this.user.password,
        email: this.user.email,
      };
      console.log(userData);
      const regexEmail =
        /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
      if (
        this.user.password === this.confirmPassword &&
        regexEmail.test(this.user.email)
      ) {
        axios({
          method: "POST",
          url: "http://localhost:3000/user/signup",
          headers: {
            "Content-Type": "application/json",
          },
          data: userData,
        })
          .then((result) => {
            console.log(result);
            this.$router.push("/profil");
          })
          .catch((error) => console.log(error));
      }
    },
    GoToSignIn() {
      this.$router.push("/signin");
    },
  },
};
</script>

<style>
form {
  margin: auto;
  width: 60%;
  border-radius: 25px;
  padding: 20px;
}
</style>
