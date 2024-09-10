import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React , { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stackdatos from './src/screens/Stackdatos';
import Productoofertas from './src/screens/Productoofertas';
const Tab= createBottomTabNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator  initialRouteName="Productoofertas">
        <Tab.Screen name="Stackdatos" component={Stackdatos} options={{ title: 'Datos del Cliente' }} />
        <Tab.Screen name="Productoofertas" component={Productoofertas} options={{ title: 'Productos y Ofertas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}