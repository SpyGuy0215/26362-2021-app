import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import db from '../config'

export default class MapScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      userLocation: [],
      locationAndMarker: []
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

  goToBookingScreen = (item) => {
    console.log('Going to Booking screen...')
    this.props.navigation.navigate('Booking', {item})
  }

  makeMarkers = (item,index) => {
    console.log('location is: ' + item.location.latitude)
    return(
      <Marker
      key={index}
      coordinate={{
        latitude: item.location.latitude,
        longitude: item.location.longitude
      }}
      title={item.slots}
      tappable={true}
      onPress={this.goToBookingScreen}
      />
    )
  }

  async componentDidMount() {
    console.log('Component Mounted')
    await this.getLocations()
  }


  render() {
    return (
      <View>
          <MapView  
            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
            rotateEnabled={false}
            showsMyLocationButton={true}
          >
            {this.state.locations.map((item, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude
                }}
                title={item.slots}
                >
                <MapView.Callout  onPress={() => {this.goToBookingScreen(item)}}>
                    <TouchableHighlight>
                      <Text>Book Now</Text>
                    </TouchableHighlight>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>
      </View>
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