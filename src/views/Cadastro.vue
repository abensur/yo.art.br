<template>
  <div class="container">
    <h2>Nova Empresa</h2>
    <div class="field">
  <label class="label">Name</label>
  <p class="control">
    <input class="input" type="text" placeholder="Text input">
  </p>
</div>

<div class="field">
  <label class="label">Username</label>
  <p class="control has-icons-left has-icons-right">
    <input class="input is-success" type="text" placeholder="Text input" value="bulma">
    <span class="icon is-small is-left">
      <i class="fa fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-check"></i>
    </span>
  </p>
  <p class="help is-success">This username is available</p>
</div>

<div class="field">
  <label class="label">Email</label>
  <p class="control has-icons-left has-icons-right">
    <input class="input is-danger" type="text" placeholder="Email input" value="hello@">
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-warning"></i>
    </span>
  </p>
  <p class="help is-danger">This email is invalid</p>
</div>

<div class="field">
  <label class="label">Subject</label>
  <p class="control">
    <span class="select">
      <select>
        <option>Select dropdown</option>
        <option>With options</option>
      </select>
    </span>
  </p>
</div>

<div class="field">
  <label class="label">Message</label>
  <p class="control">
    <textarea class="textarea" placeholder="Textarea"></textarea>
  </p>
</div>

<div class="field">
  <p class="control">
    <label class="checkbox">
      <input type="checkbox">
      I agree to the <a href="#">terms and conditions</a>
    </label>
  </p>
</div>

<div class="field">
  <p class="control">
    <label class="radio">
      <input type="radio" name="question">
      Yes
    </label>
    <label class="radio">
      <input type="radio" name="question">
      No
    </label>
  </p>
</div>

<div class="field is-grouped">
  <p class="control">
    <button class="button is-primary">Submit</button>
  </p>
  <p class="control">
    <button class="button is-link">Cancel</button>
  </p>
</div>

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
</template>

<script>
// Distribuidores: Divulgam, exibem e investem nas plataformas disponíveis, no marketing e realizam curadoria dos conteúdos do mercado.

// Proponentes: Buscam entender e satisfazer suas demandas midiáticas através do mercado criativo

// Realizadores: trabalham em todas as etapas dos projetos criativos e subsidiam-se de periodicidade e fidelização

// Fornecedores: Realizam diversos serviços relacionados aos projetos do mercado criativo

// Capacitadores: estudam e preparam o mercado criativo e as técnicas relacionadas

import { db } from '@/firebase.js'
import dummy from '@/dummy.json'

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
      dummy.map(it => {
        empresasRef.push(it)
      })
      // empresasRef.push(novaEmpresa)
      this.$message('Empresa adcionada!')

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
