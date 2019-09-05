import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; 
import colors from '../constants/colors';

const Header = props => {
    return (
        <View style={Styles.header}>
            <Text style={Styles.title}>{props.title}</Text>
        </View>
    )
}

const Styles =StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;