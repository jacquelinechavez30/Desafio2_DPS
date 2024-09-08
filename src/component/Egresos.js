import React from 'react';
import { View, Text, Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; //para navegar entre pantallas


export default function Egresos() {
    
    const navigation = useNavigation();


  return (
    <View>
      <Text>Pantalla de Egresos prueba </Text>
      <Text>Presiona el botón para volver al formulario de ingresos</Text>
      <Button
        title="Ir a Ingresos"
        onPress={() => navigation.navigate('FormularioIngreso')}
        />
       <Text>
        para ir a graficas
       </Text>
       <Button
        title="Ir a Graficas"
        onPress={() => navigation.navigate('Grafica')}
        />

    </View>
  );
}