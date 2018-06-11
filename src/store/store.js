import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as form } from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import sagaMiddlewareFactory from 'redux-saga';
import funcionPrimaria from './sagas/sagas'
import CONSTANTES from './constantes';

const reducerPrueba = (state = [0], action) => {
    switch (action.type) {
        case 'a':
            return [...state, 1]            
            break;
    
        default:
            return state;
    }
}


const reducerSesion = (state= null, action) => {
    switch (action.type) {
        case CONSTANTES.ESTABLECER_SESION:
            return action.usuario;
        case CONSTANTES.CERRAR_SESION:
            return null;
        default:
            return state;
    }
}

const reducerImagenSignUp = (state = {imagen: null} , action) =>{
    switch (action.type) {
        case CONSTANTES.CARGAR_IMAGEN_SIGNUP:
        console.log(action)
            return{imagen: action.imagen}
        case CONSTANTES.LIMPIAR_IMAGEN_SIGNUP:
            return {imagen: null}
        default:
            return state
    }
}



const reducerImagenPublicacion = (state = {imagen: null} , action) =>{
    switch (action.type) {
        case CONSTANTES.CARGAR_IMAGEN_PUBLICACION:
            return{imagen: action.imagen}
        case CONSTANTES.LIMPIAR_IMAGEN_PUBLICACION:
            return {imagen: null}
        default:
            return state
    }
}



const reducerPublicacionesDescargadas = (state= [], action) => {
    switch (action.type) {
        case CONSTANTES.AGREGAR_PUBLICACIONES_STORE:
            
            return[...state, ...action.publicaciones];
    
        default:
            return state;
    }
}

const reducerAutoresDescargados = (state= [], action) => {
    switch (action.type) {
        case CONSTANTES.AGREGAR_AUTORES_STORE:
            
            return[...state, ...action.autores];
    
        default:
            return state;
    }
}

const reducerExitoSibirPublicacion = (state = {estado: null}, action) =>{
    switch (action.type) {
        case CONSTANTES.EXITO_SIBIR_PUBLICACION:
            return {estado: 'EXITO'};
        case CONSTANTES.ERROR_SUBIR_PUBLICACION:
            return {estado:'ERROR'}
        case CONSTANTES.LIMPIAR_SUBIR_PUBLICACION:
            return {estado: null}
        default:
            return state;
    }
}
const sagaMiddleware = createSagaMiddleware()


const reducers = combineReducers({
    reducerExitoSibirPublicacion,
    reducerAutoresDescargados,
    reducerPublicacionesDescargadas,
    reducerSesion,
    reducerPrueba,
    form,
    reducerImagenSignUp,
    reducerImagenPublicacion,
})





const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(funcionPrimaria)

export default store