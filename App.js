import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React , { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ingresos from './src/component/Ingresos'; // Importa el archivo Ingresos.js
import Egresos from './src/component/Egresos';
import Grafica from './src/component/Graficas'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormularioIngreso">
        <Stack.Screen
          name="FormularioIngreso"
          component={Ingresos} // Usa el componente Ingresos
          options={{ title: 'Ingresos' }}
        />
        <Stack.Screen
        name="FormularioEgresos"
        component={Egresos} // Usa el componente Egresos
        options={{ title: 'Egresos' }}
        />
        <Stack.Screen
          name="Grafica"
          component={Grafica} // Usa el componente Grafica
          options={{ title: 'Gráficas' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}