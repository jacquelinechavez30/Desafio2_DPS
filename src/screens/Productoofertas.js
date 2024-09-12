import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Productoofertas() {
    const navigation = useNavigation() //para navegar entre pantallas

    //funcion para conocer porcentaje de dinero sobrante
    const sobraPorcentaje = (totalI, totalE) => {
        return (((totalI - totalE) * 100) / totalI);
    }

    //funcion para mostrar los rangos de riesgo
    const rangosRiesgo = () => {
      if(console.log('r1: riesgo alto')) {
        //aca se pone la interfaz con los productos que se ofrecen
        return '¡Apertura una cuenta con nosotros!'; //respuesta para mientras
      }
      else if(console.log('r2: riesgo suficiente')) {
        return '¡Apertura una cuenta con nosotros!\nTarjeta de crédito clásica\nCrédito personal hasta $2,000';
      }
      else if(console.log('r3: riesgo bueno')) {
        return '¡Apertura una cuenta con nosotros!\nTarjeta de crédito clásica\nTarjeta de crédito Oro\nCrédito personal hasta $8,000';
      }
      else if(console.log('r4: riesgo muy bueno')) {
        return '¡Apertura una cuenta con nosotros!\nTarjeta de crédito clásica\nTarjeta de crédito Oro\nTarjeta de crédito Platinum\nCrédito personal hasta $25,000';
      }
      else if(console.log('r5: riesgo excelente')) {
        return '¡Apertura una cuenta con nosotros!\nTarjeta de crédito clásica\nTarjeta de crédito Oro\nTarjeta de crédito Platinum\nTarjeta de crédito Black\nCrédito personal hasta $50,000';
      }
      else{
        return 'No se puede calcular el riesgo';
      }
  }

    //funcion para calificar el riesgo y ofrecer productos
    const ingresosComparacion = () => {

      switch (ingresostot, eggresostot) {
        
        case ingresostot <= 360:
          console.log('r1: riesgo alto');
          rangosRiesgo();
          break;
    
        case ingresostot > 360 && ingresostot <= 700:
          if(sobraPorcentaje(ingresostot, eggresostot) <= 40) {
            console.log('r1: riesgo alto');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 40) {
            console.log('r2: riesgo suficiente');
            rangosRiesgo();
          }
          break;

        case ingresostot > 700 && ingresostot <= 1200:
          if(sobraPorcentaje(ingresostot, eggresostot) <= 20) {
            console.log('r1: riesgo alto');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 20 && sobraPorcentaje(ingresostot, eggresostot) <= 40) {
            console.log('r2: riesgo suficiente');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 40) {
            console.log('r3: riesgo bueno');
            rangosRiesgo();
          }
          break;

        case ingresostot > 1200 && ingresostot <= 3000:
          if(sobraPorcentaje(ingresostot, eggresostot) <= 20) {
            console.log('r2: riesgo suficiente');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 20 && sobraPorcentaje(ingresostot, eggresostot) <= 40) {
            console.log('r3: riesgo bueno');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 40) {
            console.log('r4: riesgo muy bueno');
            rangosRiesgo();
          }
          break;

        case ingresostot > 3000:
          if(sobraPorcentaje(ingresostot, eggresostot) <= 20) {
            console.log('r3: riesgo bueno');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 20 && sobraPorcentaje(ingresostot, eggresostot) <= 30) {
            console.log('r4: riesgo muy bueno');
            rangosRiesgo();
          }
          else if(sobraPorcentaje(ingresostot, eggresostot) > 30) {
            console.log('r5: riesgo excelente');
            rangosRiesgo();
          }
          break;

        default:
          console.log('No se puede calcular el riesgo'); //respuesta para mientras al igual que los returns
      }
    }

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
