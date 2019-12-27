<template>
  <div class="hello">
    <h4>{{post.userId}}: {{post.title}} {{post.body}}</h4>
    <PulseLoader v-if="loading.isPost"/>
    <table class="users">
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
      </tr>
      <tr v-for="user in users" :key="user.email">
        <td>{{user.name}}</td>
        <td>{{user.username}}</td>
        <td>{{user.email}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "hello-world",
  components: {
    PulseLoader: PulseLoader
  },
  computed: mapState(["users", "post", "loading"]),
  created() {
    const payload = {
      property: "users",
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
      body: null,
      spinner: "isPost"
    };
    const payload2 = {
      property: "post",
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: {
        title: "Operations",
        body: "Nick",
        userId: 1
      },
      spinner: "isUsers"
    };
    // this.$store.dispatch('fetchData', payload);
    const api = data => this.$store.dispatch("fetchData", data);
    Promise.all([api(payload, api(payload2))]);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}
</style>
