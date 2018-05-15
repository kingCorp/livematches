/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import axios from 'axios';


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      home: "",
      away: "",
      score: "",
      status: "",
      payloads:[]
    };
  }

  async componentDidMount() {
    alert("Live scores are loading please wait....");
    let url = 'http://livescore-api.com/api-client/scores/live.json?key=blHkxnpAKrWVulFr&secret=uxf6ZrUGWJXi9YKkksFSQ5tAxpv1Latf'
    try {
      const scores = await axios.get(url)

      for (let i = 0; i < scores.data.data.match.length; i++) {
        console.log(scores.data.data.match);
        // console.log(scores.data.data.match[i].away_name);
        // console.log(scores.data.data.match[i].status);
        // console.log(scores.data.data.match[i].score);
        // this.setState({ home: scores.data.data.match[i].home_name });
        // this.setState({ away: scores.data.data.match[i].away_name });
        // this.setState({ status: scores.data.data.match[i].status });
        // this.setState({ score: scores.data.data.match[i].score });
        this.setState({payloads:  scores.data.data.match})
      }

    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let livematches = this.state.payloads.map((payload, index) => 
    ( 
        <View style={styles.container}>
        <Text style={styles.txt}>Home team: {payload.home_name}</Text>
        <Text style={styles.txt}>Away team: {payload.away_name}</Text>
        <Text style={styles.txt}>Scores:    {payload.score}</Text>
        <Text style={styles.txt}>Status:    {payload.status}</Text>
      </View>
    ))
    return (
      <ScrollView style={{backgroundColor: '#9E9E9E',}}>
        {livematches}
        <Button
          onPress={()=> {this.componentDidMount()}}
          title="Refresh"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#424242',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    padding: 7
  },
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  }
});
