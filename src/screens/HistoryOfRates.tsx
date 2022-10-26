import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Vibration } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Text, Header } from '../components'
import Config from '../config'
import Assets from '../assets'
import Strings from '../strings/Strings';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryOfRates = ({ navigation }: DrawerHeaderProps) => {

    const [availableBalance, setAvailableBalance] = useState(0)

    const VIBRATION_DURATION = 100;
    var click = new Sound('btn_click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
    });

    const [data, setData] = useState([])

    useEffect(() => {
        navigation.addListener('focus', () => {
            AsyncStorage.getItem('@virtualCurrency').then((balance) => {
                if (!!balance) {
                    setAvailableBalance(parseInt(balance))
                }
            })
            Config.database.getData().then((data) => {
                console.log('succes', data);
                setData(data)
            }).catch((error) => {
                console.log('error');
            })
        })

    }, [])

    const getTeamFlagFromName = (name) => {
        var team = Config.Teams.filter((item: any) => {
            return item.name == name;
        })
        // console.log('team', team);
        if (team.length > 0) {
            return team[0].flag;
        } else {
            return Assets.no_flag
        }
    }

    const _renderItem = ({ item, index }) => {
        return (
            <View style={styles.listItemView}>
                <View style={{ flex: 7 }}>
                    <View style={styles.listItemFlagName}>
                        <Image
                            source={getTeamFlagFromName(item.Home_Team)}
                            resizeMode='contain'
                            style={styles.listItemFlagSize}
                        />
                        <Text style={styles.teamNameText}>{item.Home_Team}</Text>
                    </View>
                    <View style={[styles.listItemFlagName, { marginTop: 10 }]}>
                        <Image
                            source={getTeamFlagFromName(item.Away_Team)}
                            resizeMode='contain'
                            style={styles.listItemFlagSize}
                        />
                        <Text style={styles.teamNameText}>{item.Away_Team}</Text>
                    </View>
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.teamNameText}>{Strings.bid}</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                    <Text style={styles.teamNameText}>0</Text>
                </View>
            </View>
        )
    }

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
                <Text style={Config.Constants.GLOBAL_STYLE.topLableText}>{Strings.HistoryOfRates}</Text>
            </View>

            <FlatList
                data={data}
                renderItem={_renderItem}
                ListEmptyComponent={
                    <View style={{ flex: 1 }}>

                    </View>
                }
            />

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    // navigation.navigate('TournamentTable')
                    // console.log('2022-10-23' != '2022-10-22');
                    // Config.database.insertDataIntoTable(21354, 'South Korea', 'Portugal', 200, 1, 4.4 * 10)
                    // Config.database.getData().then((data) => {
                    //     console.log('succes', data);
                    // }).catch((error) => {
                    //     console.log('error');
                    // })
                }}
                style={styles.coinView}>
                <Text style={styles.coinText}>{availableBalance}</Text>
                <Image source={Assets.Coin} resizeMode='contain' style={styles.coinImage} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
    },
    listItemView: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: Config.Theme.COLOR_WHITE,
        marginTop: 15,
        backgroundColor: Config.Theme.COLOR_LIGHT_GRAY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    listItemFlagSize: {
        height: 22,
        width: 22,
        marginRight: 10
    },
    teamNameText: {
        fontSize: 20
    },
    listItemFlagName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Config.Theme.COLOR_FONT_ORANGE,
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    coinText: {
        fontSize: 25,
        color: Config.Theme.COLOR_FONT_ORANGE,
    },
    coinImage: {
        height: 26,
        width: 26,
        marginLeft: 10
    }
})

export default HistoryOfRates;