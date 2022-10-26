import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Vibration } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Text, Header, BetPopupInput } from '../components'
import Config from '../config'
import Assets from '../assets'
import Strings from '../strings/Strings';
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const MatchDetails = ({ navigation, route }: DrawerHeaderProps) => {
    const VIBRATION_DURATION = 100;
    var click = new Sound('btn_click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
    });

    const pageDate = route.params.data;
    const [teamLineUps, setTeamLineUps] = useState([
        { teamLine: Strings.TeamLineup1, isExpaned: false },
        { teamLine: Strings.TeamLineup2, isExpaned: false },
    ])
    const [showModal, setShowModal] = useState(false);
    const [availableBalance, setAvailableBalance] = useState(0);
    const [betData, setBetData] = useState({});
    useEffect(() => {
        if (!pageDate.homeTeam.betMultiply) {
            pageDate.homeTeam.betMultiply = ((Math.random() * 4) + 1).toFixed(1);
            pageDate.awayTeam.betMultiply = ((Math.random() * 4) + 1).toFixed(1);
            pageDate.homeTeam.draw = ((Math.random() * 4) + 1).toFixed(1);
        }

        navigation.addListener('focus', () => {
            fetch(`https://api.sofascore.com/api/v1/team/${pageDate.homeTeam.id}/players`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(r => r.json())
                .then(homeTeamData => {
                    console.log('homeTeamData', homeTeamData);
                    if ('players' in homeTeamData) {
                        setTeamLineUps(
                            teamLineUps.map((item: any, index: number) => {
                                if (index == 0) {
                                    item.teamData = homeTeamData.players
                                }
                                return item;
                            })
                        )
                    }

                })
            fetch(`https://api.sofascore.com/api/v1/team/${pageDate.awayTeam.id}/players`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(r => r.json())
                .then(awayTeamData => {
                    if ('players' in awayTeamData) {
                        setTeamLineUps(
                            teamLineUps.map((item: any, index: number) => {
                                if (index == 1) {
                                    item.teamData = awayTeamData.players
                                }
                                // console.log('awayTeamData.players', item);

                                return item;
                            })
                        )
                    }

                })
        })
        AsyncStorage.getItem('@virtualCurrency').then((balance) => {
            if (!!balance) {
                setAvailableBalance(parseInt(balance))
            }
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

    const convertSecondsToDate = (seconds) => {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(seconds);
        // console.log(t.toString());
        return t;
    }
    const getTimeZone = (date: Date) => {
        var dateString = date.toString()
        var splited = dateString.split(' ');
        return splited[splited.length - 1]
    }

    const onTeamLineUpPress = (index) => {
        setTeamLineUps(
            teamLineUps.map((item: any, index1: number) => {
                if (index == index1) {
                    item.isExpaned = !item.isExpaned;
                } else {
                    item.isExpaned = false;
                }
                return item;
            })
        )
    }

    const onPressAnyButton = () => {
        if (Config.Settings.sound == 1 && Config.Settings.vibration == 1) {
            click.play();
            Vibration.vibrate(VIBRATION_DURATION)

        } else if (Config.Settings.sound == 1 && Config.Settings.vibration == 0) {
            click.play();
        } else if (Config.Settings.sound == 0 && Config.Settings.vibration == 1) {
            Vibration.vibrate(VIBRATION_DURATION)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Header
                showLeftButton
                leftButtonPress={() => {
                    navigation.openDrawer()
                }}
                centerImagePress={() => {
                    navigation.goBack()
                }}
            />
            <View style={Config.Constants.GLOBAL_STYLE.topLabel}>
                <Text style={Config.Constants.GLOBAL_STYLE.topLableText}>{Strings.MatchDetails}</Text>
            </View>
            <ScrollView>
                <View>
                    <View style={styles.listItemView}>
                        <View style={styles.teamAndDateTime}>
                            <View style={styles.listItemFlagName}>
                                <Image
                                    source={getTeamFlagFromName(pageDate.homeTeam.name)}
                                    resizeMode='contain'
                                    style={styles.listItemFlagSize}
                                />
                                <Text style={styles.teamNameText}>{pageDate.homeTeam.name}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('TournamentTable1')
                                }}
                                style={styles.listItemFlagName}>
                                <Text style={[styles.dateTimeAndGroupText, { width: 200, textAlign: 'center' }]} numberOfLines={2}>{moment(convertSecondsToDate(pageDate.startTimestamp)).format('MMMM DD, YYYY') + '\n' + moment(convertSecondsToDate(pageDate.startTimestamp)).format('dddd HH:mm') + ' ' + getTimeZone(convertSecondsToDate(pageDate.startTimestamp))}</Text>
                                {!!getGroupNameFromName(pageDate.homeTeam.name) &&
                                    <Text style={styles.dateTimeAndGroupText}>{Strings.Group} {getGroupNameFromName(pageDate.homeTeam.name)}</Text>
                                }
                            </TouchableOpacity>
                            <View style={styles.listItemFlagName}>
                                <Image
                                    source={getTeamFlagFromName(pageDate.awayTeam.name)}
                                    resizeMode='contain'
                                    style={styles.listItemFlagSize}
                                />
                                <Text style={styles.teamNameText}>{pageDate.awayTeam.name}</Text>
                            </View>
                        </View>
                        {!!pageDate.homeTeam.betMultiply &&
                            <View style={styles.betValuesMainView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(true)
                                        setBetData({ ...pageDate, betOn: 1, betMultiuply: (pageDate.homeTeam.betMultiply * 10) })
                                    }}
                                    style={styles.listItemFlagName}>
                                    <Text style={styles.P1}>{Strings.P1}</Text>
                                    <View style={styles.betValueView}>
                                        <Text style={styles.betValue}>{pageDate.homeTeam.betMultiply}x</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(true)
                                        setBetData({ ...pageDate, betOn: 3, betMultiuply: (pageDate.homeTeam.draw * 10) })
                                    }}
                                    style={styles.listItemFlagName}>
                                    <Text style={styles.P1}>X</Text>
                                    <View style={styles.betValueView}>
                                        <Text style={styles.betValue}>{pageDate.homeTeam.draw}x</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModal(true)
                                        setBetData({ ...pageDate, betOn: 2, betMultiuply: (pageDate.awayTeam.betMultiply * 10) })
                                    }}
                                    style={styles.listItemFlagName}>
                                    <Text style={styles.P1}>{Strings.P2}</Text>
                                    <View style={styles.betValueView}>
                                        <Text style={styles.betValue}>{pageDate.awayTeam.betMultiply}x</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    {teamLineUps.map((item: any, index: number) => {
                        return (
                            <View>
                                {'teamData' in item &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            onPressAnyButton()
                                            onTeamLineUpPress(index)
                                        }}
                                        style={[styles.teamLineUp, { borderColor: item.isExpaned ? Config.Theme.COLOR_FONT_ORANGE : Config.Theme.COLOR_WHITE }]}>
                                        <Text style={styles.teamLineUpText}>{item.teamLine}</Text>
                                        <Image
                                            source={item.isExpaned ? Assets.UpArrow : Assets.DownArrow}
                                            resizeMode='contain'
                                            style={styles.teamLineUpImage}
                                        />
                                    </TouchableOpacity>
                                }
                                {item.isExpaned &&
                                    <View style={styles.teamLine}>
                                        <View style={styles.teamLineHeader}>
                                            <View style={styles.teamLineFlex1}>
                                                <Text style={styles.headerText}>{Strings.No}</Text>
                                            </View>
                                            <View style={styles.teamLineFlex2}>
                                                <Text style={styles.headerText}>{Strings.player}</Text>
                                            </View>
                                            <View style={styles.teamLineFlex3}>
                                                <Text style={styles.headerText}>{Strings.Role}</Text>
                                            </View>
                                            <View style={styles.teamLineFlex4}>
                                                <Text style={styles.headerText}>{Strings.DOB}</Text>
                                            </View>
                                            <View style={styles.teamLineFlex5}>
                                                <Text style={styles.headerText}>{Strings.Height}</Text>
                                            </View>
                                        </View>
                                        {item.teamData.map((items: any) => {
                                            return (
                                                <View style={styles.teamLineData}>
                                                    <View style={styles.teamLineFlex1}>
                                                        <Text style={styles.headerText}>{items.player.jerseyNumber}</Text>
                                                    </View>
                                                    <View style={styles.teamLineFlex2}>
                                                        <Image
                                                            source={{ uri: `https://api.sofascore.com/api/v1/player/${items.player.id}/image` }}
                                                            resizeMode={'contain'}
                                                            style={styles.playerImage}
                                                        />
                                                        <Text style={[styles.headerText, { flex: 1, }]} numberOfLines={2}>{items.player.name}</Text>
                                                    </View>
                                                    <View style={styles.teamLineFlex3}>
                                                        <Text style={styles.headerText}>{items.player.position}</Text>
                                                    </View>
                                                    <View style={styles.teamLineFlex4}>
                                                        {!!items.player.dateOfBirthTimestamp ?
                                                            <Text style={styles.headerText}>{moment(convertSecondsToDate(items.player.dateOfBirthTimestamp)).format('DD.MM.YYYY')}</Text>
                                                            :
                                                            <Text style={styles.headerText}>-</Text>
                                                        }

                                                    </View>
                                                    <View style={styles.teamLineFlex5}>
                                                        <Text style={styles.headerText}>{items.player.height}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                }
                            </View>
                        )
                    })}
                </View>
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
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
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
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'space-around',
        // marginHorizontal: Config.Constants.PAGE_HORIZONTAL_MARGIN
    },
    listItemFlagName: {
        alignItems: 'center',
    },
    listItemFlagSize: {
        height: 75,
        width: 75,
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
    teamLineUp: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    teamLineUpText: {
        fontSize: 15
    },
    teamLineUpImage: {
        height: 15,
        width: 15,
    },
    teamLine: {
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 10,
    },
    teamLineHeader: {
        flex: 1,
        // marginTop: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamLineData: {
        flex: 1,
        // marginTop: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    teamLineFlex1: {
        flex: 1,
    },
    teamLineFlex2: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamLineFlex3: {
        flex: 1,
    },
    teamLineFlex4: {
        flex: 2,
    },
    teamLineFlex5: {
        flex: 1,
    },
    headerText: {
        fontSize: 14,
    },
    playerImage: {
        height: 30,
        width: 30,
        marginRight: 5,
        backgroundColor: Config.Theme.COLOR_GRAY
    }
})

export default MatchDetails;