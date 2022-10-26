import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import Config from '../config';


interface CT {
    style?: TextStyle | any[],
    numberOfLines?: number,
    children: React.ReactNode
}

const CustomText = (props: CT) => {

    const { style, numberOfLines = 1 } = props;


    return (
        <Text
            numberOfLines={numberOfLines}
            style={[{
                // fontFamily: Config.Theme.FONT_REGULAR,
                color: Config.Theme.COLOR_WHITE
            }, style]}>
            {props.children}
        </Text>
    )
}

export default CustomText