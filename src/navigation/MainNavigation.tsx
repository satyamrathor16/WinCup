import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Splash from '../screens/Splash';
import MainDrawer from './MainDrawer';
import MatchDetails from '../screens/MatchDetails';

const StackNav = createStackNavigator()

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <StackNav.Navigator screenOptions={{
                headerShown: false
            }}>
                <StackNav.Screen name='Splash' component={Splash} />
                <StackNav.Screen name='MainDrawer' component={MainDrawer} />
            </StackNav.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;