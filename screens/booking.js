import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { VStack, Input, Slider, NativeBaseProvider, Heading } from 'native-base';
import db from '../config'

export default class BookingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      item: this.props.route.params.item,
    }
  }

  getLocations = async () => {
    await db.collection("truck-stops").get()
    .then(snapshot => {
      console.log('1')
      snapshot.forEach(doc => {
        this.setState({
          locations: [...this.state.locations, doc.data()]
        })
      })
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
    console.log(this.state.locations)
  }

  async componentDidMount() {
    console.log('Component Mounted')
    console.log(this.state.item)
    await this.getLocations()
  }


  render() {
    return (
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <VStack safeArea paddingLeft={5}>
          <Heading>Book A Room</Heading>
          <Heading size='sm'>at {item} truck stop</Heading>
          <Slider />
        </VStack>
      </NativeBaseProvider>
    )}
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        map: {
          ...StyleSheet.absoluteFillObject,
},
});