<template>
  <div class="container">
    <div class="page-header">
      <h1>Vue firebase</h1>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Login</h3>
      </div>
      <div class="panel-body">
        <form ref="form" class="form-inline" v-on:submit.prevent="Login">
          <div class="form-group">
            <label>email</label>
            <input required type="email" v-model="email" class="form-control"></input>
          </div>
          <div class="form-group">
            <label>senha</label>
            <input required type="password" v-model="password" class="form-control"></input>
          </div>
          <input type="submit" class="btn btn-primary" value="Login"></input>
          <input @click="Logout" type="button" class="btn btn-primary" value="Logout" v-if="user"></input>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseApp } from '@/firebase.js'
// import toastr from 'toastr'

const auth = firebaseApp.auth()

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      user: ''
    }
  },
  methods: {
    Login () {
      const promise = auth.signInWithEmailAndPassword(this.email, this.password)
      promise.catch(e => console.log(e.message))
      auth.onAuthStateChanged(this.handleAuth)
    },
    Logout () {
      auth.signOut()
      this.user = ''
    },
    handleAuth (firebaseUser) {
      if (firebaseUser) {
        this.user = firebaseUser
      } else {
        console.log('desconectado...')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
