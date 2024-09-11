import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React , { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stackdatos from './src/screens/Stackdatos';
import Productoofertas from './src/screens/Productoofertas';
import { IngresosProvider } from './src/screens/IngresosContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
const Tab= createBottomTabNavigator();

export default function App() {
  return (

   <IngresosProvider>
     <NavigationContainer>
      <Tab.Navigator  initialRouteName="Productoofertas">
        <Tab.Screen name="Stackdatos" component={Stackdatos} options={{ title: 'Datos del Cliente' }} />
        <Tab.Screen name="Productoofertas" component={Productoofertas} options={{ title: 'Productos y Ofertas' }} />
      </Tab.Navigator>
    </NavigationContainer>
   </IngresosProvider>
  );
}