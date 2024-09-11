import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';

export default function Graficas() {
  const route = useRoute();
  const { ingresos } = route.params;
  const screenWidth = Dimensions.get('window').width;

  console.log('Ingresos en Graficas:', ingresos);

  // Procesar los ingresos para generar los datos del gráfico
  const labels = ingresos.map(ingreso => ingreso.tipoIngreso); // Crear un array de tipos de ingreso
  const data = ingresos.map(ingreso => parseFloat(ingreso.monto)); // Crear un array de montos (como números)

  return (
    <View>
      <Text>Pantalla de Gráficas</Text>
      <Text>Gráficas de Ingresos:</Text>

      {ingresos.length > 0 ? (
        <BarChart
          data={{
            labels: labels, // Array de etiquetas
            datasets: [
              {
                data: data, // Array de montos
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
    </View>
  );
}
