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
        <el-form-item label="Contato" prop="site">
          <el-input v-model="novaEmpresa.site"></el-input>
        </el-form-item>
        <el-form-item label="Atuação" prop="ators">
          <el-select v-model="novaEmpresa.atores" placeholder="Selecione sua atuação">
            <el-option
              v-for="item in atores"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p v-if="novaEmpresa.atores">{{ atores.filter(ator => ator.value === novaEmpresa.atores)[0].desc }}</p>
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
          desc: 'Divulgam, exibem e investem nas plataformas disponíveis, no marketing e realizam curadoria dos conteúdos do mercado.'
        }, {
          label: 'Proponente',
          value: 'Proponente',
          desc: 'Buscam entender e satisfazer suas demandas midiáticas através do mercado criativo'
        }, {
          label: 'Realizadora',
          value: 'Realizadora',
          desc: 'Trabalham em todas as etapas dos projetos criativos e subsidiam-se de periodicidade e fidelização.'
        }, {
          label: 'Fornecedora',
          value: 'Fornecedora',
          desc: 'Executam diversos tipos de serviços relacionados aos projetos do mercado criativo.'
        }, {
          label: 'Capacitadora',
          value: 'Capacitadora',
          desc: 'Estudam e preparam o mercado criativo e as técnicas relacionadas.'
        }
      ],
      rules: {
        fantasia: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ],
        estado: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ],
        site: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ],
        atores: [
          { required: true, message: 'Campo obrigatório', trigger: 'change' }
        ]
      },
      novaEmpresa: {
        fantasia: '',
        estado: '',
        site: '',
        atores: ''
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
    }
  }
}
</script>
<style lang="css">
.container.cadastro {
  margin-top:50px;
  margin-bottom:50px;
}
.cadastro__form {
  max-width: 800px;
  margin: auto;
}
</style>
