<template>
  <div class="container lista">
    <div class="spacer" />
    <el-input style="width: 300px;" @input="search" placeholder="Buscar..." />
    <div class="spacer" /><br/>
    <div id="table">
      <el-table
        :data="filteredData"
        style="width: 100%; min-width: 1080px;">
        <el-table-column prop="fantasia" label="Fantasia" sortable width="280px"/>
        <el-table-column prop="contato" label="Contato" width="300px" >
          <template slot-scope="scope">
            <span v-if="scope.row.contato || scope.row.estado">
              <a v-if="isEmail(scope.row.contato)" :href="'mailto:' + scope.row.contato">
                <span style="color: #666 !important;">{{ scope.row.estado ? scope.row.estado + ' - ' : ''}}</span>
                {{ scope.row.contato }}
              </a>
              <span v-else>{{ scope.row.estado ? scope.row.estado + ' - ' : ''}}{{ scope.row.contato }}</span>
            </span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column prop="atores" label="Atuação" sortable width="130px" />
        <el-table-column prop="portfolio" label="Portfólio" width="220px">
          <template slot-scope="scope">
            <span v-if="scope.row.portfolio ">
              <a v-if="isLink(scope.row.portfolio)" :href="scope.row.portfolio" target="_blank">{{ scope.row.portfolio }}</a>
              <span v-else>{{ scope.row.portfolio }}</span>
            </span>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column prop="conhecimentos" label="Conhecimentos">
          <template slot-scope="scope">
            <span v-if="scope.row.conhecimentos">{{ scope.row.conhecimentos.join(', ') }}</span>
            <span v-else> - </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="spacer" />
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase.js'
import { mapState } from 'vuex'
import CsvExport from '../utils/CsvExport'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import PS from 'perfect-scrollbar'
import Fuse from 'fuse.js'

locale.use(lang)

const empresasRef = db.ref('empresas')

export default {
  name: 'lista',
  data () {
    return {
      query: '',
      fuse: null,
      ps: null,
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
  mounted () {
    this.ps = new PS('#table')
  },
  beforeDestroy () {
    this.ps = null
  },
  watch: {
    empresas (val) {
      if (val.length) {
        this.filteredData = val
        this.fuse = new Fuse(val, {
          shouldSort: true,
          threshold: 0.45,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['estado', 'atores', 'conhecimentos', 'fantasia', 'contato', 'portfolio']
        })
      }
    }
  },
  methods: {
    search (val) {
      this.filteredData = val.length ? this.fuse.search(val) : [...this.empresas]
    },
    isLink (string) {
      const linkEXP = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi
      const linkREGEX = new RegExp(linkEXP)
      return string.match(linkREGEX)
    },
    isEmail (string) {
      const emailEXP = /\S+@\S+/
      const emailREGEX = new RegExp(emailEXP)
      return string.match(emailREGEX)
    },
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
          'name': 'Distribuidora'
        }, {
          'code': 'Proponente',
          'name': 'Proponente'
        }, {
          'code': 'Produtora',
          'name': 'Produtora'
        }, {
          'code': 'Fornecedora',
          'name': 'Fornecedora'
        }, {
          'code': 'Capacitadora',
          'name': 'Capacitadora'
        }, {
          'code': 'Exibidora',
          'name': 'Exibidora'
        }]
      }
    }
  }
}
</script>
<style lang="scss">
.el-button--primary {
  background: #7832A1 !important;
  border-color: #7832A1 !important;
}
.el-pager li.active {
  background: #7832A1 !important;
  border-color: #7832A1 !important;
}
.nav-toggle span {
  background-color: #fff !important;
}
.container.lista {
  margin-top:50px;
  margin-bottom:50px;

  .tool-bar {
    display: flex;
    flex-flow: row wrap;
    .actions {
      flex: 0 auto;
      margin-right: auto;
      order: 1;
    }

    .search {
      flex: 0 auto;
      margin-left: auto;
      order: 2;
    }

    .filters {
      flex: 0 100%;
      width: 100%;
      order: 3;
      text-align: right;
    }


  }
}
@media screen and (max-width: 1008px) {
  .container {
    padding: 0 1rem;
  }
  .spacer {
    height: 20px;
  }
  .container.lista {
    margin-top: 1rem;
    .tool-bar {
      .actions {
        flex: 0 100%;
        text-align: center;
        margin-bottom: 1rem;
      }
      .search {
        flex: 0 100%;
      }
      .filters {
        text-align: left;
        .el-checkbox-group {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-around;
        }
        .el-checkbox {
          margin: 0;
        }
        .el-checkbox__label {
          font-size: 11px;
        }
      }
    }
    th .cell {
      font-size: 11px;
      position: relative;
      .caret-wrapper {
        position: absolute;
        top: 50%;
        right: 4px;
        transform: translateY(-50%);
      }
    }
    td .cell {
      font-size: 10px;
    }
  }
}
</style>
