<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/signup">Connect</router-link>
  </div>
  <h1>Welcome ! <br />Feel free to connect to our social network !</h1>
  <form class="shadow-5" method="post" type="submit">
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput
          type="text"
          label="First name"
          required
          id="firstName"
          v-model="userInfos.firstName"
          value="firstName"
        />
      </MDBCol>
      <MDBCol>
        <MDBInput
          type="text"
          label="Last name"
          required
          id="lastName"
          v-model="userInfos.lastName"
        />
      </MDBCol>
    </MDBRow>
    <!--Description  input-->
    <MDBCol>
      <MDBInput
        type="text"
        label="Description "
        required
        id="description"
        v-model="userInfos.description"
      />
    </MDBCol>
    <br />
    <!-- Email input -->
    <MDBInput
      type="email"
      label="Email address"
      required
      id="email"
      v-model="userInfos.email"
      wrapperClass="mb-4"
    />

    <!-- Password input -->
    <MDBInput
      type="password"
      label="Password"
      required
      id="password"
      v-model="userInfos.password"
      wrapperClass="mb-4"
      title="Password must contain minimum 8 caracters and maximum 100 characters.One uppercase.One number inside.No space is allowed !"
    />

    <MDBInput
      type="password"
      label="Confirm password"
      required
      id="confirm-password"
      v-model="confirmPassword"
      wrapperClass="mb-4"
      title="Password must contain minimum 8 caracters and maximum 100 characters.One uppercase.One number inside.No space is allowed !"
    />

    <!-- Checkbox -->
    <MDBCheckbox
      v-model="userInfos.admin"
      label="Remember me"
      id="form3SubscribeCheck"
      wrapperClass="d-flex justify-content-center mb-4"
    />

    <!-- Submit button -->
    <MDBBtn
      color="primary"
      block
      class="button mb-4"
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
      <div
        class="small fw-bold mt-2 pt-1 mb-0 d-flex flex-row justify-content-center"
        @click.prevent="GoToSignIn()"
      >
        You already have an account ?
        <p class="small text-primary">SIGN IN</p>
      </div>
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
      userInfos: {
        firstName: null,
        lastName: null,
        password: null,
        email: null,
        description: null,
        isAdmin: null,
      },
      confirmPassword: null,
    };
  },

  methods: {
    SignUp() {
      const userData = {
        firstName: this.userInfos.firstName,
        lastName: this.userInfos.lastName,
        password: this.userInfos.password,
        email: this.userInfos.email,
        description: this.userInfos.description,
        isAdmin: this.userInfos.isAdmin,
      };

      console.log(userData);
      const regexEmail =
        /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

      if (
        this.userInfos.password === this.confirmPassword &&
        regexEmail.test(this.userInfos.email) &&
        this.userInfos.firstName !== null &&
        this.userInfos.lastName !== null &&
        this.userInfos.description !== null &&
        this.userInfos.email !== null &&
        this.userInfos.password !== null &&
        this.userInfos.confirmPassword !== null
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
            this.$router.push("/signin");
          })
          .catch((error) => console.log(error));
      } else {
        alert(
          "Please enter all necessary information to be able to create a new account..."
        );
      }
    },

    GoToSignIn() {
      this.$router.push("/signin");
    },
  },
};
</script>

<style>
@media (min-width: 320px) and (max-width: 465px) {
  .small {
    display: flex;
    flex-direction: row;
    font-size: 12px;
  }
}
form {
  margin: auto;
  width: 60%;
  border-radius: 25px;
  padding: 20px;
}
</style>
