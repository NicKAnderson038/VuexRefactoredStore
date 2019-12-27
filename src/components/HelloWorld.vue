<template>
  <div class="hello">
    <button type="button" @click="postData()">POST USER</button>
    <button type="button" @click="getData()">FETCH DATA</button>
    <div>
      <PulseLoader v-if="loading.isPost"/>
      <div v-else>
        <h4>{{post.userId}}: {{post.title}} {{post.body}}</h4>
      </div>
    </div>
    <div>
      <PulseLoader v-if="loading.isUsers"/>
      <table class="users" v-else>
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
  </div>
</template>

<script>
import { mapState } from "vuex";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

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

export default {
  name: "hello-world",
  components: {
    PulseLoader: PulseLoader
  },
  computed: mapState(["users", "post", "loading"]),
  created() {
    // const payload = {
    //   property: "users",
    //   method: "get",
    //   url: "https://jsonplaceholder.typicode.com/users",
    //   body: null,
    //   spinner: "isPost"
    // };
    // this.$store.dispatch('fetchData', payload);
  },
  methods: {
    getAllData() {
      const api = data => this.$store.dispatch("fetchData", data);
      Promise.all([api(payload, api(payload2))]);
    },
    postData() {
      this.$store.dispatch("fetchData", payload2);
    },
    getData() {
      this.$store.dispatch("fetchData", payload);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}
</style>
