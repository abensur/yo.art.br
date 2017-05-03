<template>
  <div class="container profile">
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
      this.$message('row clicked')
      console.log('row clicked', row)
    },
    handleSelect (selection, row) {
      console.log('handleSelect', selection, row)
    },
    handleAllSelect (selection) {
      console.log('handleAllSelect', selection)
    },
    handleCurrentRowChange (currentRow, oldCurrentRow) {
      console.log('handleCurrentRowChange', currentRow, oldCurrentRow)
    },
    handleFilterDataChange (filteredData) {
      console.log('handleFilterDataChange', filteredData)
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
body {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
.container.profile {
  margin-top:50px;
  margin-bottom:50px;
}
.profile-heading {
  margin: 20px 0;
  padding-bottom: 30px;
}
.profile-heading .name {
  border-right: 1px solid #f1f1f1;
  margin:-30px 0;
  padding: 40px 30px 0 30px;
}
.profile-heading .followers, .profile-heading .following {
  border-right: 1px solid #f1f1f1;
  margin:-30px 0;
  padding: 70px 30px;
}
.profile-heading .stat-val {
  font-size: 35px;
  font-weight: bold;
}
.tagline {
  padding:20px 0;
  font-size: 16px;
  line-height: 1.4;
}
p.title.is-bold {
  font-weight: bold;
}
/*table th:nth-last-child(2),
table td:last-child {
  display: none;
}*/
</style>
