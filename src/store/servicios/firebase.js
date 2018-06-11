import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAxqdPrT7D_osHnRgb_vZxpQt2EyacDEJs",
    authDomain: "clom-bbb6f.firebaseapp.com",
    databaseURL: "https://clom-bbb6f.firebaseio.com",
    projectId: "clom-bbb6f",
    storageBucket: "clom-bbb6f.appspot.com",
    messagingSenderId: "209930554950"
  };
  firebase.initializeApp(config);


  export const autenticacion = firebase.auth()
  export const baseDeDatos = firebase.database()
  export const storage = firebase.storage()