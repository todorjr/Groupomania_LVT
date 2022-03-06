<template>
  <!-- Navbar -->

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <a class="navbar-brand mt-2 mt-lg-0" href="#">
          <img
            src="../assets/logo.png"
            height="50"
            alt="GRPLogo"
            loading="lazy"
          />
        </a>
        <span>Welcome!</span>
      </div>
      <div class="d-flex align-items-center">
        <MDBIcon icon="sign-out-alt" @click="deconnectAccount()" />
        <MDBIcon icon="trash-alt" @click="deleteAccount(id)" />
      </div>
    </div>
  </nav>
  <!--Profil description -->
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card p-3 py-4">
          <div class="text-center">
            <img src="@/assets/pp.png" width="100" class="rounded-circle" />
          </div>
          <div class="text-center mt-3">
            <h5 class="mt-2 mb-0">{{ user.firstName }} {{ user.lastName }}</h5>
            <div class="px-4 mt-1">
              <p class="fonts">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
            </div>
            <ul class="social-list">
              <li><i class="fab fa-facebook-f"></i></li>
              <li><i class="fab fa-dribbble"></i></li>
              <li><i class="fab fa-instagram"></i></li>
              <li><i class="fab fa-linkedin-in"></i></li>
              <li><i class="fab fa-google"></i></li>
            </ul>
            <div class="buttons">
              <button
                type="button"
                class="btn btn-primary active px-4"
                data-bs-toggle="button"
                autocomplete="off"
                aria-pressed="true"
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="card-footer py-2 mx-auto border-0 w-50"
        style="background-color: #fff"
      >
        <div class="d-flex flex-center w-100">
          <img
            class="rounded-circle shadow-1-strong me-3"
            src="@/assets/pp.png"
            alt="avatar"
            width="60"
            height="60"
          />
          <div class="form-outline w-100">
            <textarea
              class="form-control border border-top-0 border-1"
              id="textAreaExample"
              rows="4"
            ></textarea>
            <label class="form-label" for="textAreaExample"
              >Share something with us...</label
            >
          </div>
        </div>
        <div class="float-end mt-2 pt-1">
          <button type="button" class="btn btn-primary btn-sm">
            <i class="far fa-paper-plane fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  border: none;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.card:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #fff;
  transform: scaleY(1);
  transition: all 0.5s;
  transform-origin: bottom;
}

.card:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background-color: #e7052f;
  transform: scaleY(0);
  transition: all 0.5s;
  transform-origin: bottom;
}

.card:hover::after {
  transform: scaleY(1);
}

.fonts {
  font-size: 11px;
}

.social-list {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0;
}
i {
  padding: 10px;
}
</style>
<script>
import axios from "axios";
import { MDBIcon } from "mdb-vue-ui-kit";
export default {
  name: "Profil",
  components: {
    MDBIcon,
  },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
      },
    };
  },
  methods: {
    deconnectAccount() {
      alert("See you soon ! 👋🏻");
      localStorage.clear();
      this.$router.push("/");
    },
    deleteAccount() {
      const userData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      };
      if (
        confirm(
          "Are you sure that you want to delete your account? All of your informations will be erased ! 🛑"
        )
      ) {
        axios({
          method: "DELETE",
          url: "http://localhost:3000/user/signup",
          headers: {
            "Content-Type": "application/json",
          },
          data: userData,
        });
      }
    },
  },
};
</script>
