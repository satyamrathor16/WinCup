import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import Config from '../config/index'
const Container = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor={Config.Theme.COLOR_TRANSPARENT} />
            {props.children}
        </View>
    );
}

export default Container;