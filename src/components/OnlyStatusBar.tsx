import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheet';

import Config from '../config'

interface StatusBarProps {
    backgroundColor?: ColorValue
}

const OnlyStatusBar = (props: StatusBarProps) => {

    const { backgroundColor = Config.Theme.COLOR_TRANSPARENT } = props

    return (
        <View style={[styles.main, { backgroundColor: backgroundColor }]} />

    );
}

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: getStatusBarHeight(),

    }
})

export default OnlyStatusBar;