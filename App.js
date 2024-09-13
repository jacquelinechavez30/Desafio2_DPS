
import { StyleSheet, Text, StatusBar, View } from 'react-native';
import React , { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stackdatos from './src/screens/Stackdatos';
import Productoofertas from './src/screens/Productoofertas';

//import AsyncStorage from '@react-native-async-storage/async-storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();

export default function App() {

  //const [datos, setDatos] = useState([]);

  //se ocupa para cargar los datos del storage
  /*useEffect(() => {
    const obtenerDatosStorage = async () => {
      try {
        const datosStorage = await AsyncStorage.getItem('datos');
        if(datosStorage) {
            setDatos(JSON.parse(datosStorage));
          }}
        catch (error) {
            console.log(error);
          }
        }

        obtenerDatosStorage();}, []);*/

  // guardar los datos en storage
  /*const guardarDatosStorage = async (datosJSON) => {
    try {
      await AsyncStorage.setItem('datos', datosJSON.stringify(nuevosDatos));
      setDatos(nuevosDatos);
    } catch (error) {
        console.log(error);
    }
  }*/
  
  return (
<View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content" // También puede ser "dark-content"
        backgroundColor="#6a51ae" // Solo en Android
      />
      {/* Resto de tu aplicación */}
     
    <NavigationContainer>
      <Tab.Navigator  initialRouteName="Productoofertas">
        <Tab.Screen name="Stackdatos" component={Stackdatos} options={{ title: 'Datos del Cliente' }} />
        <Tab.Screen name="Productoofertas" component={Productoofertas} options={{ title: 'Productos y Ofertas' }} />
      </Tab.Navigator>
    </NavigationContainer>
   

    </View>

  );
}