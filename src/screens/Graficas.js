import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Graficas() {

  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);

  const screenWidth = Dimensions.get('window').width;

  //funcion para mostrar los datos
  const cargarDatosStorage = async () => {
    try {
      const ingresosJSON = await AsyncStorage.getItem('ingresos');
      const egresosJSON = await AsyncStorage.getItem('egresos');
      if (ingresosJSON !== null) {
        setIngresos(JSON.parse(ingresosJSON));
      }
      if (egresosJSON !== null) {
        setEgresos(JSON.parse(egresosJSON));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarDatosStorage();
  }, []);

  console.log('Ingresos en Graficas:', ingresos);
  console.log('Egresos en Graficas:', egresos);

  // Procesar los ingresos para generar los datos del gráfico
  const labelsIngresos = ingresos.map(ingreso => ingreso.tipoIngreso); // Crear un array de tipos de ingreso
  const dataIngresos = ingresos.map(ingreso => parseFloat(ingreso.monto)); // Crear un array de montos (como números)

  const labelsEgresos = egresos.map(egreso => egreso.tipoEgreso);
  const dataEgresos = egresos.map(egreso => parseFloat(egreso.monto));

  return (
    <View>
      <Text>Pantalla de Gráficas</Text>
      <Text>Gráficas de Ingresos:</Text>

      {ingresos.length > 0 ? (
        <BarChart
          data={{
            labels: labelsIngresos, // Array de etiquetas
            datasets: [
              {
                data: dataIngresos, // Array de montos
              },
            ],
          }}
          width={screenWidth} // Ancho del gráfico
          height={220} // Altura del gráfico
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, // Mostrar sin decimales
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      ) : (
        <Text>No hay ingresos para mostrar.</Text>
      )}

      <Text>Gráficas de Egresos:</Text>
      {egresos.length > 0 ? (
        <BarChart
          data={{
            labels: labelsEgresos,
            datasets: [
              {
                data: dataEgresos
              }
            ]
          }}
          width={screenWidth} // Ancho del gráfico
          height={220} // Altura del gráfico
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, // Mostrar sin decimales
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      ) : (
        <Text>No hay egresos disponibles</Text>
      )}

    </View>
  );
}
