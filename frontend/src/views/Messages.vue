<template>
  <div class="messages">
    <div class="message" v-for="message in messages" :key="message._id">
      <div class="header">
        <div class="subheader">
          <img :src="message.image">
          <div class="details">
            <h4>{{ message.user }}</h4>
            <p>{{ new Date(message.timestamp).toLocaleString() }}</p>
          </div>
        </div>
        <i class="fa fa-times" aria-hidden="true" @click="deleteMessage(message._id)"></i>
      </div>
      <div class="content">
        <p>{{ message.content }}</p>
      </div>
    </div>
    <div class="creation">
      <input v-model="content" placeholder="Post content...">
      <input v-model="username" placeholder="Username">
      <button @click="sendMessage">Post</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Messages',
  data() {
    return {
      content: "",
      username: "",
      messages: [],
    };
  },
  created() {
    this.getMessages();
  },
  methods: {
    async getMessages() {
      try {
        let response = await axios.get('/api/messages');
        this.messages = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async sendMessage() {
      try {
        let data = {
          user: this.username,
          content: this.content,
        };
        await axios.post('/api/message', data);
        await this.getMessages();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMessage(id) {
      try {
        await axios.delete('/api/message/' + id,);
        await this.getMessages();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>

* {
  padding: 0;
  margin: 0;
  color: white;
}

body {
  background-color: #111111;
}

@media only screen and (max-width: 800px) {
  .messages {
    width: 100%;
    box-sizing: border-box;
    margin: auto;
  }

  .creation {
    width: 100%;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: #333333;
  }
}

@media only screen and (min-width: 801px) {
  .messages {
    width: 800px;
    box-sizing: border-box;
    margin: auto;
  }

  .creation {
    width: 800px;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: #333333;
  }

}
.message {
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin: auto;
  background-color: #222222;
  box-sizing: border-box;
  text-align: left;
}

.header {
  display: flex;
  flex-direction: row;
  text-align: left;
  justify-content: space-between;
}

.subheader {
  display: flex;
  flex-direction: row;
  text-align: left;
}

.details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

i {
  cursor: pointer;
}

img {
  width: 40px;
  height: 40px;
}

.content {
  margin-top: 10px;
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
  outline: none;
}

button:hover {
  background-color: #444444;
}

button:active {
  background-color: #333333;
}

</style>
