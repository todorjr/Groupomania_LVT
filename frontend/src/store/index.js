import Vuex from "vuex";
import axios from "axios";

export default new Vuex.Store({
  state: {
    user: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      isAdmin: false,
    },
    changeOption: "",
  },

  mutations: {
    USER_INFOS(
      state,
      [userId, firstName, lastName, email, description, isAdmin]
    ) {
      state.user.userId = userId;
      (state.user.firstName = firstName),
        (state.user.lastName = lastName),
        (state.user.email = email),
        (state.user.description = description),
        (state.user.isAdmin = isAdmin);
    },

    modifOption(state, value) {
      state.changeOption = value;
    },
  },

  actions: {
    me(value) {
      axios
        .get("http://localhost:3000/user/me", {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          value.commit("USER_INFOS", [
            response.data[0].id,
            response.data[0].firstName,
            response.data[0].lastName,
            response.data[0].email,
            response.data[0].description,
            response.data[0].isAdmin,
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    changeParam(contexte, value) {
      contexte.commit("modifOption", value);
    },
  },

  modules: {},
});
