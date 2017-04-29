import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDqokVsf14FYlnLixAUY0bpVdh2aM_GyiE',
  authDomain: 'projecta-9b326.firebaseapp.com',
  databaseURL: 'https://projecta-9b326.firebaseio.com',
  storageBucket: 'projecta-9b326.appspot.com',
  messagingSenderId: '866515646136'
}

const firebaseApp = Firebase.initializeApp(firebaseConfig)

const db = firebaseApp.database()

export { db, firebaseApp }
