import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack'
import TournamentBracket from '../screens/TournamentBracket';
import AllMatches from '../screens/AllMatches';
import HistoryOfRates from '../screens/HistoryOfRates';
import Settings from '../screens/Settings';
import TournamentTable from '../screens/TournamentTable';
import DrawerContent from './DrawerContent';
import MatchDetails from '../screens/MatchDetails';

import Config from '../config'

const Drawer = createDrawerNavigator();
const StackNav = createStackNavigator()

const MainDrawer = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerInactiveTintColor: Config.Theme.COLOR_WHITE,
                drawerActiveTintColor: Config.Theme.COLOR_FONT_ORANGE,
            }}
            initialRouteName='TournamentBracket'
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="TournamentBracket" component={TournamentBracketStack} />
            {/* <Drawer.Screen name="MatchDetails" component={MatchDetails} /> */}
            <Drawer.Screen name="AllMatches" component={AllMatchesStack} />
            <Drawer.Screen name="HistoryOfRates" component={HistoryOfRates} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="TournamentTable" component={TournamentTableStack} />
        </Drawer.Navigator>
    );
}

const TournamentBracketStack = () => {
    return (
        <StackNav.Navigator screenOptions={{
            headerShown: false
        }}>
            <StackNav.Screen name='TournamentGrid' component={TournamentBracket} />
            <StackNav.Screen name='MatchDetails' component={MatchDetails} />
            <StackNav.Screen name='TournamentTable1' component={TournamentTable} />
        </StackNav.Navigator>
    )

}

const AllMatchesStack = () => {
    return (
        <StackNav.Navigator screenOptions={{
            headerShown: false
        }}>
            <StackNav.Screen name='AllMatch' component={AllMatches} />
            <StackNav.Screen name='MatchDetails' component={MatchDetails} />
            <StackNav.Screen name='TournamentTable1' component={TournamentTable} />
        </StackNav.Navigator>
    )
}


const TournamentTableStack = () => {
    return (
        <StackNav.Navigator screenOptions={{
            headerShown: false
        }}>
            <StackNav.Screen name='TournamentTable1' component={TournamentTable} />
            <StackNav.Screen name='MatchDetails' component={MatchDetails} />
        </StackNav.Navigator>
    )
}

export default MainDrawer;