<template>
  <div>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" />
      <input type="email" v-model="email" />
      <input type="tel" v-model="phone" />
      <input type="text" v-model="gender" />
      <input type="text" v-model="hometown" />
      <button type="submit">Submit</button>
    </form>
    <ul>
      <li v-for="user in users">
        {{ user.name }} - {{ user.email }} - {{ user.phone }} - {{ user.gender }} - {{ user.hometown }}
      </li>
    </ul>
  </div>
</template>

<script>
import broker from "../services/user.service"
export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      gender: "",
      hometown: "",
      users: []
    };
  },
  methods: {
    submitForm() {
      broker.call("user.create", {
        name: this.name,
        email: this.email,
        phone: this.phone,
        gender: this.gender,
        hometown: this.hometown
      })
        .then(() => {
          this.users.push({
            name: this.name,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            hometown: this.hometown
          });
          this.name = "";
          this.email = "";
          this.phone = "";
          this.gender = "";
          this.hometown = "";
        })
        .catch(err => {
          alert(err.message)
        });
    },
    getAllUsers() {
      broker.call("user.getAll").then(users => {
        this.users = users;
      });
    }
  },
  created() {
    this.getAllUsers();
  }
};
</script>