<template>
  <!-- Post something -->

  <div
    class="card-footer d-flex flex-column mx-auto mt-3 border-0 shadow-5"
    style="background-color: #fff"
  >
    <div class="form-outline d-md-lg-flex flex-md-lg-row h-75">
      <textarea
        class="form-control border border-1"
        id="textAreaExample"
        rows="6"
        v-model="text"
        placeholder="Share something with us..."
      ></textarea>
      <label class="form-label" for="textAreaExample"></label>
    </div>

    <div class="d-flex flex-md-row justify-content-between mt-2 pt-1">
      <div class="input-group d-flex flex-column justify-content-center">
        <label class="custom-file-upload"
          >Upload image
          <input
            @change="onFileSelect"
            type="file"
            id="postImageInput "
            name="postImage"
            accept="image/png, image/jpeg"
          />
          <i
            class="far fa-images text-dark fa-lg text-primary fa-lg"
            title="Upload image"
          ></i>
        </label>

        <button
          title="Send post !"
          type="submit"
          class="post-btn btn btn-link border"
          @click.prevent="createPost()"
        >
          Post
        </button>
      </div>
      <!--fileinput -->

      <!---->
    </div>
  </div>
</template>

<script>
import axios from "axios";
var moment = require("moment");

export default {
  name: "PostExample",

  data() {
    return {
      text: "",
      moment: moment,
      image: "",
    };
  },
  methods: {
    onFileSelect(event) {
      this.image = event.target.files[0];
    },

    createPost() {
      let userData = new FormData();
      userData.append("text", this.text);
      userData.append("id", this.$store.state.user.userId);
      userData.append("image", this.image);
      console.log(userData);
      axios
        .post("http://localhost:3000/post/create", userData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (response) => console.log(response),
          alert("Your post is successfully added ! "),
          this.$router.go()
        )
        .catch((error) => console.log(error));
      this.text = "";
    },
  },
};
</script>

<style>
/*
$desktop: 1200px;
$laptop: 1024px;
$tablet: 768px;
$phone: 426px;
*/
@media (min-width: 280px) and (max-width: 465px) {
  .custom-file-upload {
    display: flex;
    flex-direction: row;
    font-size: 12px;
  }
  .card-footer {
    width: 10%;
  }
}
.card-footer {
  width: 60%;
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
