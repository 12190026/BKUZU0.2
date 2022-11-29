import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCzvuA_6OGIIVRwbck71qBwNyRMXtBdSaE",
  authDomain: "bkuzu-295d0.firebaseapp.com",
  projectId: "bkuzu-295d0",
  storageBucket: "bkuzu-295d0.appspot.com",
  messagingSenderId: "305647920422",
  appId: "1:305647920422:web:b1366830f57614bf7e0de7"
};
firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { firebase as default, storage }
