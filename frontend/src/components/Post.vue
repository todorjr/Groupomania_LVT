<template>
  <!-- Post something -->
  <form>
    <div class="d-flex mb-3">
      <div
        class="card-footer d-flex flex-column w-50 py-2 mx-auto mt-3 border-0 shadow-5"
        style="background-color: #fff"
      >
        <div class="form-outline d-sm-md-lg-flex flex-sm-md-lg-row w-100 h-75">
          <textarea
            class="form-control border border-1"
            id="textAreaExample"
            rows="6"
            v-model="text"
            placeholder="Share something with us..."
          ></textarea>
          <label class="form-label" for="textAreaExample"></label>
        </div>

        <div
          class="d-flex flex-md-row flex-sm-column justify-content-between mt-2 pt-1"
        >
          <div
            class="input-group d-sm-md-lg-flex flex-md-lg-column flex-sm-column justify-content-end"
          >
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
    </div>
  </form>
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
input[type="file"] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
