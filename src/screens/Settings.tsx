import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Vibration, Image } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Text, Header } from '../components'
import Config from '../config'
import Assets from '../assets'
import Strings from '../strings/Strings';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

Sound.setCategory('Playback');

const Settings = ({ navigation }: DrawerHeaderProps) => {
    const VIBRATION_DURATION = 100;
    var click = new Sound('btn_click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
    });
    const [sound, setSound] = useState(Config.Settings.sound);
    const [vibration, setVibration] = useState(Config.Settings.vibration)


    return (
        <View style={styles.mainContainer}>
            <Header
                showLeftButton
                leftButtonPress={() => {
                    navigation.openDrawer()
                }}
                centerImagePress={() => {
                    navigation.navigate('TournamentBracket')
                }}
            />
            <View style={Config.Constants.GLOBAL_STYLE.topLabel}>
                <Text style={Config.Constants.GLOBAL_STYLE.topLableText}>{Strings.Settings}</Text>
            </View>
            <View style={styles.contentView}>
                <Text style={styles.title}>{Strings.sound}</Text>
                <View style={styles.onOffButtonView}>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.setItem('@sound', '1')
                            setSound(1)
                            Config.Settings.sound = 1;
                            click.play();
                            if (Config.Settings.vibration == 1) {
                                setTimeout(() => {
                                    Vibration.vibrate(VIBRATION_DURATION)
                                }, 100);
                            }
                        }}
                        style={[styles.onOffButton, { borderWidth: 1, borderColor: sound == 1 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>
                        <Text style={[styles.buttonText, { color: sound == 1 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{Strings.on}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.setItem('@sound', '0')
                            setSound(0)
                            Config.Settings.sound = 0;
                            if (Config.Settings.vibration == 1) {
                                setTimeout(() => {
                                    Vibration.vibrate(VIBRATION_DURATION)
                                }, 100);
                            }
                        }}
                        style={[styles.onOffButton, { marginLeft: 40, borderWidth: 1, borderColor: sound == 0 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>
                        <Text style={[styles.buttonText, { color: sound == 0 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{Strings.off}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.title, { marginTop: '20%', }]}>{Strings.vibration}</Text>
                <View style={styles.onOffButtonView}>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.setItem('@vibration', '1')
                            setVibration(1)
                            Config.Settings.vibration = 1;
                            if (Config.Settings.sound == 1) {
                                click.play();
                            }
                            setTimeout(() => {
                                Vibration.vibrate(VIBRATION_DURATION)
                            }, 100);
                        }}
                        style={[styles.onOffButton, { borderWidth: 1, borderColor: vibration == 1 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>
                        <Text style={[styles.buttonText, { color: vibration == 1 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{Strings.on}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.setItem('@vibration', '0')
                            setVibration(0)
                            Config.Settings.vibration = 0;
                            if (Config.Settings.sound == 1) {
                                click.play();
                            }
                        }}
                        style={[styles.onOffButton, { marginLeft: 40, borderWidth: 1, borderColor: vibration == 0 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>
                        <Text style={[styles.buttonText, { color: vibration == 0 ? Config.Theme.COLOR_WHITE : Config.Theme.COLOR_GRAY }]}>{Strings.off}</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
    },
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    onOffButtonView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 25
    },
    onOffButton: {
        paddingHorizontal: 21,
        paddingVertical: 4,
        borderRadius: 6,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold'
    },
    buttonText: {
        fontSize: 25,
    }
})

export default Settings;