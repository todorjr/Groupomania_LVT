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
        <span>Welcome {{ user.firstName }} !</span>
      </div>
      <div class="d-flex align-items-center">
        <i class="fas fa-user-alt" @click="GoToProfil()"></i>
        <i class="fas fa-blog" @click="GoToBlog()"></i>
        <MDBIcon icon="sign-out-alt" @click="deconnectAccount()" />
        <MDBIcon icon="trash-alt" @click="deleteAccount(user.userId)" />
      </div>
    </div>
  </nav>
  <!--Profil description -->
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card p-3 py-4 hover-shadow">
          <h3>{{ user.firstName }} {{ user.lastName }}</h3>
          <div class="text-center">
            <img src="@/assets/pp.png" width="100" class="rounded-circle" />
          </div>
          <div class="text-center mt-3">
            <h5 class="desc">{{ firstName }} {{ lastName }}</h5>
            <div class="px-4 mt-1">
              <div class="card-body" id="description">
                <h4>{{ user.description }}</h4>
                <!-- Modification de la description -->
                <button
                  type="submit"
                  v-if="mode == 'read'"
                  class="btn btn-sm btn-outline btn btn-rounded mt-1"
                  @click="switchToModifyDescription()"
                >
                  <span class="desc font-weight-bold"
                    ><i class="fas fa-user-edit fa-lg text-dark"></i
                  ></span>
                </button>
                <div v-if="mode == 'modify'">
                  <textarea
                    v-model="description"
                    id="changeDescription"
                    class="textZone border border-primary"
                    placeholder="Description"
                  ></textarea
                  ><br />
                  <button
                    type="submit"
                    class="buttons btn btn-outline btn-rounded ml-3 mt-1"
                    @click="sendNewDescription()"
                  >
                    <i class="fas fa-angle-double-up"></i>
                  </button>
                  <button
                    type="submit"
                    class="buttons btn btn-outline btn-rounded ml-3 mt-1"
                    @click="switchToRead()"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <ul class="social-list">
              <li><i class="fab fa-facebook-f"></i></li>
              <li><i class="fab fa-dribbble"></i></li>
              <li><i class="fab fa-instagram"></i></li>
              <li><i class="fab fa-linkedin-in"></i></li>
              <li><i class="fab fa-google"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");
h3,
.desc,
.buttons,
h4 {
  font-family: "Abel", sans-serif;
}
.card {
  border: 0.5px solid black;
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
  width: 2px;
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
  width: 2px;
  height: 100%;
  background-color: #d14747;
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

import { mapState } from "vuex";
import { MDBIcon } from "mdb-vue-ui-kit";
export default {
  name: "Profil",
  components: {
    MDBIcon,
  },
  data() {
    return {
      token: "",
      userId: "",
      firstName: "",
      lastName: "",
      description: "",
      mode: "read",
      admin: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    //Changer la description
    sendNewDescription() {
      const id = this.$store.state.userId;
      if (this.descrition !== null) {
        axios
          .put("http://localhost:3000/user/" + id, {
            description: this.description,
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
            this.switchToRead();
            this.$router.go();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Veuillez remplir le champ");
      }
    },

    //Passer en mode modification du compte
    switchToModifyDescription() {
      this.mode = "modify";
    },

    //Changer de mode pour afficher le profil
    switchToRead() {
      this.mode = "read";
    },
    deleteAccount(id) {
      if (confirm("Are you sure you want to delete this account ?")) {
        axios
          .delete("http://localhost:3000/user/delete/" + id, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            localStorage.clear();
            alert("Your account is successfully deleted !");
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    GoToBlog() {
      this.$router.push("/allposts");
    },

    deconnectAccount() {
      alert("See you soon ! 👋🏻");
      localStorage.clear();
      this.$router.push("/signin");
    },

    GoToProfil() {
      this.$router.push("/profil");
    },
  },
  mounted() {
    this.$store.dispatch("me");
  },
};
</script>
