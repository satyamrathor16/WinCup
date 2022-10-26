import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Vibration } from 'react-native';
import { DrawerHeaderProps } from '@react-navigation/drawer';
import { Text, Header } from '../components'
import Config from '../config'
import Assets from '../assets'
import Strings from '../strings/Strings';
import Store from '../store';
import moment from 'moment'
import Sound from 'react-native-sound';
Sound.setCategory('Playback');

const TournamentTable = ({ navigation }: DrawerHeaderProps) => {
    const VIBRATION_DURATION = 100;
    var click = new Sound('btn_click.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + click.getDuration() + 'number of channels: ' + click.getNumberOfChannels());
    });

    const boxSize = (Config.Constants.SCREEN_WIDTH - Config.Constants.PAGE_HORIZONTAL_MARGIN - 50) / 4;
    const ScreenHeight = Config.Constants.SCREEN_HEIGHT;
    const ScreenWidth = Config.Constants.SCREEN_WIDTH;
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        var matchData: any = [];
        Store.MatchData.map((item: any) => {
            if (item.events.length > 5) {
                item.events.map(items => {
                    matchData.push(items)
                })
            }
        })
        // console.log('matchData', matchData);
        setTableData(matchData)
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
                <Text style={Config.Constants.GLOBAL_STYLE.topLableText}>{Strings.TournamentTable}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {tableData.length > 0 &&
                    <View style={styles.mainBoxView}>
                        {/* First Row Lines */}
                        <View style={[styles.lineStyle, { height: (boxSize / 2) + (ScreenHeight * 0.02), width: (boxSize / 2) + (ScreenHeight * 0.02), borderBottomWidth: 1, borderLeftWidth: 1, top: ScreenHeight * 0.02 + boxSize, left: boxSize / 2 }]} />
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: ScreenHeight * 0.02 + boxSize, left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 1.5 }]} />
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: ScreenHeight * 0.02 + boxSize, left: ((ScreenWidth - 40 - (boxSize * 4)) / 1.5) + boxSize * 2.5 }]} />
                        <View style={[styles.lineStyle, { height: (boxSize / 2) + (ScreenHeight * 0.02), width: (boxSize / 2) + (ScreenHeight * 0.02), borderBottomWidth: 1, borderRightWidth: 1, top: ScreenHeight * 0.02 + boxSize, left: ((ScreenWidth - 40 - (boxSize * 4)) / 2) + boxSize * 3 }]} />

                        {/* Second Row Lines */}
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: ((ScreenHeight * 0.02) * 2) + (boxSize * 2), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 1.75 }]} />
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: ((ScreenHeight * 0.02) * 2) + (boxSize * 2), left: ((ScreenWidth - 40 - (boxSize * 4)) / 1.5) + boxSize * 2.25 }]} />

                        {/* Third Row Lines */}
                        <View style={[styles.lineStyle, { height: 1, width: boxSize, borderBottomWidth: 1, top: ((ScreenHeight * 0.02) * 3) + (boxSize * 2.75), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 0.75 }]} />
                        <View style={[styles.lineStyle, { height: 1, width: boxSize, borderBottomWidth: 1, top: ((ScreenHeight * 0.02) * 3) + (boxSize * 2.75), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 2.25 }]} />
                        <View style={[styles.lineStyle, { height: 1, width: boxSize, borderBottomWidth: 1, top: (((ScreenHeight * 0.02) * 3) + 10) + (boxSize * 3.25), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 0.75 }]} />
                        <View style={[styles.lineStyle, { height: 1, width: boxSize, borderBottomWidth: 1, top: (((ScreenHeight * 0.02) * 3) + 10) + (boxSize * 3.25), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 2.25 }]} />

                        {/* Fourth Row Lines */}
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: (((ScreenHeight * 0.02) * 3) + 10) + (boxSize * 4), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 1.75 }]} />
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: (((ScreenHeight * 0.02) * 3) + 10) + (boxSize * 4), left: ((ScreenWidth - 40 - (boxSize * 4)) / 1.5) + boxSize * 2.25 }]} />

                        {/* Fifth Row Lines */}
                        <View style={[styles.lineStyle, { height: (boxSize / 2) + (ScreenHeight * 0.02), width: (boxSize / 2) + (ScreenHeight * 0.02), borderTopWidth: 1, borderLeftWidth: 1, top: (((ScreenHeight * 0.02) * 4) + 10) + (boxSize * 4.5), left: boxSize / 2 }]} />
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: (((ScreenHeight * 0.02) * 4) + 10) + (boxSize * 5), left: ((ScreenWidth - 40 - (boxSize * 4)) / 3) + boxSize * 1.5 }]} />
                        <View style={[styles.lineStyle, { height: ScreenHeight * 0.02, width: 1, borderLeftWidth: 1, top: (((ScreenHeight * 0.02) * 4) + 10) + (boxSize * 5), left: ((ScreenWidth - 40 - (boxSize * 4)) / 1.5) + boxSize * 2.5 }]} />
                        <View style={[styles.lineStyle, { height: (boxSize / 2) + (ScreenHeight * 0.02), width: (boxSize / 2) + (ScreenHeight * 0.02), borderTopWidth: 1, borderRightWidth: 1, top: (((ScreenHeight * 0.02) * 4) + 10) + (boxSize * 4.5), left: ((ScreenWidth - 40 - (boxSize * 4)) / 2) + boxSize * 3 }]} />

                        <View style={styles.flexRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[0]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[0].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[0].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[0].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[0].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[2]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[2].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[2].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[2].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[2].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[4]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[4].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[4].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[4].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[4].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[6]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[6].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[6].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[6].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[6].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.flexRowSecondRow}>
                            <View style={[styles.boxStyleSecondRow, { height: boxSize, width: boxSize }]}></View>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[8]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[8].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[8].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[8].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[8].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[10]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[10].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[10].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[10].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[10].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <View style={[styles.boxStyleSecondRow, { height: boxSize, width: boxSize }]}></View>
                        </View>


                        <View style={styles.flexRowCenter}>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[14]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[14].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[14].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[14].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[14].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        onPressAnyButton()
                                        navigation.navigate('MatchDetails', {
                                            data: tableData[12]
                                        })
                                    }}
                                    style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                    <View style={styles.boxInnerContentFlagsView}>
                                        <View style={styles.boxInnerContentFlags}>
                                            <Image source={getTeamFlagFromName(tableData[12].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                            <Text style={styles.flagBottomText}>{tableData[12].homeTeam.name}</Text>
                                        </View>
                                        <View style={styles.boxInnerContentFlags}>
                                            <Image source={getTeamFlagFromName(tableData[12].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                            <Text style={styles.flagBottomText}>{tableData[12].awayTeam.name}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.flagBottomScoreText}>0:0</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        onPressAnyButton()
                                        navigation.navigate('MatchDetails', {
                                            data: tableData[13]
                                        })
                                    }}
                                    style={[styles.boxStyle, { height: boxSize, width: boxSize, marginTop: 10 }]}>
                                    <View style={styles.boxInnerContentFlagsView}>
                                        <View style={styles.boxInnerContentFlags}>
                                            <Image source={getTeamFlagFromName(tableData[13].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                            <Text style={styles.flagBottomText}>{tableData[13].homeTeam.name}</Text>
                                        </View>
                                        <View style={styles.boxInnerContentFlags}>
                                            <Image source={getTeamFlagFromName(tableData[13].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                            <Text style={styles.flagBottomText}>{tableData[13].awayTeam.name}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.flagBottomScoreText}>0:0</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[15]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[15].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[15].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[15].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[15].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.flexRowSecondRow}>
                            <View style={[styles.boxStyleSecondRow, { height: boxSize, width: boxSize }]}></View>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[9]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[9].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[9].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[9].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[9].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[11]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[11].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[11].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[11].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[11].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <View style={[styles.boxStyleSecondRow, { height: boxSize, width: boxSize }]}></View>
                        </View>


                        <View style={styles.flexRow}>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[1]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[1].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[1].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[1].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[1].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[3]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[3].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[3].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[3].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[3].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[5]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[5].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[5].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[5].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[5].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    onPressAnyButton()
                                    navigation.navigate('MatchDetails', {
                                        data: tableData[7]
                                    })
                                }}
                                style={[styles.boxStyle, { height: boxSize, width: boxSize }]}>
                                <View style={styles.boxInnerContentFlagsView}>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[7].homeTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[7].homeTeam.name}</Text>
                                    </View>
                                    <View style={styles.boxInnerContentFlags}>
                                        <Image source={getTeamFlagFromName(tableData[7].awayTeam.name)} style={{ height: boxSize * 0.30, width: boxSize * 0.35, backgroundColor: Config.Theme.COLOR_DARK_GRAY }} resizeMode='cover' />
                                        <Text style={styles.flagBottomText}>{tableData[7].awayTeam.name}</Text>
                                    </View>
                                </View>
                                <Text style={styles.flagBottomScoreText}>0:0</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND
    },
    boxStyle: {
        borderColor: Config.Theme.COLOR_FONT_ORANGE,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND,
        justifyContent: 'center',
        // alignItems: 'center',
        // marginRight: 10
    },
    boxStyleSecondRow: {
        borderColor: Config.Theme.COLOR_FONT_ORANGE,
        borderRadius: 6,
        // borderWidth: 1,
        // marginRight: 10
    },
    mainBoxView: {
        // flex: 1,
        marginHorizontal: Config.Constants.PAGE_HORIZONTAL_MARGIN
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Config.Constants.SCREEN_HEIGHT * 0.02,
        alignItems: 'center',
    },
    flexRowSecondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Config.Constants.SCREEN_HEIGHT * 0.02,
        alignItems: 'center',
    },
    flexRowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Config.Constants.SCREEN_HEIGHT * 0.02,
        alignItems: 'center',
    },
    lineStyle: {
        borderColor: Config.Theme.COLOR_FONT_ORANGE,
        position: 'absolute',
    },
    boxInnerContentFlagsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    boxInnerContentFlags: {
        alignItems: 'center'
    },
    flagBottomText: {
        fontWeight: 'bold'
    },
    flagBottomScoreText: {
        fontWeight: 'bold',
        alignSelf: 'center',
    }


})

export default TournamentTable;