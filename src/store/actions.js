import CONSTANTES from "./constantes";

export const actionRegistro = values => {
    return {
        type:CONSTANTES.REGISTRO,
        datos: values
    }
}

export const actionLogin = datos => {
    return {
        type:CONSTANTES.LOGIN,
        datos,
    }
}
 
export const actionEstablecerSesion = (usuario) => {
    return {
        type: CONSTANTES.ESTABLECER_SESION,
        usuario
    }
}

export const actionCerrarSesion = (datos) => {
    return {
        type: CONSTANTES.CERRAR_SESION,
    }
}

export const actionCargarImagenSignUp = (imagen) => {
    return {
        type: CONSTANTES.CARGAR_IMAGEN_SIGNUP,
        imagen
    }
}

export const actionLimpiarImagenSignUp = () => {
    return {
        type: CONSTANTES.LIMPIAR_IMAGEN_SIGNUP,
    }
}


export const actionCargarImagenPublicacion = (imagen) => {
    return {
        type: CONSTANTES.CARGAR_IMAGEN_PUBLICACION,
        imagen
    }
}


export const actionLimpiarImagenPublicacion = () => {
    return {
        type: CONSTANTES.LIMPIAR_IMAGEN_PUBLICACION,
    }
}


export const actionSubirPublicacion = values  => ({
    type: CONSTANTES.SUBIR_PUBLICACION,
    values
})

export const actionDescargarPublicaciones = () =>({
    type: CONSTANTES.DESCARGAR_PUBLICACIONES,
})

export const actionAgregarPublicacionesStore = (publicaciones) => ({
    type: CONSTANTES.AGREGAR_PUBLICACIONES_STORE,
    publicaciones
})

export const actionAgregarAutoresStore = (autores) => ({
    type: CONSTANTES.AGREGAR_AUTORES_STORE,
    autores
})
export const actionExitoSubirPublicacion = () =>({
    type: CONSTANTES.EXITO_SIBIR_PUBLICACION,
})

export const actionErrorSubirPublicacion = () => ({
    type: CONSTANTES.ERROR_SUBIR_PUBLICACION,
})

export const limpiarSubirPublicacion = () => ({
    type: CONSTANTES.LIMPIAR_SUBIR_PUBLICACION
})