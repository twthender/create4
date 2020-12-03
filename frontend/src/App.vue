<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Forum</router-link>
      <router-link to="/users">Users</router-link>
    </div>
    <router-view/>
    <div class="footer">
      <p>Github link available <a href="https://github.com/twthender/create4">here</a></p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  margin-bottom: 40px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-left: 20px;
  margin-right: 20px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

.footer {
  width: 100%;
  background-color: #222222;
  height: 50px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
