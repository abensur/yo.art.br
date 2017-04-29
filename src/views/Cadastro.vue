<template>
  <div class="container">
    <div class="page-header">
      <h1>Vue firebase</h1>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Nova Usuario</h3>
      </div>
      <div class="panel-body">
        <form ref="form" class="form-inline" v-on:submit.prevent="adcionarEmpresa">
          <div class="form-group">
            <label for="fantasia">Nome*:</label>
            <input required type="text" ref="fantasia" v-model="novaEmpresa.fantasia" class="form-control"></input>
          </div>
          <div class="form-group">
            <label for="estado">Estado*:</label>
            <input required type="text" ref="estado" v-model="novaEmpresa.estado" class="form-control"></input>
          </div>
          <br/>
          <br/>
          <div class="form-group">
            <label for="site">Site:</label>
            <input type="text" ref="site" v-model="novaEmpresa.site" class="form-control"></input>
          </div>
          <div class="form-group">
            <label for="site">Tags:</label>
            <input type="text" ref="site" v-model="novaEmpresa.tags" class="form-control"></input>
          </div>
          <p><small>* obrigatórios</small></p>
          <input type="submit" class="btn btn-primary" value="Enviar"></input>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { db } from '@/firebase.js'
import toastr from 'toastr'

const empresasRef = db.ref('empresas')

export default {
  name: 'Cadastro',
  data () {
    return {
      novaEmpresa: {
        fantasia: '',
        estado: '',
        site: '',
        tags: ''
      }
    }
  },
  methods: {
    adcionarEmpresa () {
      empresasRef.push(this.novaEmpresa)
      toastr.success('Empresa adcionada')

      this.novaEmpresa.fantasia = ''
      this.novaEmpresa.estado = ''
      this.novaEmpresa.site = ''
      this.novaEmpresa.tags = ''
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
