import { Dimensions, StyleSheet } from 'react-native'
import Theme from './Theme';
const globalStyles = StyleSheet.create({
    topLabel: {
        height: 34,
        width: '100%',
        backgroundColor: Theme.COLOR_FONT_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    topLableText: {
        fontSize: 20
    },
})

export default {
    SCREEN_WIDTH: Dimensions.get('screen').width,
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    PAGE_HORIZONTAL_MARGIN: 20,
    GLOBAL_STYLE: globalStyles
}