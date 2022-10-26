import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Components from '../components'
import Config from '../config'
import Assets from '../assets'
import Strings from '../strings/Strings'
import { NavigationProp } from '@react-navigation/native';
import { StackHeaderProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Store from '../store'

const Splash = ({ navigation }) => {

    const slideAnimation = useRef(new Animated.Value(164)).current;
    const rotationAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Config.database.createTable();
        Animated.timing(slideAnimation, {
            toValue: 50,
            duration: 2000,
            useNativeDriver: false
        }).start();
        Animated.loop(
            Animated.timing(rotationAnimation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: false
            })).start();
        AsyncStorage.getItem('@virtualCurrencyDate').then((data) => {
            if (!!data) {
                var storedDate = new Date(data)
                var currentDate = new Date();
                console.log('StoredDate', storedDate);
                console.log('currentDate', currentDate);
                // console.log(storedDate < currentDate);
                var firstDate = moment(storedDate).format('YYYY-MM-DD')
                var secondDate = moment(currentDate).format('YYYY-MM-DD')
                if (firstDate != secondDate) {
                    AsyncStorage.setItem('@virtualCurrencyDate', new Date().toString());
                    AsyncStorage.getItem('@virtualCurrency').then((balance) => {
                        if (!!balance) {
                            var avalableBalance = parseInt(balance)
                            var newBalance = avalableBalance + 500;
                            AsyncStorage.setItem('@virtualCurrency', newBalance + '');
                        }
                    })

                }
            } else {
                AsyncStorage.setItem('@virtualCurrencyDate', new Date().toString());
                AsyncStorage.setItem('@virtualCurrency', '500');
            }
        })
        AsyncStorage.getItem('@sound').then((data) => {
            // console.log('sound', data);
            if (!!data && data == '0') {
                Config.Settings.sound = 0
            } else {
                Config.Settings.sound = 1
            }

        })
        AsyncStorage.getItem('@vibration').then((data) => {
            // console.log('vibration', data);
            if (!!data && data == '0') {
                Config.Settings.vibration = 0
            } else {
                Config.Settings.vibration = 1
            }

        })

        fetch('https://api.sofascore.com/mobile/v4/unique-tournament/16/season/41087/events',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(r => r.json())
            .then(events_response => {
                //teams data
                fetch('https://api.sofascore.com/mobile/v4/unique-tournament/16/season/41087/standings',
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    }).then(r => r.json())
                    .then(teams_response => {
                        if ('tableRows' in teams_response[0]) {
                            // console.log('teams_response', teams_response);
                            Store.TeamsData = teams_response;
                        }
                        if ('tournaments' in events_response) {
                            Store.MatchData = events_response.tournaments;
                        }
                        setTimeout(() => {
                            navigation.replace('MainDrawer')
                        }, 1000);
                    })
            })
    }, [])

    const spin = rotationAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    return (
        <View style={styles.mainContainer}>
            <Components.OnlyStatusBar />
            <View style={styles.loadingTextView}>
                <Components.Text>{Strings.Loading}</Components.Text>
            </View>
            <View style={styles.fireWorkImageView}>
                <Image source={Assets.FireWorks} style={styles.fireworkImage} resizeMode='cover' />
            </View>
            <View style={styles.trophyImageView}>
                <Image source={Assets.Trophy} style={styles.trophyImage} resizeMode='contain' />
            </View>
            <View style={styles.footballImageView}>
                <Image source={Assets.AppLogo} style={styles.footballImage} resizeMode='contain' />
                <Animated.View style={[styles.footballImageViewAnimated, { width: slideAnimation }]}>
                    <Animated.Image source={Assets.Football} style={[styles.footballImageAnimated, {
                        transform: [{
                            rotate: spin
                        }]
                    }]} resizeMode='contain' />
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
    },
    fireWorkImageView: {
        height: '70%',
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    fireworkImage: {
        height: '100%',
        width: '100%',
    },
    trophyImageView: {
        height: '60%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        // backgroundColor:'blue'
    },
    trophyImage: {
        height: '100%',
        width: '100%',
    },
    footballImageView: {
        height: 50,
        width: 164,
        position: 'absolute',
        top: getStatusBarHeight() + 20,
        // alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'white'
        // backgroundColor:'blue'
    },
    footballImageViewAnimated: {
        height: 50,
        borderRadius: 100,
        overflow: 'hidden',
        position: 'absolute',
        backgroundColor: Config.Theme.COLOR_BACKGROUND,
        alignSelf: 'flex-end',
    },
    footballImage: {
        height: 50,
        width: 164,
    },
    footballImageAnimated: {
        height: 50,
        width: 50,
    },
    loadingTextView: {
        position: 'absolute',
        top: getStatusBarHeight() + 80,
        // alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'white'
        // backgroundColor:'blue'
    },
})

export default Splash;
