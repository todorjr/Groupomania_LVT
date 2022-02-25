<template>
  <h1>Hi there ! 👋🏻 <br />Nice to see you again ! 🌐</h1>

  <!-- Material form login -->
  <form class="signin">
    <p class="h4 text-center mb-4">Sign In</p>
    <div class="grey-text">
      <MDBInput label="Your email" icon="envelope" type="email" />
      <MDBInput
        class="pass"
        label="Your password"
        icon="lock"
        type="password"
      />
    </div>
    <div class="text-center">
      <MDBBtn color="danger">Login</MDBBtn>
    </div>
  </form>
  <!-- Material form login -->
</template>

<script>
import { MDBInput, MDBBtn } from "mdb-vue-ui-kit";
export default {
  name: "Basic",
  components: {
    MDBInput,
    MDBBtn,
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
