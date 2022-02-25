<template>
  <footer>
    <p>{{ copyright }}</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      groupName: "Groupomania",
      name: "Lazar V. Todorovic",
    };
  },

  computed: {
    copyright() {
      const currentYear = new Date().getFullYear();
      return `Copyright ${this.name} & ${this.groupName} © ${currentYear}`;
    },
  },
};
</script>

<style>
footer {
  margin: 20px;
}
</style>
