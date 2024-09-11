import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Productoofertas() {
    const navigation = useNavigation() //para navegar entre pantallas
  return (
    <View>
      <Text>Productoofertas</Text>
      <Button
        title="Volver a inicio"
        onPress={() => navigation.navigate('Stackdatos')}
        />
    </View>
  )
}
