import {StackNavigator} from'react-navigation'
import Search from './search';
import Publicacion from './publicacion';
import Autor from './profile';
import Comentarios from './comentarios';

const StackSearch = StackNavigator({
    Search: {
        screen: Search
    },
    Publicacion: {
        screen: Publicacion
    },
    Autor:{
        screen: Autor
    },
    Comentarios:{
        screen: Comentarios
    }

})

export default StackSearch