/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeAppEventEmmiter,
  TouchableHighlight
} from 'react-native';

const audio = require('react-native').NativeModules.RNAudioPlayerURL;

class audioPlayerTestApplication extends Component {
  constructor(props){
    super(props);
    this.state = {
      duration: "00:00",
      clip: ""
    }
  }
  initAudioClip(){
    var clip = "http://www.noiseaddicts.com/samples_1w72b820/2537.mp3"; //Anchors Aweigh
    audio.initWithURL(clip); //Initialize audio instance with the mp3 url
    this.setState({duration: "Loading..."});
    audio.getDuration((duration) => {
      var minutes = Math.floor(duration/60);
      var seconds = Math.ceil((duration/60 - minutes) * 60);
      var duration = minutes + ":" + seconds;
      this.setState({duration: duration});
    })
    this.setState({clip: clip});
  }
  playAudioClip(){
    if(this.state.clip !== ""){
      audio.play();
    }
  }
  pauseAudioClip(){
    if(this.state.clip !== ""){
      audio.pause();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableHighlight style={styles.loadButton} onPress={this.initAudioClip.bind(this)} underlayColor="#d96040">
          <Text>Load Audio Clip</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.playButton} onPress={this.playAudioClip.bind(this)} underlayColor="#739725">
          <Text>Play</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.pauseButton} onPress={this.pauseAudioClip.bind(this)} underlayColor="#E0B32B">
          <Text>Pause</Text>
        </TouchableHighlight>
        <Text style={{marginTop: 20}}>Duration = {this.state.duration}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadButton: {
    height: 40,
    width: 150,
    backgroundColor: '#d96040',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  playButton: {
    height: 40,
    width: 100,
    backgroundColor: '#739725',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pauseButton: {
    height: 40,
    width: 100,
    backgroundColor: '#E0B32B',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('audioPlayerTestApplication', () => audioPlayerTestApplication);
