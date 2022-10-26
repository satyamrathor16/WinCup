import React, { useState } from 'react';
import { View, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text'
import Config from '../config'
import Strings from '../strings/Strings';
interface BetPopupInputProps {
    onChangeText?: () => void;
    modalVisible: boolean;
    closeModal?: () => void;
    availableBalance: number;
    onBetPress?: (betAmount: string) => void;
}

const BetPopupInput = (props: BetPopupInputProps) => {

    const {
        onChangeText,
        modalVisible,
        closeModal,
        availableBalance,
        onBetPress
    } = props;

    const [onTextChange, setOnTextChange] = useState('')

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontSize: 15, marginBottom: 10 }}>{Strings.availableBalance}: {availableBalance} </Text>
                    <TextInput
                        placeholder={Strings.betAmount}
                        placeholderTextColor={Config.Theme.COLOR_WHITE}
                        style={styles.textInputStyle}
                        onChangeText={(text) => {
                            setOnTextChange(text)
                        }}
                        keyboardType={'numeric'}
                    />
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={closeModal}>
                            <Text style={styles.buttonText}>{Strings.close}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => {

                            onBetPress(onTextChange)
                        }}>
                            <Text style={styles.buttonText}>{Strings.bet}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: Config.Theme.COLOR_DRAWER_BACKGROUND,
        width: '80%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 8

    },
    textInputStyle: {
        borderWidth: 1,
        backgroundColor: Config.Theme.COLOR_BACKGROUND,
        borderColor: Config.Theme.COLOR_FONT_ORANGE,
        color: Config.Theme.COLOR_WHITE,
        borderRadius: 8,
        paddingHorizontal: 10
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    buttonStyle: {
        width: 100,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Config.Theme.COLOR_FONT_ORANGE,
        marginTop: 10
    },
    buttonText: {
        fontSize: 17,
        color: Config.Theme.COLOR_FONT_ORANGE
    }
})

export default BetPopupInput;