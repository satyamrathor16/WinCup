import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageStyle, TextStyle, ViewStyle, ImageSourcePropType } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Text from './Text'
import Config from '../config'
import Assets from '../assets';

interface HeaderProps {
    title?: string;
    imageStyle?: ImageStyle,
    titleStyles?: TextStyle,
    leftButtonPress?: () => void,
    showRightButton?: boolean,
    showLeftButton?: boolean,
    rightButtonPress?: () => void,
    centerImagePress?: () => void,
    mainContainer?: ViewStyle,
    statusBarContainerStyle?: ViewStyle,
    contentContainerStyle?: ViewStyle,
    centerImage?: ImageSourcePropType,
    leftImage?: ImageSourcePropType,
    rightImage?: ImageSourcePropType,
    showNotificationCount?: boolean,
}

const Header = (props: HeaderProps) => {

    const {
        title,
        imageStyle,
        titleStyles,
        leftButtonPress,
        showRightButton = false,
        showLeftButton = true,
        rightButtonPress,
        mainContainer,
        statusBarContainerStyle,
        contentContainerStyle,
        centerImage,
        leftImage,
        rightImage,
        showNotificationCount = true,
        centerImagePress
    } = props;


    return (
        <View style={[styles.container, mainContainer]}>
            <View style={[styles.statusBarContainer, statusBarContainerStyle]} />
            <View style={[styles.contentContainer, contentContainerStyle]}>
                {showLeftButton ?
                    <TouchableOpacity style={styles.imageButtonStyle} onPress={leftButtonPress}>
                        {leftImage ?
                            <Image source={leftImage} resizeMode='contain' style={[styles.leftImageStyle, imageStyle]} />
                            :
                            <Image source={Assets.HorizonLine} resizeMode='contain' style={[styles.leftImageStyle, imageStyle]} />
                        }
                    </TouchableOpacity>
                    :
                    <View style={styles.flexStyle} />
                }

                {/* {centerImage ? */}
                <View style={styles.centerImageContainer}>
                    <TouchableOpacity onPress={centerImagePress}>
                        <Image
                            source={Assets.AppLogo}
                            resizeMode='contain'
                            style={styles.centerImage}
                        />
                    </TouchableOpacity>
                </View>
                {/* :
                    <Text numberOfLines={1} style={[styles.titleStyle, titleStyles]}>{title}</Text>
                } */}

                {showRightButton ?
                    <TouchableOpacity style={styles.imageRightButtonStyle} onPress={rightButtonPress}>
                        {rightImage ?
                            <View style={[styles.rightImageStyles]}>
                                <Image source={rightImage} style={[styles.rightImageStyles, imageStyle]} />
                                {/* {!!unreadCount &&
                                    <View style={styles.iconBadge}>
                                        <Text style={styles.listItemMessageCount}>{unreadCount}</Text>
                                    </View>
                                } */}

                            </View>
                            :
                            <Image source={Assets.HorizonLine} style={[styles.rightImageStyles, imageStyle]} />
                        }
                    </TouchableOpacity>
                    :
                    <View style={styles.flexStyle}></View>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Config.Constants.SCREEN_WIDTH,
    },
    statusBarContainer: {
        width: Config.Constants.SCREEN_WIDTH,
        height: getStatusBarHeight(),
        backgroundColor: Config.Theme.COLOR_BACKGROUND,
    },
    contentContainer: {
        flexDirection: 'row',
        height: 50,
        width: Config.Constants.SCREEN_WIDTH,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: Config.Theme.COLOR_BACKGROUND,
    },
    leftImageStyle: {
        height: 25,
        width: 25,
    },
    rightImageStyles: {
        height: 25,
        width: 25,
    },
    titleStyle: {
        flex: 10,
        fontSize: 18,
        // fontFamily: 
        textAlign: 'center',
    },
    imageButtonStyle: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imageRightButtonStyle: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    centerImage: {
        height: 50,
        width: 150,
    },
    centerImageContainer: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexStyle: {
        flex: 1,
    },
    // iconBadge: {
    //     minHeight: 14,
    //     minWidth: 14,
    //     backgroundColor: Config.Theme.COLOR_ACCENT,
    //     borderRadius: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingHorizontal: 4,
    //     position: 'absolute',
    //     right: -5,
    //     top: 0
    // },
    listItemMessageCount: {
        fontSize: 8,
        color: Config.Theme.COLOR_WHITE
    },

})

export default Header;