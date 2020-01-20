import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        'DevRadar': {
            screen: Main,
        },
        'Perfil do Github': {
            screen: Profile,
        }
    },
    {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#7D40E7',
            }
        }
    }
    )
);

export default Routes; 