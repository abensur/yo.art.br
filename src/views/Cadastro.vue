<template>
  <div class="container cadastro">
    <div class="cadastro__form">
      <el-form ref="novaEmpresa" :rules="rules" :model="novaEmpresa" label-width="120px">
        <el-form-item label="Nome Fantasia" prop="fantasia">
          <el-input v-model="novaEmpresa.fantasia"></el-input>
        </el-form-item>
        <el-form-item label="Estado" prop="estado">
          <el-input v-model="novaEmpresa.estado"></el-input>
        </el-form-item>
        <el-form-item label="Contato" prop="contato">
          <el-input v-model="novaEmpresa.contato"></el-input>
        </el-form-item>
        <el-form-item label="Portfólio" prop="portfolio">
          <el-input v-model="novaEmpresa.portfolio"></el-input>
        </el-form-item>
        <el-form-item label="Atuação" prop="ators">
          <el-select
            v-model="novaEmpresa.atores"
            @change="clearKnowledges"
            placeholder="Selecione sua atuação">
            <el-option
              v-for="item in atores"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-if="novaEmpresa.atores">{{ atores.find(ator => ator.value === novaEmpresa.atores).desc }}</p>
        </el-form-item>
        <el-form-item label="Conhecimentos" prop="knowledges" v-if="novaEmpresa.atores">
          <el-select
            multiple
            v-model="novaEmpresa.conhecimentos"
            placeholder="Areas de atuação">
            <el-option
              v-for="item in atores.find(ator => ator.value === novaEmpresa.atores).knowledges"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('novaEmpresa')">Criar</el-button>
          <el-button @click="resetForm('novaEmpresa')">Resetar</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { db } from '@/firebase.js'

const empresasRef = db.ref('empresas')

export default {
  name: 'Cadastro',
  data () {
    return {
      atores: [
        {
          label: 'Distribuidora',
          value: 'Distribuidora',
          desc: 'Divulgam, exibem e investem nas plataformas disponíveis, no marketing e realizam curadoria dos conteúdos do mercado.',
          knowledges: ['Trilhas', 'Filmes', 'Séries', 'Imagens']
        }, {
          label: 'Proponente',
          value: 'Proponente',
          desc: 'Buscam entender e satisfazer suas demandas midiáticas através do mercado criativo',
          knowledges: ['Empreendedor', 'Agência', 'Autônomo', 'Dept. de comunicação']
        }, {
          label: 'Produtora',
          value: 'Produtora',
          desc: 'Trabalham em todas as etapas dos projetos criativos e subsidiam-se de periodicidade e fidelização.',
          knowledges: ['Entrevistas', 'Coberturas', 'Encenações', 'Shows', 'Vinhetas', 'Video Aulas']
        }, {
          label: 'Fornecedora',
          value: 'Fornecedora',
          desc: 'Executam diversos tipos de serviços relacionados aos projetos do mercado criativo.',
          knowledges: ['Animação 3D', 'Motion Design', 'Ilustração', 'Edição de som', 'Montagem', 'Câmera', 'Som Direto', 'Trilha sonora', 'Dir. de Arte', 'Roteiro', 'Produção', 'Direção', 'Atuação', 'Iluminação', 'Jurídico', 'Locução']
        }, {
          label: 'Capacitadora',
          value: 'Capacitadora',
          desc: 'Estudam e preparam o mercado criativo e as técnicas relacionadas.',
          knowledges: ['Cênicas', 'Fotografia', 'Música', 'Plásticas', 'Pós Produção']
        }, {
          label: 'Exibidora',
          value: 'Exibidora',
          desc: 'Fornece espaço e suporte para exibição de obras.',
          knowledges: ['SVOD', 'TVOD', 'AVOD', 'Audio on Demand', 'Portal', 'Televisão', 'Rádio', 'Cinema', 'Exposição', 'Espaço de Eventos', 'Palco']
        }
      ],
      rules: {
        fantasia: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ],
        estado: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ],
        contato: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ],
        atores: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ]
      },
      novaEmpresa: {
        fantasia: '',
        estado: '',
        contato: '',
        atores: '',
        portfolio: '',
        conhecimentos: []
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          empresasRef.push(this.novaEmpresa)
          this.$message('Empresa adcionada!')
          this.$refs[formName].resetFields()
        } else {
          this.$message('Verique os campos obrigatórios')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    clearKnowledges () {
      this.novaEmpresa.conhecimentos = []
    }
  }
}
</script>
<style lang="scss">
.container.cadastro {
  margin-top:50px;
  margin-bottom:50px;
}
.cadastro__form {
  max-width: 800px;
  margin: auto;

  label {
    width: 200px !important;
  }
  .el-form-item__content {
    margin-left: 200px !important;
  }
  // .el-select__tags {
  //   max-width: 300px !important;
  // }
}
</style>
