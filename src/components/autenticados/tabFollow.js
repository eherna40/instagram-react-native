
import { TabNavigator } from 'react-navigation'
import Follow from './follow'

const TabFollow = TabNavigator({
    Follow: {
        screen: Follow
    },
    Followers:{
        screen: Follow
    }
},
{
    tabBarPosition: 'top'
})

export default TabFollow
