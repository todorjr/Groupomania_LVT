<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
    <!-- Container wrapper -->
    <div class="container-fluid d-sm-md-flex flex-sm-md-row">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <a class="navbar-brand mt-2 mt-lg-0">
          <img
            src="../assets/icon-left-font-monochrome-black.png"
            height="70"
            alt="GRPLogo"
            loading="lazy"
          />
        </a>
      </div>

      <div class="d-flex align-items-center">
        <i class="fas fa-blog" @click="GoToBlog()" title="See all posts!"></i>
        <MDBIcon
          class="icons"
          icon="sign-out-alt"
          @click="deconnectAccount()"
          title="Logout!"
        />
        <MDBIcon
          class="icons text-danger"
          icon="trash-alt"
          @click="deleteAccount(user.userId)"
          title="Delete you account ?"
        />
      </div>
    </div>
  </nav>
  <!--Profil description -->
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card p-3 py-4 shadow-5">
          <div class="d-sm-flex flex-sm-row justify-content-center">
            <img src="@/assets/icon.svg" width="100" class="rounded-circle" />
          </div>
          <div class="text-center mt-3">
            <h3 class="name-text">{{ user.firstName }} {{ user.lastName }}</h3>
            <h4 class="desc-text pt-3">{{ user.email }}</h4>
            <div class="px-4 mt-1">
              <div class="card-body" id="description">
                <h4 class="desc-text">{{ user.description }}</h4>
                <!-- Modification de la description -->
                <button
                  type="submit"
                  v-if="mode == 'read'"
                  class="btn btn-sm btn-outline btn btn-rounded mt-1"
                  @click="switchToModifyDescription()"
                >
                  <span class="desc font-weight-bold"
                    ><i
                      class="fas fa-user-edit"
                      title="Changer your description..."
                    ></i
                  ></span>
                </button>
                <!---->
                <button
                  type="submit"
                  v-if="mode == 'read'"
                  class="btn btn-sm btn-outline btn btn-rounded mt-1"
                  @click="switchToUpdatePassword()"
                >
                  <span class="desc font-weight-bold"
                    ><i
                      class="fas fa-unlock"
                      title="Change your password..."
                    ></i
                  ></span>
                </button>
                <!---->

                <!---->
                <div v-if="mode == 'modify'">
                  <textarea
                    v-model="description"
                    id="changeDescription"
                    class="textZone border"
                    placeholder="Description"
                    title="Upload new description..."
                  ></textarea
                  ><br />
                  <button
                    type="submit"
                    class="buttons btn btn-outline btn-rounded ml-3 mt-1"
                    @click="updateDescription()"
                  >
                    <i
                      class="fas fa-angle-double-up"
                      title="Send new description!"
                    ></i>
                  </button>
                  <button
                    type="submit"
                    class="buttons btn btn-outline btn-rounded ml-3 mt-1"
                    @click="switchToRead()"
                  >
                    <i class="fas fa-times" title="Cancel!"></i>
                  </button>
                </div>
                <!---->
                <div v-if="mode == 'update'">
                  <MDBInput
                    type="password"
                    label="Password"
                    required
                    id="password"
                    wrapperClass="mb-2"
                    v-model="newPassword"
                  />
                  <MDBInput
                    type="password"
                    label="Confirm password"
                    required
                    id="confirm-password"
                    wrapperClass="mb-4"
                    v-model="confirmPassword"
                  />
                  <br />
                  <button
                    type="submit"
                    class="buttons btn btn-outline btn-rounded ml-3 mt-1"
                    @click="updatePassword()"
                  >
                    <i
                      class="fas fa-angle-double-up"
                      title="Send new password!"
                    ></i>
                  </button>
                  <button
                    type="submit"
                    class="buttons btn btn-outline btn-rounded ml-3 mt-1"
                    @click="switchToRead()"
                  >
                    <i class="fas fa-times" title="Cancel!"></i>
                  </button>
                </div>
                <!---->
              </div>
            </div>
            <!-- Modification de la password -->

            <ul class="social-list">
              <li><i class="fab fa-facebook-f"></i></li>
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
@import url("https://fonts.googleapis.com/css2?family=Poiret+One&display=swap");

.name-text,
.buttons,
h4 {
  font-family: "Abel", sans-serif;
}
.fa-linkedin-in:hover {
  color: blue;
}
.fa-facebook-f:hover {
  color: blue;
}
.fa-google:hover {
  color: green;
}
.fa-instagram:hover {
  color: pink;
}
.card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
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
.desc-text {
  font-family: "Poiret One", cursive;
}
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>

<script>
import axios from "axios";

import { mapState } from "vuex";
import { MDBIcon, MDBInput } from "mdb-vue-ui-kit";
export default {
  name: "Profil",
  components: {
    MDBIcon,
    MDBInput,
  },
  data() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      description: null,
      mode: "read",
      newPassword: null,
      confirmPassword: null,
      image: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },

  methods: {
    updateDescription() {
      const id = this.$store.state.user.userId;
      console.log(id);
      if (this.description !== null) {
        axios
          .put("http://localhost:3000/user/update/" + id, {
            description: this.description,
            id: id,
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
            this.switchToRead();
            alert("Your description has been changed !");
            this.$router.go();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Field is empty ...");
      }
    },
    updatePassword() {
      const id = this.$store.state.user.userId;
      console.log(id);
      if (
        this.newPassword !== null &&
        this.confirmPassword !== null &&
        this.newPassword === this.confirmPassword
      ) {
        axios
          .put("http://localhost:3000/user/updatePass/" + id, {
            newPassword: this.newPassword,
            id: id,
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response);
            this.switchToRead();
            alert("Your password has been changed !");
            // this.$router.go();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        alert("Field is empty ...");
      }
    },

    //Passer en mode modification du compte
    switchToModifyDescription() {
      this.mode = "modify";
    },
    switchToUpdatePassword() {
      this.mode = "update";
    },
    //Changer de mode pour afficher le profil
    switchToRead() {
      this.mode = "read";
    },
    onFileSelect(event) {
      this.profilePicture = event.target.files[0];
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

    mounted() {
      this.$store.dispatch("me");
    },
  },
};
</script>
