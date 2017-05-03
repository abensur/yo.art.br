<template>
  <div class="container">
    <h2>Login</h2>
    <div class="panel panel-default">
      <div class="panel-heading">
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: 'comercial@yodeley.com.br',
      password: 'nelson42'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions([
      'LOGIN',
      'LOGOUT'
    ]),
    Login () {
      this.LOGIN({ email: this.email, password: this.password })
    },
    Logout () {
      this.LOGOUT()
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
