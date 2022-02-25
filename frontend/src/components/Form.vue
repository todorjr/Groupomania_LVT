<template>
  <h1>Welcome ! <br />Feel free to connect to our social network !</h1>
  <form class="shadow-5">
    <!-- 2 column grid layout with text inputs for the first and last names -->
    <MDBRow class="mb-4">
      <MDBCol>
        <MDBInput
          type="text"
          label="First name"
          id="firstName"
          v-model="form3FirstName"
        />
      </MDBCol>
      <MDBCol>
        <MDBInput
          type="text"
          label="Last name"
          id="lastName"
          v-model="form3LastName"
        />
      </MDBCol>
    </MDBRow>
    <!-- Email input -->
    <MDBInput
      type="email"
      label="Email address"
      id="email"
      v-model="form3Email"
      wrapperClass="mb-4"
    />
    <!-- Password input -->
    <MDBInput
      type="password"
      label="Password"
      id="password"
      v-model="form3Password"
      wrapperClass="mb-4"
    />

    <!-- Checkbox -->
    <MDBCheckbox
      label="Remember me"
      id="form3SubscribeCheck"
      v-model="form3SubscribeCheck"
      wrapperClass="d-flex justify-content-center mb-4"
    />

    <!-- Submit button -->
    <MDBBtn color="primary" block class="mb-4"> Sign up </MDBBtn>

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
        <a href="#!" class="link-danger">SIGN IN</a>
      </p>
    </div>
  </form>
</template>
<script>
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
export default {
  components: {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
  },
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const form3SubscribeCheck = ref(true);

    return {
      firstName,
      lastName,
      email,
      password,
      form3SubscribeCheck,
    };
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
