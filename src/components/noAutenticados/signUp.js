//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { blur, change} from 'redux-form'
import SignUpFrom from './formas/signUpForm'
import { actionRegistro,actionLimpiarImagenSignUp, actionCargarImagenSignUp } from '../../store/actions';
import SeleccionarImagen from '../seleccionarImagen';
import CONSTANTES from '../../store/constantes';


// create a component
class SignUp extends Component {

    registroDeUsuario = (values) =>{
        console.log(values)
        this.props.registro(values)
    }
    componentWillUnmount = () =>{
        this.props.limpiarImagen()
    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <SeleccionarImagen imagen = {this.props.imagen.imagen} cargar={this.props.cargarImagen}/>
                <SignUpFrom registro= {this.registroDeUsuario} imagen={this.props.imagen.imagen} />
                <Button title="SignIn" onPress={() => { navigation.goBack()  }} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        margin: 10

    },
});

const mapStateToProps = (state) => {
    return {
        numero: state.reducerPrueba,
        imagen: state.reducerImagenSignUp,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registro: (values) => {
            dispatch(actionRegistro(values))
        },
        cargarImagen: (imagen) =>{
            dispatch(actionCargarImagenSignUp(imagen))
            dispatch(blur('SignUpForm', 'imagen', Date.now()))
        },
        limpiarImagen: () => {
            dispatch(actionLimpiarImagenSignUp())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

