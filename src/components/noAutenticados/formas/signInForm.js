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
                keyboardType={props.input.name === 'correo' ? 'email-address' : 'default'}
                autoCapitalize='none'
                secureTextEntry={!!(props.input.name ==='password' || props.input.name=== 'confirmacion')}
                onBlur={props.input.onBlur}

            />
            <View style={styles.required}>{props.meta.touched && props.meta.error && <Text style={styles.errors}>{props.meta.error}</Text>}</View>
        </View>
    )
}


const validate = (values) =>{
    const errors = {}


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


      return errors
}


// create a component
const SignInForm  = (props) => {
    return (
        <View style={styles.container}>

            <Field name="correo" component={fieldNombre} ph="correo" />
            <Field name="password" component={fieldNombre} ph="***" />

            <Button title="Login" onPress={props.handleSubmit(props.login)} />
            

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {

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
})(SignInForm);
