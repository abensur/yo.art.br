<template>
  <div class="container">
    <div class="page-header">
      <h1>Vue firebase</h1>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Lista de Usuarios</h3>
      </div>
      <div class="panel-body">
        <table ref="table" class="table table-striped" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { db } from '@/firebase.js'
import toastr from 'toastr'

const empresasRef = db.ref('empresas')

export default {
  name: 'Lista',
  data () {
    return {
      footableRef: '',
      empresas: ''
    }
  },
  firebase: {
    empresas: {
      source: empresasRef
    }
  },
  watch: {
    'empresas' () {
      if (this.empresas) {
        this.footableRef.clear()
        this.empresas.map(it => { this.footableRef.row.add(it) })
        this.footableRef.draw()

        $(this.$refs.table).unbind().on('click', 'a', this.deletarEmpresa)
      }
    }
  },
  mounted () {
    this.footableRef = $('.table').DataTable({
      deferRender: true,
      columns: [
        {'data': 'fantasia', 'title': 'Nome'},
        {'data': 'estado', 'title': 'Estado'},
        {'data': 'site', 'title': 'Site'},
        {'data': 'tags', 'title': 'Tags'},
        {'title': 'Deletar'}
      ],
      columnDefs: [{
        'targets': -1,
        'data': empresa => {
          return `<a href="#" class="btn mini btn-primary" role="button" data-key="${empresa['.key']}">Deletar</a>`
        }
      }]
    })
  },
  methods: {
    deletarEmpresa (event) {
      console.log('lools')
      empresasRef.child(event.currentTarget.dataset.key).remove()
      toastr.success('Empresa removida')
    }
  }
}
</script>
