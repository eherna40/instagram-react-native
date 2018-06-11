
import { StackNavigator } from 'react-navigation'
import SignIn from './signIn'
import SignUp from './signUp'

const RutasNoAutenticadas = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions:{
            title: 'SignIn'
        }
    },
    SignUp: {
        screen: SignUp
    },
},
{
    headerMode: 'none', //quitar header
    navigationOptions: {
        title: 'desde el stack'
    }
})


export default RutasNoAutenticadas
