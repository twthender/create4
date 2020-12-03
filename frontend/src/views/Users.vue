<template>
  <div class="users">
    <div class="user-display">
      <div class="user" v-for="user in users" :key="user._id">
        <h2>{{user.username}}</h2>
        <img :src="user.image">
      </div>
    </div>
    <div class="creation">
      <input v-model="username" placeholder="Username">
      <input type="file" name="photo" @change="fileChanged">
      <button @click="addUser">Create</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Users",
  data() {
    return {
      users: [],
      username: "",
      file: null,
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        let response = await axios.get('/api/users');
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addUser() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let response = await axios.post('/api/photos', formData);
        console.log(response.data);
        let result = await axios.post('/api/user', { username: this.username, image: response.data.path });
        console.log(result);
        await this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
  }
}
</script>

<style>

@media only screen and (max-width: 800px) {
  .users {
    width: 100%;
    margin: auto;
  }

  .user-display {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 40px;
    justify-content: center;
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    background-color: #222222;
  }

  button {
    width: 100%;
    height: 40px;
    border: none;
    background-color: #2c3e50;
    cursor: pointer;
  }
}

@media only screen and (min-width: 801px) {
  .users {
    width: 800px;
    margin: auto;
  }

  .user-display {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 40px;
  }

  input {
    width: 100%;
    height: 40px;
    border: none;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    background-color: #222222;
  }

  button {
    width: 100%;
    height: 40px;
    border: none;
    background-color: #2c3e50;
    cursor: pointer;
  }
}

.user {
  margin: 10px;
}

.users img {
  width: 180px;
  height: 180px;
}

</style>
