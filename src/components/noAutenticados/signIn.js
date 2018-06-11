//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import SignInForm from './formas/signInForm'
import { actionLogin } from '../../store/actions';


// create a component
class SignIn extends Component {
    signInDeUsuario = (values) => {
        this.props.login(values)
    }
    render() {
        const { navigation } = this.props

        return (
            <View style={styles.container}>
                <Text>SignIn</Text>
                <SignInForm login= {this.signInDeUsuario} />
                <Button title="SignUp" onPress={ ()=>{navigation.navigate('SignUp')} } />

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
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (datos) => {
          dispatch(actionLogin(datos))
        }
    }
}



//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)


