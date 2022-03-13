<template>
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
        <span>Welcome {{ user.firstName }} ! </span>
      </div>
      <div class="d-flex align-items-center">
        <i class="fas fa-user-alt" @click="GoToProfil()"></i>
        <MDBIcon icon="sign-out-alt" @click="deconnectAccount()" />
      </div>
    </div>
  </nav>
  <Post />
  <!--All Posts-->

  <div
    class="bg-image hover-overlay ripple"
    data-mdb-ripple-color="light"
  ></div>
  <div class="card-body" v-for="post in allPosts" :key="post.id">
    <div class="post mx-auto w-50 hover-shadow" style="width: 200px">
      <div class="float-start ms-1 mt-1">
        <img
          src="@/assets/pp.png"
          width="55"
          class="rounded-circle text-left"
        />
      </div>
      <h5 class="text card-title">{{ post.firstName }} {{ post.lastName }}</h5>
      <p class="date card-title text-left">
        Posted:
        {{ moment(post.date).format("DD/MM/YYYY ") }}
      </p>
      <hr />

      <p class="text card-text">
        {{ post.text }}
      </p>
      <hr />
      <!--Image post -->
      <div class="mb-3" v-if="post.image">
        <img
          class="postImage"
          :src="'http://localhost:3000' + post.image"
          alt=""
        />
      </div>
      <hr />
      <button
        type="button"
        class="btn btn-danger float-end me-1 mb-3 btn-floating"
        @click="deletePost(post.postId)"
      >
        <i class="fas fa-trash-alt fa-xs"></i>
      </button>
      <!--Comments-->
      <div
        class="container comments d-flex flex-row mb-3 mt-3 justify-content-center"
      >
        <img
          class="rounded-circle shadow-1-strong me-3"
          src="@/assets/pp.png"
          alt="avatar"
          width="40"
          height="40"
        />
        <input
          type="text"
          id="typeText"
          placeholder="Add comment"
          class="form-control w-50"
        />
        <label class="form-label" for="typeText">
          <button
            type="button"
            class="btn btn-outline btn-rounded ms-1"
            data-mdb-ripple-color="dark"
          >
            <i class="fas fa-comments text-dark"></i></button
        ></label>
      </div>
      <!--Comments-->
    </div>

    <hr />
  </div>
  <Footer />
  <!--All posts -->
</template>
<script>
import Footer from "@/components/Footer.vue";
import { MDBIcon } from "mdb-vue-ui-kit";
import { mapState } from "vuex";
import axios from "axios";
import Post from "@/components/Post.vue";
var moment = require("moment");
export default {
  name: "PostPage",
  components: {
    MDBIcon,
    Post,
    Footer,
  },
  data() {
    return {
      moment: moment,
      text: "",
      date: "",
      image: "",
      allPosts: [],
    };
  },
  computed: {
    ...mapState(["user", "userId"]),
  },

  mounted() {
    //Récupèrer toutes les publications
    axios
      .get("http://localhost:3000/post/all", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.allPosts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deletePost(id) {
      if (confirm("Are you sure that you want to delete this post ?")) {
        axios
          .delete("http://localhost:3000/post/delete/" + id, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.$router.go();

            alert("Your post is successfully deleted !");
            this.$router.push("/allposts");
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
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");
.post {
  border-radius: 25px;
}
h5,
.date,
.text {
  padding-top: 10px;
  margin-left: 20px;
  text-align: left;
  font-family: "Abel", sans-serif;
}
.date {
  font-size: 12px;
  font-style: italic;
}
.post {
  border: none;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.post:before {
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

.post:after {
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

.post:hover::after {
  transform: scaleY(1);
}
.form-control {
  border-radius: 12px 12px 12px 0;
}
.postImage {
  width: 70%;
  height: 50%;
}
i {
  cursor: pointer;
}
</style>
