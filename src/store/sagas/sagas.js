import { takeEvery, call, select, put, all } from 'redux-saga/effects'
import{ autenticacion, baseDeDatos, storage} from '../servicios/firebase'
import CONSTANTES from '../constantes';
import { actionAgregarPublicacionesStore ,actionAgregarAutoresStore, actionExitoSubirPublicacion, actionErrorSubirPublicacion} from '../actions';
var CryptoJS = require('crypto-js');
//import RNFetchBlob from 'react-native-fetch-blob'



const registroEnFirebase = (values) =>
        autenticacion
            .createUserWithEmailAndPassword(values.correo, values.password)
                .then(success => success.user.toJSON())
    

const registroEnBaseDeDatos = ({uid, email,nombre, photoURL}) =>
    baseDeDatos.ref('usuarios/' + uid).set({
    nombre,
    email,
    photoURL
})

const loginEnFirebase = ({correo, password}) => 
    autenticacion.signInWithEmailAndPassword(correo,password)
        .then((success) => success)
       


function* generadoraLogin (values) { 
    console.log(values)
    
    try {
        const resutlado = yield call (loginEnFirebase, values.datos)
    } catch (error) {
        console.log(error)
    }

}
const registroFotoCloudinary = ({imagen}) => {

    return new Promise(function(resolve, reject) {
    const {uri, type} = imagen
     let upload_url = CONSTANTES.CLOUDINARY_NAME
     const splitName = uri.split('/')
     const name = [...splitName].pop()
      let xhr = new XMLHttpRequest();
     xhr.open('POST', upload_url);
     xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
    
     };


    let formdata = new FormData();
    formdata.append('file', {uri: uri, type: 'image/jpg', name: name});
    formdata.append('upload_preset', CONSTANTES.CLOUDINARY_PRESET)

    
    xhr.send(formdata);
    
})
}

function* generadoraRegistro (values) { 
    try {

        const imagen = yield select ((state) => state.reducerImagenSignUp)
        console.log(imagen)
        const urlFoto = yield call(registroFotoCloudinary, imagen)
        console.log(urlFoto)
        const photoURL = urlFoto.secure_url
        const registro = yield call(registroEnFirebase, values.datos)
        const {email, uid} = registro
        console.log(uid)
        const { datos: { nombre } } = values;
        //necesitamos uid, email,nombre
        yield call(registroEnBaseDeDatos, {uid,email,nombre, photoURL})
    } catch (error) {
        console.log(error)
    }

    
}
const escribirFirebase = ({width,height,secure_url, uid}, texto = "") => 
baseDeDatos.ref('publicaciones/').push({
    width,
    height,
    secure_url,
    uid, 
    texto
}).then(response => response)


const escribirAutorPublicaciones =  ({uid, key})  => baseDeDatos.ref(`autor-publicaciones/${uid}`).update({
    [key]: true
}).then(response => response)

function* sagaSubirPublicacion({values}){
    try {
        const imagen  = yield select (state => state.reducerImagenPublicacion)
        const usuario  = yield select (state => state.reducerSesion)
        const {uid} = usuario
        const resultadoImagen = yield call(registroFotoCloudinary, imagen)
        const {width, height, secure_url} =resultadoImagen 
        const parametrosImagen = {width, height, secure_url, uid}
        const escribirEnFirebase= yield call(escribirFirebase, parametrosImagen, values.texto)
        const {key} = escribirEnFirebase
        parametrosAutorPublicaciones  = {uid, key}
        const resultadoEscribirAutorPublicaciones = yield call(escribirAutorPublicaciones, parametrosAutorPublicaciones )
        console.log(resultadoEscribirAutorPublicaciones)
        yield put(actionExitoSubirPublicacion())
    } catch (error) {
        console.log(error)
        yield put(actionErrorSubirPublicacion())

    }
}

const descargarPublicaciones = () => baseDeDatos
    .ref('publicaciones/')
    .once('value')
    .then(snapshot=> {
        let publicaciones = []
        snapshot.forEach((childSnapshot)=>{
            const key = childSnapshot.key
            let publicacion = childSnapshot.val()
            publicacion.key = key
            publicaciones.push(publicacion)
            })
            return publicaciones
        }
    )
const descargarAutor = (uid= 'DSwuECmECsfgEUhO8m5Vyegf9l92') => baseDeDatos
    .ref(`usuarios/${uid}`)
    .once('value')
    .then((snapshot) => snapshot.val())


function* sagaDescargarPublicaciones() {
    try {
        const publicaciones =yield call(descargarPublicaciones)
        
        const autores = yield all (publicaciones.map(publicacion => call(descargarAutor, publicacion.uid)))
        console.log(autores)
        yield put(actionAgregarAutoresStore(autores))
        //yield call()
        yield put(actionAgregarPublicacionesStore(publicaciones))
    } catch (error) {
        console.log(error)
        
    }
}
export default function* funcionPrimaria(){
    yield takeEvery(CONSTANTES.REGISTRO, generadoraRegistro);
    yield takeEvery(CONSTANTES.LOGIN, generadoraLogin);
    yield takeEvery(CONSTANTES.SUBIR_PUBLICACION, sagaSubirPublicacion);
    yield takeEvery(CONSTANTES.DESCARGAR_PUBLICACIONES, sagaDescargarPublicaciones)
}