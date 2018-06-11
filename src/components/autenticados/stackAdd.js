import {StackNavigator} from 'react-navigation'
import SelecionarGaleria from './selecionarGaleria';
import Add from './add';

const StackAdd = StackNavigator({
    Add:{
        screen: Add
    },
    Seleccion:{
        screen:SelecionarGaleria,

    }
})

export {StackAdd}