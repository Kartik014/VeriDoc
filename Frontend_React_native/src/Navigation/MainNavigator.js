import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/home';
import SignUp from '../Screens/SignUp';
import LogIn from '../Screens/LogIn';
import Forms from '../Screens/forms';

const stack = createStackNavigator()

function MainNavigator() {
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="LogIn" component={LogIn} />
                <stack.Screen name="SignUp" component={SignUp} />
                <stack.Screen name="Home" component={Home} />
                <stack.Screen name="Forms" component={Forms} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;