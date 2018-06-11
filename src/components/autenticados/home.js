//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, Dimensions } from 'react-native';
import {connect} from 'react-redux'
import { actionDescargarPublicaciones } from '../../store/actions';
import Publicacion from './publicacion';

// create a component
class Home extends Component {
    constructor(props){
        super()
    }
    componentDidMount(){
        this.props.descargarPublicaciones()
    }
    render() {
        console.log(this.props.publicaciones)
        console.log(this.props)

        const { navigation, autores } = this.props

        return (
            <View style={styles.container}>
            <FlatList
                data =  {this.props.publicaciones}
                renderItem = {({item, index}) => <Publicacion item={item} autor= {autores[index]}/>}
                ItemSeparatorComponent={() => <View style={styles.separador}></View>}
            />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    separador:{
        borderWidth: 1,
        borderColor: '#c0c0c0'
    }
});

//make this component available to the app
const mapDispatchToProps = (dispatch) => {
    return {
        descargarPublicaciones: () => {
            dispatch(actionDescargarPublicaciones())
        }
    }
}
const mapStateToProps = (state) => {
    return {
        publicaciones: state.reducerPublicacionesDescargadas,
        autores: state.reducerAutoresDescargados
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)