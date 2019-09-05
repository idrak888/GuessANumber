import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default class App extends Component {
  state = {
    selectedNum: '',
    guessCount: 0,
    dataLoaded: false
  }
  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });

    this.setState({dataLoaded:true});
  }

  startGame = selectedNum => {
    this.setState({selectedNum});
  }
  gameOverHander = rounds => {
    this.setState({guessCount:rounds});
  }
  newGame = () => {
    this.setState({selectedNum: '', guessCount: 0});
    content = <StartGameScreen startGame={this.startGame}/>;
  }
  render () {
    var content = '';
    var header = '';

    if (this.state.dataLoaded) {
      header = <Header title="Guess A Number"/>

      content = <StartGameScreen startGame={this.startGame}/>
    
      if (this.state.selectedNum != '' && this.state.guessCount == 0) {
        content = <GameScreen onGameOver={this.gameOverHander} selectedNum={this.state.selectedNum}/>
      } else if (this.state.guessCount !== 0) {
        content = <GameOver newGame={this.newGame} selectedNum={this.state.selectedNum} takes={this.state.guessCount}/>
      }
    } else {
      header = <Text></Text>
      content = <Text></Text>
    }
    return (
        <View style={styles.container}>
          {header}
          {content}
        </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
