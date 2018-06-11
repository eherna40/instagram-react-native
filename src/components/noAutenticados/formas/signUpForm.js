//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Field, reduxForm } from 'redux-form'
import {autenticacion} from '../../../store/servicios/firebase'

const fieldNombre = (props) =>{
    return (
        <View style={styles.textInput}>
            <TextInput 
                placeholder={props.ph} 
                value={props.input.value} 
                onChangeText={props.input.onChange} 
                keyboardType={props.input.name === 'correo' ? 'email-address' : 'default'}
                autoCapitalize='none'
                secureTextEntry={!!(props.input.name ==='password' || props.input.name=== 'confirmacion')}
                onBlur={props.input.onBlur}

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


    if(!values.nombre){
        errors.nombre = 'requerido'
    } else if(values.nombre.length < 5){
        errors.nombre = 'Deben ser al menos 5 caracteres'
    }else if (values.nombre.length > 10 ){
        errors.nombre ='deben ser menor  de 10 caracteres'
    }

    if(!values.correo){
        errors.correo = 'requerido'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
        errors.correo = 'Invalid email address'
      }

      if(!values.password){
        errors.password = 'requerido'
      }else if(values.password.length < 5){
          errors.password= 'deben ser de almenos de 5 caracteres'
      }else if(values.password.length > 15){
          errors.password="'debe ser de menos de 15 caracteres"
      }

      if(!values.confirmacion){
        errors.confirmacion = 'requerido'
      } else if (values.password != values.confirmacion){
          errors.confirmacion="debe coiincidir con el password"
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
const SignUpForm  = (props) => {
    return (
        <View style={styles.container}>
            <Field name="imagen" component={fieldImagen} />
            <Field name="nombre" component={fieldNombre} ph="nombre" />
            <Field name="correo" component={fieldNombre} ph="correo" />
            <Field name="password" component={fieldNombre} ph="***" />
            <Field name="confirmacion" component={fieldNombre} ph="***" />

            <Button 
                title="Registrarse" 
                onPress={props.handleSubmit((values) => {props.registro(values)
                    // console.log(values.password)
                    // autenticacion.createUserWithEmailAndPassword(values.correo, values.password)
                    // .then((success) =>{
                    //     console.log(success)
                    // })
                    // .catch(function(error) {
                    //     var errorCode = error.code;
                    //     var errorMessage = error.message;
                    //     console.log(errorCode)
                    //     console.log(errorMessage)
                    //   });
                    }
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
        marginBottom: 16,
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
    form: 'SignUpForm',
    validate,
})(SignUpForm);
