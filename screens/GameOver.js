import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/colors';

const GameOver = props => {
    return (
        <View style={Styles.container}>
            <Image style={Styles.image} resizeMode="contain" source={require('../assets/success.png')}/>
            <TitleText style={{
                fontSize: 28,
                fontWeight: 'bold'
            }}>Game Over!</TitleText>
            <BodyText style={{
                textAlign: 'center'
            }}>It took the computer {props.takes} turns to guess</BodyText>
            <TitleText style={{  
                fontSize: 35,
                fontWeight: 'bold'
            }}>{props.selectedNum}</TitleText>

            <View style={Styles.resetBtn}>
                <Button color={colors.primary} title="Reset" onPress={props.newGame}/>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '45%',
        height: 150,
        marginVertical: 20
    },
    resetBtn: {
        marginVertical: 20,
        width: 250,
        padding: 8
    }
});

export default GameOver;