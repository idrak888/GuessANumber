import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import colors from '../constants/colors';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

class GameScreen extends Component {
    state = {
        currentGuess: '',
        currentLow: 0,
        currentHigh: 100,
        guessCount: 0
    }
    componentDidMount() {
        this.setState({currentGuess:this.generateRandomNum(1, 100, this.props.selectedNum)});
    }
    generateRandomNum = (min, max, exclude) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min)) + min;
        if (random == exclude) {
            return this.generateRandomNum(min, max, exclude);
        } else {
            return random;
        }
    }
    nextGuess = hint => {
        if ((hint === 'lower' && this.state.currentGuess < this.props.selectedNum) || (hint === 'greater' && this.state.currentGuess > this.props.selectedNum)) {
           Alert.alert("Don't lie!", 'No cheating', [{text: 'Sorry', style: 'cancel'}]); 
        } else {
            if (hint === 'lower') {
                this.state.currentHigh = this.state.currentGuess;
            } else if (hint === 'greater') {
                this.state.currentLow = this.state.currentGuess;
            }
            const nextNumber = this.generateRandomNum(this.state.currentLow, this.state.currentHigh, this.state.currentGuess);
            this.setState({currentGuess:nextNumber, guessCount:this.state.guessCount+1});
            this.onNewGuess(nextNumber);
        }
    }

    onNewGuess = guess => {
        if (guess == this.props.selectedNum) {
            this.props.onGameOver(this.state.guessCount);
        }
    }
    render () {
        return (
            <View style={Styles.container}>
                <BodyText>Opponent's guess</BodyText>
                <View style={Styles.inputContainer}>
                    <TitleText style={Styles.number}>{this.state.currentGuess}</TitleText>
                    <View style={Styles.buttonsContainer}>
                        <View style={Styles.button}>
                            <Button color={colors.primary} title="Lower" onPress={this.nextGuess.bind(this, 'lower')}/>
                        </View>
                        <View style={Styles.button}>
                            <Button color={colors.primary} title="Greater" onPress={this.nextGuess.bind(this, 'greater')}/>
                        </View>
                    </View>
                </View>   
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginVertical: 30
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
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
    number: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
        borderColor: colors.primary,
        color: colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        padding: 6
    },
    button: {
        width: 115,
        borderRadius: 5
    }
});

export default GameScreen;