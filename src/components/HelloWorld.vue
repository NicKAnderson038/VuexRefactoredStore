<template>
  <div class="hello">
    <h4>{{post.userId}}: {{post.title}} {{post.body}}</h4>
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
export default {
  name: "hello-world",
  computed: mapState(["users", "post"]),
  created() {
    const payload = {
      property: "users",
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
      body: null
    };
    const payload2 = {
      property: "post",
      method: "post",
      body: {
        title: "Operations",
        body: "Nick",
        userId: 1
      },
      url: "https://jsonplaceholder.typicode.com/posts"
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
