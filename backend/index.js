const express = require('express');
const bodyparser = require('body-parser');
let app = express();

const multer = require('multer');
const upload = multer({
   dest: '../frontend/public/images'
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/openmessage', { useNewUrlParser: true, useUnifiedTopology: true });
let database = mongoose.connection;

let Messages = mongoose.Schema({
   user: String,
   content: String,
   timestamp: Date,
   image: String,
});

let Users = mongoose.Schema({
   username: String,
   image: String,
});

let Message = mongoose.model('Message', Messages, 'messages');
let User = mongoose.model('User', Users, 'users');

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', () => {
   console.log('Successfully connected to database');
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/api/messages', async (request, response) => {
   console.log('/api/messages');
   let messages = await Message.find();
   console.log(JSON.stringify(messages));
   response.send(messages);
});

app.get('/api/users', async (request, response) => {
   console.log('/api/users');
   let users = await User.find();
   console.log(JSON.stringify(users));
   response.send(users);
});

app.post('/api/message', async (request, response) => {
   console.log('/api/message');
   let result = await User.find({ username: request.body.user });
   let image = "/images/default.jpg";
   if (result.length > 0)
   {
      console.log(result[0]);
      console.log(result[0].image);
      image = result[0].image;
   }
   else
   {

   }
   console.log(image);
   let message = new Message({
      user: request.body.user,
      content: request.body.content,
      timestamp: new Date(),
      image: image,
   });
   console.log(JSON.stringify(message));
   await message.save();
   response.sendStatus(200);
});

app.post('/api/user', async (request, response) => {
   console.log('/api/user');
   let user = new User({
      username: request.body.username,
      image: request.body.image,
   });
   await user.save();
   response.sendStatus(200);
});

app.post('/api/photos', upload.single('photo'), async (request, response) => {
   console.log('/api/photos');
   console.log(request.body);
   if (!request.file) {
      return response.sendStatus(400);
   }
   response.send({
      path: "/images/" + request.file.filename
   });
});

app.delete('/api/message/:id', async (request, response) => {
   console.log('/api/message/' + request.params.id);
   await Message.findOneAndDelete({ _id: request.params.id });
   response.sendStatus(200);
});

app.listen(3000);
