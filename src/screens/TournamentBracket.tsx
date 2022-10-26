import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Vibration } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import Components, { Text, Header } from '../components'
import Config from '../config'
import Assets from '../assets'
import Store from '../store'
import Strings from '../strings/Strings';
import moment from 'moment'
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const TournamentBracket = ({ navigation }: DrawerHeaderProps) => {
    const VIBRATION_DURATION = 100;
    var click = new Sound('btn_click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
    });

    const [groupData, setGroupData] = useState([
        { group_name: 'A', isSelected: true },
        { group_name: 'B', isSelected: false },
        { group_name: 'C', isSelected: false },
        { group_name: 'D', isSelected: false },
        { group_name: 'E', isSelected: false },
        { group_name: 'F', isSelected: false },
        { group_name: 'G', isSelected: false },
        { group_name: 'H', isSelected: false },
    ])
    const [mainData, setMainData] = useState<any>({})
    useEffect(() => {
        setDataOfTeam('A')
    }, [])

    const setDataOfTeam = (group_name) => {
        var teamData: any = {};
        var matchData: any = [];
        Store.MatchData.map((item: any) => {
            var tempGroup = item.tournament.name.split(",");
            var group = tempGroup[1].trim().split(" ");
            if (group[1] == group_name) {
                item.events.map(items => {
                    matchData.push(items)
                })
            }
        })
        // console.log('matchData', matchData);
        Store.TeamsData.map((item: any) => {
            var group = item.name.split(" ");
            if (group[1] == group_name) {
                teamData = item;
            }
        })
        var teamWithflag = teamData.tableRows;
        teamWithflag = teamWithflag.map((item: any, index: number) => {
            var teamName = item.team.name;
            var teamDataFlag = {}
            var matchDataOfTeam = []
            var matchDataOfTeaminOrder = []
            Config.Teams.map((items: any) => {
                if (teamName == items.name) {
                    item.team.flag = items.flag;
                    teamDataFlag = item;
                }
            })
            matchData.map((items1: any) => {
                if (items1.awayTeam.name == item.team.name || items1.homeTeam.name == item.team.name) {
                    matchDataOfTeam.push(items1)
                }
            })
            teamWithflag.map((items2: any, index1: number) => {
                if (index != index1) {
                    var teamName1 = items2.team.name;
                    matchDataOfTeam.map((items3: any) => {
                        if (items3.awayTeam.name == teamName1 || items3.homeTeam.name == teamName1) {
                            matchDataOfTeaminOrder.push(items3)
                        }
                    })
                }
            })
            matchDataOfTeaminOrder.splice(index, 0, 'null');
            teamDataFlag.matches = matchDataOfTeaminOrder;
            teamDataFlag.group_name = group_name;
            return teamDataFlag;
        })

        console.log('teamWithflag', JSON.stringify(teamWithflag));
        setMainData({ teams: teamWithflag })
    }


    const onGroupChange = (data) => {
        setGroupData(
            groupData.map((item: any) => {
                if (item.group_name == data.group_name) {
                    item.isSelected = true
                } else {
                    item.isSelected = false
                }
                return item;
            })
        )
    }

    const renderGroupItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onPressAnyButton()
                    onGroupChange(item)
                    setDataOfTeam(item.group_name)
                }}
                style={[styles.groupItem, { borderWidth: 2, borderColor: item.isSelected ? Config.Theme.COLOR_FONT_ORANGE : Config.Theme.COLOR_BACKGROUND }]}>
                <Text style={[styles.groupItemText, { color: item.isSelected ? Config.Theme.COLOR_FONT_ORANGE : Config.Theme.COLOR_WHITE }]}>{item.group_name}</Text>
            </TouchableOpacity>
        )
    }

    const convertSecondsToDate = (seconds) => {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(seconds);
        // console.log(t.toString());
        return t;
    }

    const onMatchDatePress = (data: any) => {
        navigation.navigate('MatchDetails', {
            data: data
        })
        // console.log(JSON.stringify(data));
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
            />
            <View style={styles.groupMainView}>
                <Text style={styles.groupText}>{Strings.Group}: </Text>
                <FlatList
                    data={groupData}
                    horizontal
                    renderItem={renderGroupItem}
                    keyExtractor={item => item.group_name}
                />
            </View>
            <View style={styles.bottomImageView}>
                <Image
                    source={Assets.HalfFootball}
                    resizeMode='cover'
                    style={styles.bottomImage}
                />
            </View>
            {'teams' in mainData &&

                <View style={styles.gridView}>
                    <View style={styles.gridRow}>
                        <View style={[styles.nameFlag, { borderColor: Config.Theme.COLOR_WHITE }]}>
                            {/* <Image
                            source={Assets.FlagDemo}
                            resizeMode='contain'
                            style={{ height: 40, width: 40, marginRight: 10 }}
                        />
                        <Text>Ecuador</Text> */}
                        </View>
                        <View style={[styles.date, styles.gridHeaderFlag]}>
                            <Image
                                source={mainData.teams[0].team.flag}
                                resizeMode='contain'
                                style={{ height: 40, width: 40 }}
                            />
                        </View>
                        <View style={[styles.date, styles.gridHeaderFlag]}>
                            <Image
                                source={mainData.teams[1].team.flag}
                                resizeMode='contain'
                                style={{ height: 40, width: 40 }}
                            />
                        </View>
                        <View style={[styles.date, styles.gridHeaderFlag]}>
                            <Image
                                source={mainData.teams[2].team.flag}
                                resizeMode='contain'
                                style={{ height: 40, width: 40 }}
                            />
                        </View>
                        <View style={[styles.date, styles.gridHeaderFlag]}>
                            <Image
                                source={mainData.teams[3].team.flag}
                                resizeMode='contain'
                                style={{ height: 40, width: 40 }}
                            />
                        </View>
                    </View>
                    {mainData.teams.map((item, index) => {
                        return (
                            <View style={styles.gridRow} key={item.team.name}>
                                <View style={[styles.nameFlag, { borderBottomWidth: 1, borderColor: Config.Theme.COLOR_WHITE }]}>
                                    <Image
                                        source={item.team.flag}
                                        resizeMode='contain'
                                        style={{ height: 40, width: 40, marginRight: 10 }}
                                    />
                                    <Text>{item.team.name}</Text>
                                </View>
                                {item.matches.map(items => {
                                    return (
                                        <View style={[styles.date, { borderWidth: 1, borderColor: Config.Theme.COLOR_WHITE }]}>
                                            {items == 'null' ?
                                                <View style={[styles.gridItemHeightWidth, styles.gridBlankColomn]} />
                                                :
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        onPressAnyButton()
                                                        onMatchDatePress({ ...items, group_name: item.group_name });
                                                    }}
                                                    style={[styles.gridItemHeightWidth, styles.gridDateColomn]}>
                                                    <Text>{moment(convertSecondsToDate(items.startTimestamp)).format('DD.MM')}</Text>
                                                </TouchableOpacity>
                                            }

                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
    },
    groupMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Config.Constants.PAGE_HORIZONTAL_MARGIN,
        marginTop: 20
    },
    groupText: {
        fontSize: 20,
    },
    groupItemText: {
        fontSize: 25,
    },
    groupItem: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        // paddingVertical: ,
        paddingBottom: 3,
        borderRadius: 8
    },
    gridRow: {
        flexDirection: 'row',
        width: '100%',
    },
    gridView: {
        width: '92%',
        alignSelf: 'center',
        marginTop: '20%'
        // marginHorizontal: Config.Constants.PAGE_HORIZONTAL_MARGIN
    },
    nameFlag: {
        flex: 3,
        paddingVertical: 3,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        flex: 1,
        paddingVertical: 3,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridHeaderFlag: {
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: Config.Theme.COLOR_WHITE
    },
    gridItemHeightWidth: {
        height: 40,
        width: 40,
    },
    gridBlankColomn: {
        backgroundColor: Config.Theme.COLOR_DARK_GRAY,
        borderRadius: 6
    },
    gridDateColomn: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Config.Theme.COLOR_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImageView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '30%',
        // backgroundColor:Config.Theme.COLOR_WHITE
    },
    bottomImage: {
        width: '100%',
        height: '100%'
    },
})

export default TournamentBracket;