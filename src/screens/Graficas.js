import React from 'react';
import { View, Text,  Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; //para navegar entre pantallas

export default function Graficas() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Pantalla de Graficas</Text>
    </View>
  );
}