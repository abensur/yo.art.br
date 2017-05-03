<template>
  <div class="container lista">
    <div class="spacer"></div>
    <data-tables
      :actions-def='getExportActionsDef()'
      :checkbox-filter-def='getCheckFilterDef()'
      :data="empresas"
      :has-action-col='false'
      @row-click="rowClick"
      @filtered-data="handleFilterDataChange">
      <el-table-column prop="fantasia" label="Nome" sortable="custom"></el-table-column>
      <el-table-column prop="estado" label="Estado" sortable="custom"></el-table-column>
      <el-table-column prop="site" label="Contato" sortable="custom"></el-table-column>
      <el-table-column prop="atores" label="Atuação" sortable="custom"></el-table-column>
    </data-tables>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { db } from '@/firebase.js'
import { mapState } from 'vuex'
import CsvExport from '../utils/CsvExport'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)

const empresasRef = db.ref('empresas')

export default {
  name: 'lista',
  data () {
    return {
      empresas: '',
      filteredData: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  firebase: {
    empresas: {
      source: empresasRef
    }
  },
  methods: {
    getExportActionsDef () {
      const columns = ['fantasia', 'estado', 'site', 'atores']
      const columnNames = ['Nome', 'Estado', 'Site', 'Atuação']
      return {
        width: 11,
        def: [{
          name: 'Exportar todas',
          handler: () => {
            CsvExport(this.empresas, columns, columnNames, 'all')
          },
          icon: 'plus'
        }, {
          name: 'Exportar filtradas',
          handler: () => {
            CsvExport(this.filteredData, columns, columnNames, 'filtered')
          },
          icon: 'upload'
        }]
      }
    },
    getCheckFilterDef () {
      return {
        width: 8,
        props: 'atores',
        def: [{
          'code': 'Distribuidora',
          'name': 'Distr.'
        }, {
          'code': 'Proponente',
          'name': 'Prop.'
        }, {
          'code': 'Realizadora',
          'name': 'Reali.'
        }, {
          'code': 'Fornecedora',
          'name': 'Forne.'
        }, {
          'code': 'Capacitadora',
          'name': 'Cap.'
        }]
      }
    },
    rowClick (row) {
      // this.$message('row clicked')
      // console.log('row clicked', row.site)
    },
    handleSelect (selection, row) {
      // console.log('handleSelect', selection, row)
    },
    handleAllSelect (selection) {
      // console.log('handleAllSelect', selection)
    },
    handleCurrentRowChange (currentRow, oldCurrentRow) {
      // console.log('handleCurrentRowChange', currentRow, oldCurrentRow)
    },
    handleFilterDataChange (filteredData) {
      // console.log('handleFilterDataChange', filteredData)
      this.filteredData = filteredData
    }
    // deletarEmpresa (event) {
    //   if (this.user) {
    //     empresasRef.child(event.currentTarget.dataset.key).remove()
    //     toastr.success('Empresa removida')
    //   } else {
    //     toastr.error('Sem permissão')
    //   }
    // }
  }
}
</script>
<style lang="css">
.container.lista {
  margin-top:50px;
  margin-bottom:50px;
}
</style>
