
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import React , { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stackdatos from './src/screens/Stackdatos';
import Productoofertas from './src/screens/Productoofertas';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export default function App() {
  
  const styles = StyleSheet.create({
    tabBarLabel: {
      fontSize: 11,
      color: '#fff',
    },
    tabBar: {
      backgroundColor: '#002d70',
    },
    tabBarIcon: {
      color: '#fff',
      size: 10,
    },
  });

  return (

      <View style={{ flex: 1 }}>

      <StatusBar
        barStyle="dark-content" 
        backgroundColor="#0d6efd" 
      />

    <NavigationContainer>

      <Tab.Navigator
      initialRouteName="Stackdatos"
      screenOptions={{
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#feffff'}}>
        
        <Tab.Screen
        name="Stackdatos" 
        component={Stackdatos} 
        options={{ 
          title: 'Datos del Cliente',
          tabBarIcon: ({ color, size }) => (<Icon name="archive" color={color} size={size}/>) }} />
        
        <Tab.Screen 
        name="Productoofertas" 
        component={Productoofertas} 
        options={{ 
          title: 'Productos y Ofertas',
          tabBarIcon: ({ color, size, }) => (<Icon name="gift" color={color} size={size} />) }} />

      </Tab.Navigator>
    </NavigationContainer>

    </View>

  );
}