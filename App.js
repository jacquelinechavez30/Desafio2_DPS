
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import React , { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stackdatos from './src/screens/Stackdatos';
import Productoofertas from './src/screens/Productoofertas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();

export default function App() {
  
  return (

      <View style={{ flex: 1 }}>

      <StatusBar
        barStyle="dark-content" 
        backgroundColor="#0000Ff" 
      />

    <NavigationContainer>
      <Tab.Navigator  initialRouteName="Productoofertas">
        <Tab.Screen name="Stackdatos" component={Stackdatos} options={{ title: 'Datos del Cliente' }} />
        <Tab.Screen name="Productoofertas" component={Productoofertas} options={{ title: 'Productos y Ofertas' }} />
      </Tab.Navigator>
    </NavigationContainer>

    </View>

  );
}