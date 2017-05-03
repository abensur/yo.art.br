import { firebaseApp } from '@/firebase.js'

const auth = firebaseApp.auth()

export default {
  LOGIN: function ({ commit }, params) {
    const promise = auth.signInWithEmailAndPassword(params.email, params.password)
    promise.catch(e => console.log(e.message))

    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        commit('SET_USER', firebaseUser)
      } else {
        console.log('desconectado...')
      }
    })
  },
  LOGOUT: function ({ commit }) {
    auth.signOut()
    commit('SET_USER', '')
  }
}
