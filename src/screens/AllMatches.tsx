import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Vibration } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Text, Header, BetPopupInput } from '../components'
import Config from '../config'
import Assets from '../assets'
import Strings from '../strings/Strings';
import Store from '../store';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');
interface ListData {
    item: {
        id: number,
        team1: string,
        team2: string,
        dateTime: string,
        group: string,
    },
    index: number
}

const AllMatches = ({ navigation }: DrawerHeaderProps) => {
    const VIBRATION_DURATION = 100;
    var click = new Sound('btn_click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
    });

    const [allMatchData, setAllMatchData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [betData, setBetData] = useState({});
    useEffect(() => {
        var matchData: any = [];
        Store.MatchData.map((item: any) => {
            item.events.map(items => {
                matchData.push(items)
            })
        })
        matchData = matchData.sort(function (a, b) { return a.startTimestamp - b.startTimestamp })
        // console.log('matchData', matchData);
        matchData = matchData.map((item) => {
            item.homeTeam.betMultiply = ((Math.random() * 4) + 1).toFixed(1);
            item.awayTeam.betMultiply = ((Math.random() * 4) + 1).toFixed(1);
            item.homeTeam.draw = ((Math.random() * 4) + 1).toFixed(1);
            return item;
        })
        setAllMatchData(matchData)
        navigation.addListener('focus', () => {
            AsyncStorage.getItem('@virtualCurrency').then((balance) => {
                if (!!balance) {
                    setAvailableBalance(parseInt(balance))
                }
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

    const getGroupNameFromName = (name) => {
        var team = Config.Teams.filter((item: any) => {
            return item.name == name;
        })
        // console.log('team', team);
        if (team.length > 0) {
            return team[0].group;
        } else {
            return ''
        }
    }

    const getTimeZone = (date: Date) => {
        var dateString = date.toString()
        var splited = dateString.split(' ');
        return splited[splited.length - 1]
    }
    const convertSecondsToDate = (seconds) => {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(seconds);
        // console.log(t.toString());
        return t;
    }

    const _renderItem = ({ item, index }: ListData) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (Config.Settings.sound == 1 && Config.Settings.vibration == 1) {
                        click.play();
                        Vibration.vibrate(VIBRATION_DURATION)

                    } else if (Config.Settings.sound == 1 && Config.Settings.vibration == 0) {
                        click.play();
                    } else if (Config.Settings.sound == 0 && Config.Settings.vibration == 1) {
                        Vibration.vibrate(VIBRATION_DURATION)
                    }
                    navigation.navigate('MatchDetails', {
                        data: item
                    })
                }}
                style={styles.listItemView}>
                <View style={styles.teamAndDateTime}>
                    <View style={styles.listItemFlagName}>
                        <Image
                            source={getTeamFlagFromName(item.homeTeam.name)}
                            resizeMode='contain'
                            style={styles.listItemFlagSize}
                        />
                        <Text style={styles.teamNameText}>{item.homeTeam.name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (Config.Settings.sound == 1 && Config.Settings.vibration == 1) {
                                click.play();
                                Vibration.vibrate(VIBRATION_DURATION)

                            } else if (Config.Settings.sound == 1 && Config.Settings.vibration == 0) {
                                click.play();
                            } else if (Config.Settings.sound == 0 && Config.Settings.vibration == 1) {
                                Vibration.vibrate(VIBRATION_DURATION)
                            }
                            navigation.navigate('TournamentTable1')
                        }}
                        style={styles.listItemFlagName}>
                        <Text style={[styles.dateTimeAndGroupText, { width: 200, textAlign: 'center' }]} numberOfLines={2}>{moment(convertSecondsToDate(item.startTimestamp)).format('MMMM DD, YYYY') + '\n' + moment(convertSecondsToDate(item.startTimestamp)).format('dddd HH:mm') + ' ' + getTimeZone(convertSecondsToDate(item.startTimestamp))}</Text>
                        {!!getGroupNameFromName(item.homeTeam.name) &&
                            <Text style={styles.dateTimeAndGroupText}>{Strings.Group} {getGroupNameFromName(item.homeTeam.name)}</Text>
                        }

                    </TouchableOpacity>
                    <View style={styles.listItemFlagName}>
                        <Image
                            source={getTeamFlagFromName(item.awayTeam.name)}
                            resizeMode='contain'
                            style={styles.listItemFlagSize}
                        />
                        <Text style={styles.teamNameText}>{item.awayTeam.name}</Text>
                    </View>
                </View>
                <View style={styles.betValuesMainView}>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModal(true)
                            setBetData({ ...item, betOn: 1, betMultiuply: (item.homeTeam.betMultiply * 10) })
                        }}
                        style={styles.listItemFlagName}>
                        <Text style={styles.P1}>{Strings.P1}</Text>
                        <View style={styles.betValueView}>
                            <Text style={styles.betValue}>{item.homeTeam.betMultiply}x</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModal(true)
                            setBetData({ ...item, betOn: 3, betMultiuply: (item.homeTeam.draw * 10) })
                        }}
                        style={styles.listItemFlagName}>
                        <Text style={styles.P1}>X</Text>
                        <View style={styles.betValueView}>
                            <Text style={styles.betValue}>{item.homeTeam.draw}x</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModal(true)
                            setBetData({ ...item, betOn: 2, betMultiuply: (item.awayTeam.betMultiply * 10) })
                        }}
                        style={styles.listItemFlagName}>
                        <Text style={styles.P1}>{Strings.P2}</Text>
                        <View style={styles.betValueView}>
                            <Text style={styles.betValue}>{item.awayTeam.betMultiply}x</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
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
                <Text style={Config.Constants.GLOBAL_STYLE.topLableText}>{Strings.MatchSchedule}</Text>
            </View>
            <FlatList
                data={allMatchData}
                renderItem={_renderItem}
                keyExtractor={key => key.id.toString()}
            />
            <BetPopupInput
                modalVisible={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
                availableBalance={availableBalance}
                onBetPress={(betAmount) => {
                    if (!!betAmount && betAmount != '') {
                        // console.log(betAmount);
                        if (parseInt(betAmount) <= availableBalance) {
                            Config.database.insertDataIntoTable(
                                betData.id,
                                betData.homeTeam.name,
                                betData.awayTeam.name,
                                parseInt(betAmount),
                                betData.betOn,
                                betData.betMultiuply
                            )
                            AsyncStorage.setItem('@virtualCurrency', (availableBalance - parseInt(betAmount)) + '');
                            setAvailableBalance(availableBalance - parseInt(betAmount));
                            setShowModal(false)
                        }
                    }


                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
    },
    topLableText: {
        fontSize: 20
    },
    listItemView: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: Config.Theme.COLOR_WHITE,
        marginTop: 15,
        backgroundColor: Config.Theme.COLOR_LIGHT_GRAY
    },
    teamAndDateTime: {
        flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        // marginHorizontal: Config.Constants.PAGE_HORIZONTAL_MARGIN
    },
    listItemFlagName: {
        alignItems: 'center',
    },
    listItemFlagSize: {
        height: 44,
        width: 44,
        marginBottom: 10
    },
    teamNameText: {
        fontSize: 20
    },
    dateTimeAndGroupText: {
        fontSize: 15
    },
    betValueView: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: Config.Theme.COLOR_GRAY,
        paddingVertical: 6,
        paddingHorizontal: 12
    },
    P1: {
        fontSize: 15,
        marginBottom: 7,
        color: Config.Theme.COLOR_GRAY
    },
    betValue: {
        fontSize: 15,
        color: Config.Theme.COLOR_GRAY
    },
    betValuesMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: 10
        // marginHorizontal: Config.Constants.PAGE_HORIZONTAL_MARGIN
    },
})

export default AllMatches;