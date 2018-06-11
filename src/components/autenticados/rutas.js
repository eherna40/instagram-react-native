
import { TabNavigator } from 'react-navigation'
import StackHome from './stackHome';
import StackSearch from './stackSearch';
import Profile from './profile';
import Add from './add'
import StackFollow from './stackFollow';
import { StackAdd } from './stackAdd';

const RutasAutenticadas = TabNavigator({
    Home: {
        screen: StackHome
    },
    Search:{
        screen: StackSearch
    },
    Add: {
        screen: StackAdd
    },
    Follow:{
        screen:StackFollow
    },
    Profile:{
        screen: Profile
    }
    
},
{
    tabBarPosition: 'bottom'
})


export default RutasAutenticadas
