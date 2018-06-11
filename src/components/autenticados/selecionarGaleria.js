//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import SeleccionarImagen from '../seleccionarImagen'
import { actionCargarImagenPublicacion ,actionSubirPublicacion, actionLimpiarImagenPublicacion, limpiarSubirPublicacion} from '../../store/actions';
import {blur} from 'redux-form'
import {connect} from 'react-redux'
import SeleccionarGaleriaForm from './seleccionarGaleriaForm';

// create a component
class SelecionarGaleria extends Component {
    static navigationOptions= {
        tabBarVisible: false,
    };

    componentWillUnmount =() =>{
        this.props.limpiarImagen()
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.estadoSubirPublicacion !== this.props.estadoSubirPublicacion){
            switch (nextProps.estadoSubirPublicacion) {
                case 'EXITO':
                console.log('exito')
                Alert.alert('Exito', 'Publiacaion realizada correctamente', [{text: 'ok', onPress:() =>{
                    this.props.limpiarEstadoPublicacion()
                    this.props.navigation.goBack();
                }}])
                    break; 
                case 'ERROR':
                    Alert.alert('Error', 'Publiacaion no realizada', [{text: 'Volver a intentar', onPress:() =>{
                        this.props.limpiarEstadoPublicacion()
                        this.props.navigation.goBack();
                    }}])
                    break;
            
                default:
                    break;
            }
        }
    }
    render() {
        console.log(this.props.imagen)
        return (
            <View style={styles.container}>
                <View style={styles.imagen}>
                    <SeleccionarImagen radius = {true} imagen={this.props.imagen.imagen} cargar={this.props.cargarImagen} />
                </View>
                <View style={styles.texto}>
                    <SeleccionarGaleriaForm imagen={this.props.imagen.imagen} registro={(values)=>{this.props.subirPublicacion(values)}}/>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#f9f9f9',
    },
    imagen:{
        flex: 2,

    },
    texto: {
        flex: 2
    },
});

//make this component available to the app
const mapDispatchToProps = (dispatch) => {
    return {    
        cargarImagen: (imagen) => {
            dispatch(actionCargarImagenPublicacion(imagen))
            dispatch(blur('SeleccionarGaleriaForm', 'imagen', Date.now()))
        },
        subirPublicacion: (values) => {
            console.log('subir publicacion')
            dispatch(actionSubirPublicacion(values));
        },
        limpiarImagen: ()=>{
            dispatch(actionLimpiarImagenPublicacion())
        },
        limpiarEstadoPublicacion: () => {
            dispatch(limpiarSubirPublicacion())
        }
    }
}

const mapStateToProps = (state ) => {
    return {
        imagen: state.reducerImagenPublicacion,
        estadoSubirPublicacion: state.reducerExitoSibirPublicacion.estado
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelecionarGaleria)