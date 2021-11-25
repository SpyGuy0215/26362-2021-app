import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { VStack, Input, NativeBaseProvider, Heading, Box, Button } from 'native-base';
import {Slider} from '@miblanchard/react-native-slider'
import DateTimePicker from '@react-native-community/datetimepicker';
import db from '../config'

export default class BookingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      time: new Date(1637390311000),
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
        <VStack safeArea>
          <Heading alignSelf='center'>Book A Spot</Heading>
          <Heading size='sm' alignSelf='center'>San Francisco TruckHub</Heading>
          <Input placeholder='Name' marginX='10%' marginTop='5%'/>
          <Box width='80%' paddingTop='10%' alignSelf='center'>
            <Heading alignSelf='center' size='sm'>Time: 5 Hours</Heading>
            <Slider
            maximumValue={13}
            minimumValue={1}
            value={5}
            step={1}
            />
          </Box>
          <Box paddingRight='34%' width='100%' paddingTop='5%'>
            <DateTimePicker 
            style={{width :'100%', alignSelf: 'center'}}
            value={this.state.time}/>
          </Box>
          <Button marginX='10%' height='15%' marginTop='10%'>
            <Text style={{fontSize:20}}>Book Now!</Text>
          </Button>
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