//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form'

const fieldNombre = (props) =>{
    return (
        <View style={styles.textInput}>
            <TextInput 
                placeholder={props.ph} 
                value={props.input.value} 
                onChangeText={props.input.onChange} 
                keyboardType="default"
                autoCapitalize='none'
                onBlur={props.input.onBlur}
                multiline={true}

            />
            <View style={styles.required}>{props.meta.touched && props.meta.error && <Text style={styles.errors}>{props.meta.error}</Text>}</View>
            
        </View>
    )
}


const validate = (values, props) =>{
    const errors = {}
    if(!props.imagen){
        errors.imagen = 'Imagen requerida'
    }


    if(values.texto && values.texto.length > 140){
        errors.texto ='deben ser menor de 140 caracteres'
    }



      return errors
}

const fieldImagen = (props) =>{
    return(
        <View>
            <View>
                {props.meta.touched && props.meta.error && <Text style={styles.errors}>{props.meta.error}</Text>}
            </View>
        </View>

    )
}


// create a component
const SeleccionarGaleriaForm  = (props) => {
    console.log(props)
    return (
        <View style={styles.container}>
            <Field name="imagen" component={fieldImagen} />
            <Field name="texto" component={fieldNombre} ph="texto de la imagen" />

            <Button 
                title="Registrar" 
                onPress={props.handleSubmit((values) => {console.log('asdsadsadsad'); props.registro(values)}
                )} 
            />
            

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    textInput:{
        marginHorizontal: 16,
    },
    required:{
        height: 10,
    },
    errors:{
        color: 'red'
    }
});

//make this component available to the app
export default reduxForm({
    form: 'SeleccionarGaleriaForm',
    validate,
})(SeleccionarGaleriaForm);
