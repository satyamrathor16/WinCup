import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Components from '../components';
import Config from '../config';
import Strings from '../strings/Strings';
import Assets from '../assets'

const DrawerContent = (props) => {
    return (
        <View style={styles.mainContainer}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.drawerSection}>
                        <TouchableOpacity
                            style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => {
                                props.navigation.closeDrawer();
                            }}
                        >
                            <Image source={Assets.BackIcon} style={{ height: 20, width: 20, }} resizeMode='contain' />
                        </TouchableOpacity>
                        <DrawerItem
                            icon={({ color, size, focused }) => (

                                <Image source={Assets.TournamentBrackets}
                                    resizeMode='contain'
                                    style={[styles.commonIcon, { tintColor: 'white' }]}
                                />

                            )}
                            label={Strings.TournamentBracktes}
                            labelStyle={styles.commonlabel}
                            onPress={() => {
                                props.navigation.navigate('TournamentTable')
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <View style={styles.commonIcon}>
                                    <Image source={Assets.AllMetches}
                                        resizeMode='contain'
                                        style={[styles.commonIcon, { tintColor: 'white' }]}
                                    />

                                </View>
                            )}
                            label={Strings.AllMatches}
                            labelStyle={styles.commonlabel}
                            onPress={() => {

                                props.navigation.navigate('AllMatches')
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <View style={styles.commonIcon}>
                                    <Image source={Assets.HistoryOfRates}
                                        resizeMode='contain'
                                        style={[styles.commonIcon, { tintColor: 'white' }]}
                                    />
                                </View>
                            )}
                            label={Strings.HistoryOfRates}
                            labelStyle={styles.commonlabel}
                            onPress={() => {
                                props.navigation.navigate('HistoryOfRates')
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <View style={styles.commonIcon}>
                                    <Image source={Assets.Settings}
                                        resizeMode='contain'
                                        style={[styles.commonIcon, { tintColor: 'white' }]}
                                    />
                                </View>
                            )}
                            label={Strings.Settings}
                            labelStyle={styles.commonlabel}
                            onPress={() => {
                                props.navigation.navigate('Settings')
                            }}
                        />
                    </View>
                </View>

            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_DRAWER_BACKGROUND
    },
    drawerContent: {
        flex: 1,
    },
    drawerSection: {
        marginTop: 15,
    },
    commonIcon: {
        height: 30,
        width: 30,
    },
    commonIcon1: {
        height: 21,
        width: 21,
    },
    commonlabel: {
        color: Config.Theme.COLOR_WHITE,
        fontSize: 20,
        fontWeight: '400'
    },
})

export default DrawerContent;