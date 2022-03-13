<template>
  <!-- Post something -->
  <form>
    <div class="d-flex flex-column mb-3">
      <div
        class="card-footer py-2 mx-auto mt-3 border-0 w-50 shadow-3"
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
          <div class="form-outline w-100 h-75">
            <textarea
              class="form-control border border-1"
              id="textAreaExample"
              rows="6"
              v-model="text"
              placeholder="Share something with us..."
            ></textarea>
            <label
              class="form-label"
              placeholder="Share something with us..."
              for="textAreaExample"
            ></label>
          </div>
        </div>
        <div class="float-end mt-2 pt-1">
          <!--fileinput -->
          <input
            @change="onFileSelect"
            type="file"
            id="postImage"
            name="postImage"
            accept="image/png, image/jpeg"
          />

          <button
            type="submit"
            class="btn btn-light"
            @click.prevent="createPost()"
          >
            <i class="far fa-paper-plane text-primary fa-lg"></i>
          </button>
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

      axios
        .post("http://localhost:3000/post/create", userData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (response) => console.log(response),
          this.$router.go(),
          this.$router.push("/allposts")
        )
        .catch((error) => console.log(error));
      this.text = "";
    },
  },
};
</script>

<style></style>
