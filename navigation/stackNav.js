import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from '../screens/map';
import Booking from '../screens/booking';

const Stack = createNativeStackNavigator();

export default class StackNav extends React.Component {
    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Map">
                    <Stack.Screen name="Map" component={Map} options={{headerShown: true, headerTitle:'TruckHub Locations'}}/>
                    <Stack.Screen name="Booking" component={Booking} options={{headerShown: false, gestureEnabled: false}} initialParams={{item: []}} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
