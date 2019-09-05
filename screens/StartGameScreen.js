import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Keyboard, Image } from 'react-native';
import colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

class StartGameScreen extends Component {
    state = {
        inputNumber: '',
        confirmed: false,
        selectedNumber: 0
    }
    inputHandler = text => {
        this.setState({
            inputNumber: text.replace(/[^0-9]/g, '')
        });
    }
    resetInput = () => {
        this.setState({inputNumber:'', confirmed:false});
    }
    confirmInput = () => {
        const selectedNumber = parseInt(this.state.inputNumber);
        if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be between 1 and 99',
                [{text: 'Okay', style: 'destructive', onPress: this.resetInput}]
            );
            return;
        }
        Keyboard.dismiss();
        this.setState({confirmed:true, inputNumber: '', selectedNumber});
    }
    
    render () {
        if (this.state.confirmed) {
            var confirmedOutput = 
            <View style={Styles.inputContainer}>
                <BodyText>You selected</BodyText>
                <View>
                    <TitleText style={Styles.selectedNum}>{this.state.selectedNumber}</TitleText>
                    <Button title="START GAME" onPress={() => this.props.startGame(this.state.selectedNumber)}/>
                </View>
            </View>
        }
        return (
            <View style={Styles.container}> 
                <Image resizeMode="contain" style={Styles.image} source={{uri: 'https://pbs.twimg.com/profile_images/950702140359630849/h84XsE4p_400x400.jpg'}}/>
                <TitleText style={Styles.title}>Start a New Game!</TitleText>
                <View style={Styles.inputContainer}>
                    <BodyText>Input a number</BodyText>
                    <TextInput onChangeText={this.inputHandler} value={this.state.inputNumber} placeholder="E.g: 27" style={Styles.input} blurOnSubmit keyboardType="number-pad" maxLength={2} autoCapitalize="none" />
                    <View style={Styles.buttonsContainer}>
                        <View style={Styles.button}>
                            <Button title="Reset" color="grey" onPress={this.resetInput}/>
                        </View>
                        <View style={Styles.button}>
                            <Button color={colors.primary} title="Confirm" onPress={this.confirmInput}/>
                        </View>    
                    </View>
                </View>
                {confirmedOutput}
            </View> 
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginVertical: 20
    },
    input: {
        borderWidth: 1, 
        borderColor: 'lightgrey', 
        borderRadius: 4, 
        padding: 5,
        width: '80%',
        marginVertical: 12,
        textAlign: 'center'
    },
    image: {
        width: '20%',
        height: 80,
        marginVertical: 15
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    button: {
        width: 115
    },
    inputContainer: {
        width: 400,
        maxWidth: '90%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.26,
        elevation: 5,
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginVertical: 20
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    selectedNum: {
        fontSize: 30,
        marginVertical: 10,
        textAlign: 'center',
        borderColor: colors.primary,
        color: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        padding: 6
    }
});

export default StartGameScreen;