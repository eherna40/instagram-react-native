import { StackNavigator } from 'react-navigation'
import Home from './home'
import Autor from './profile'
import Comentarios from './comentarios'
import Publicacion from './publicacion'

const StackHome = StackNavigator({
    Home: {
        screen: Home
    },
    Autor:{
        screen: Autor
    },
    Comentarios: {
        screen: Comentarios,
        navigationOptions:{
            tabBarVisible: false
        }
    },
    Publicacion:{
        screen: Publicacion,
        
    }
})

export default StackHome