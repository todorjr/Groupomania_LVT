<template>
  <div
    class="container comments d-flex flex-row mb-3 mt-3 ms-1 justify-content-start"
  >
    <img
      class="rounded-circle shadow-1-strong me-3"
      src="@/assets/icon.svg"
      alt="avatar"
      width="40"
      height="40"
    />
    <input
      type="text"
      id="typeText"
      placeholder="Add a comment..."
      class="form-control w-50 rounded-pill"
      v-model="comment"
    />
    <label class="form-label" for="typeText">
      <button
        type="button"
        class="btn ms-1 btn-link btn-floating"
        data-mdb-ripple-color="dark"
        @click="createComment()"
      >
        <i class="far fa-comment-dots fa-lg" title="Add comment !"></i></button
    ></label>
  </div>
</template>
<script>
import axios from "axios";
var moment = require("moment");

export default {
  name: "Comments",
  props: {
    idPost: { required: true },
  },
  data() {
    return {
      comment: null,
      moment: moment,
      id: this.$store.state.user.userId,
      firstName: this.$store.state.user.firstName,
    };
  },
  methods: {
    createComment() {
      let userInput = {
        comment: this.comment,
        id: this.id,
        idPost: this.idPost,
        firstName: this.firstName,
      };

      axios
        .post("http://localhost:3000/comment/create", userInput, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(
          (response) => console.log(response),
          alert("You have created a new comment !"),
          this.$router.go()
        )
        .catch((error) => console.log("djoka", error));
    },
  },
};
</script>
<style></style>
