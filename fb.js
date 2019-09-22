import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCE8BVKomPBv3vEjzMW_YH7aRxP3Entyos',
  authDomain: 'sample-data-users.firebaseapp.com',
  databaseURL: 'https://sample-data-users.firebaseio.com',
  projectId: 'sample-data-users',
  storageBucket: 'sample-data-users.appspot.com',
  messagingSenderId: '762119926555',
  appId: '1:762119926555:web:8c156a9aea9627572459be'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export default db
