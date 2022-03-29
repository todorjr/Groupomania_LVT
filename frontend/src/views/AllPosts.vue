<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- Container wrapper -->
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <a class="navbar-brand mt-2 mt-lg-0">
          <img
            src="../assets/icon-left-font-monochrome-black.png"
            height="80"
            alt="GRPLogo"
            loading="lazy"
          />
        </a>
      </div>
      <div class="d-flex align-items-center">
        <i
          class="fas fa-user-alt"
          title="See your profile !"
          @click="GoToProfil()"
        ></i>
        <MDBIcon
          icon="sign-out-alt"
          title="Logout ! "
          @click="deconnectAccount()"
        />
      </div>
    </div>
  </nav>
  <div class="d-sm-md-lg-flex flex-sm-md-lg-center">
    <h3>Make a post</h3>
  </div>

  <Post />
  <!--All Posts-->

  <div class="card-body" v-for="post in allPosts" :key="post.id">
    <div class="col-sm-7 mx-auto">
      <div
        class="post d-sm-md-flex w-100 justify-content-sm-md-center hover-shadow"
      >
        <div class="d-sm-md-flex flex-row">
          <div class="float-start ms-1 mt-1">
            <img
              @click="GoToProfil()"
              src="@/assets/icon.svg"
              width="55"
              class="rounded-circle text-left"
            />
          </div>
          <div class="d-flex flex-column">
            <h5 class="text card-title">
              {{ post.firstName }} {{ post.lastName }}
            </h5>
            <p class="date card-title text-left">
              Posted:
              {{ moment(post.date).format("DD/MM/YYYY ") }}
            </p>
          </div>
        </div>
        <div class="d-sm-md-flex">
          <p class="text card-text ml-0 pb-3">
            {{ post.text }}
          </p>
        </div>
        <!--Image post -->
        <div v-if="post.image">
          <img
            class="postImage"
            :src="'http://localhost:3000' + post.image"
            alt="post-image"
          />
        </div>
        <div class="d-flex flex-row">
          <button class="btn btn-link btn-lg btn-floating">
            <i class="far fa-heart fa-lg" title="Like post"></i>
          </button>
          <button class="btn btn-link btn-lg btn-floating">
            <i class="fas fa-share fa-lg text-dark ps-1" title="Share post"></i>
          </button>
          <div v-if="post.id == user.userId || verifyIsAdmin">
            <button
              type="button"
              class="btn btn-link btn-lg btn-floating"
              @click="deletePost(post.postId)"
            >
              <i
                class="fas fa-trash-alt img-fluid text-danger fa-lg"
                title="Delete post?"
              ></i>
            </button>
          </div>

          <button
            @click="getAllComments(post.id)"
            class="btn float-end btn-link btn-rounded ms-auto p-2"
          >
            <i
              class="fas fa-angle-double-down text-dark fa-sm"
              title="See all comments..."
            ></i>
          </button>
          <button class="btn btn-link btn-rounded p-2" @click="HideComments()">
            <i
              class="fas fa-angle-double-up text-dark fa-sm"
              title="Hide all comments..."
            ></i>
          </button>
        </div>
        <!--Comments-->
        <Comments :idPost="post.id" />

        <div
          v-for="comment in post.comments"
          :key="comment.id"
          class="comment-text d-flex flex-row mt-2 ms-3 pt-3 h-25 justify-content-start"
        >
          <div class="d-flex flex-column">
            <h5 class="text card-title">
              {{ comment.firstName }}
            </h5>
            <p class="date card-title text-left">
              Posted:
              {{ moment(comment.date).format("DD/MM/YYYY") }}
            </p>
          </div>
          <p
            class="commentText rounded w-50 h-25 ms-2 pt-2 ps-1 shadow-1"
            style="text-align: left"
          >
            {{ comment.comment }}
          </p>
          <label class="form-label" for="typeText">
            <button
              v-if="user.userId == comment.idUser || verifyIsAdmin"
              type="button"
              class="btn ms-1 btn-link btn-floating"
              data-mdb-ripple-color="dark"
              @click="deleteComment(comment.id)"
            >
              <i
                class="far fa-trash-alt fa-lg"
                title="Delete comment?"
              ></i></button
          ></label>
        </div>
        <!--Comments-->
      </div>
    </div>
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
import Comments from "@/components/Comment.vue";
var moment = require("moment");

export default {
  name: "PostPage",
  components: {
    MDBIcon,
    Post,
    Comments,
    Footer,
  },
  data() {
    return {
      moment: moment,
      text: "",
      date: "",
      image: "",
      allPosts: [],
      allComments: [],
      verifyIsAdmin: this.$store.state.user.isAdmin,
    };
  },
  computed: {
    ...mapState(["user", "userId"]),
  },

  mounted() {
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
    getAllComments(idPost) {
      axios
        .get("http://localhost:3000/comment/" + idPost, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          let post = this.allPosts.find((post) => post.id === idPost);
          post.comments = response.data;
        })

        .catch((error) => console.log(error));
    },

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
    deleteComment(id) {
      if (confirm("Are you sure that you want to delete this comment ?")) {
        axios
          .delete("http://localhost:3000/comment/" + id, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.$router.go();

            alert("Your comment is successfully deleted !");
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
    HideComments() {
      this.$router.go();
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Abel&display=swap");

h3 {
  font-family: "Abel", sans-serif;
}
h5,
.text {
  font-style: bold;
  padding-top: 10px;
  margin-left: 5px;
  text-align: left;
  font-family: "Abel", sans-serif;
}
.date {
  font-size: 12px;
  padding-top: 10px;
  margin-left: 5px;
  text-align: left;
}
.post {
  border-radius: 25px;
  position: relative;
  overflow: hidden;
}

.postImage {
  width: 100%;
  height: 500px;
}
.form-control {
  border-radius: 12px 12px 12px 0;
}

i {
  cursor: pointer;
}
.fa-user-alt {
  padding-right: 10px;
}
.fa-heart {
  color: red;
}
.fa-heart:hover {
  cursor: pointer;
  animation: heart 2s ease-out;
  font-weight: bold;
}
@keyframes heart {
  100% {
    opacity: 1;
  }
}
</style>
