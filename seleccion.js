//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect} from 'react-redux'
import {autenticacion} from './src/store/servicios/firebase'
import RutasNoAutenticadas from './src/components/noAutenticados/rutas';
import RutasAutenticadas from './src/components/autenticados/rutas';
import { actionEstablecerSesion, actionCerrarSesion } from './src/store/actions';


const loading= 0;
// create a component
class Seleccion extends Component {
    componentDidMount = () =>{
        this.props.autenticacion()
        console.log('paso')
    }
    render() {
        console.log(loading)
        return (
            <View style={styles.container}>
            {
                this.props.usuario ? 
                    <RutasAutenticadas/> 
                :
                    <RutasNoAutenticadas />
        
            }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const mapStateToProps = (state) => {
    return {
        usuario: state.reducerSesion
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        autenticacion: () => {
            //dispatch(actionCreator)
            autenticacion.onAuthStateChanged(function(usuario) {
                if(usuario){
                    console.log(usuario.toJSON())
                    dispatch(actionEstablecerSesion(usuario))
                    console.log(loading)
                }else{
                    console.log('no existe session')
                    dispatch(actionCerrarSesion())
                }   
            })
        }
    }
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Seleccion)