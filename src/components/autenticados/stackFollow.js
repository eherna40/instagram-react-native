import {StackNavigator} from'react-navigation'
import TabFollow from './tabFollow';
import Autor from './profile';
import Publicacion from './publicacion';
import Comentarios from './comentarios';

const StackFollow = StackNavigator({
    TabFollow:{
        screen: TabFollow,
        navigationOptions:{
            header: null
        }
    },
    Autor:{
        screen: Autor
    },
    Publicacion:{
        screen: Publicacion
    },
    Comentarios: {
        screen: Comentarios
    }

})

export default StackFollow