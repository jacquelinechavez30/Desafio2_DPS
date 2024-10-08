import {ScrollView, View, Text, Button, FlatList,StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tarjeta from './Tarjeta';

export default function Productoofertas() {
    const navigation = useNavigation(); //para navegar entre pantallas
    const [ingresos, setIngresos] = useState([]);
    const [egresos, setEgresos] = useState([]);
    const [ofertas, setOfertas] = useState([]); // Estado para las ofertas

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

    //funcion para sumar los ingresos
    const ingresostot = ingresos.reduce((acc, ingreso) => acc + parseFloat(ingreso.monto), 0);

    //funcion para sumar los egresos
    const eggresostot = egresos.reduce((acc, egreso) => acc + parseFloat(egreso.monto), 0);

    //funcion para conocer porcentaje de dinero sobrante
    const sobraPorcentaje = (totalI, totalE) => {
        return (((totalI - totalE) * 100) / totalI);
    }

    //funcion para mostrar los rangos de riesgo
    const rangosRiesgo = () => {
        if (ingresostot <= 360) {
            return ['Apertura de cuenta'];
        } else if (ingresostot > 360 && ingresostot <= 700) {
            if (sobraPorcentaje(ingresostot, eggresostot) <= 40) {
                return ['Apertura de cuenta'];
            } else {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Crédito personal hasta $2,000.00'];
            }
        } else if (ingresostot > 700 && ingresostot <= 1200) {
            if (sobraPorcentaje(ingresostot, eggresostot) <= 20) {
                return ['Apertura de cuenta'];
            } else if (sobraPorcentaje(ingresostot, eggresostot) > 20 && sobraPorcentaje(ingresostot, eggresostot) <= 40) {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Crédito personal hasta $2,000.00'];
            } else {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $8,000.00'];
            }
        } else if (ingresostot > 1200 && ingresostot <= 3000) {
            if (sobraPorcentaje(ingresostot, eggresostot) <= 20) {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Crédito personal hasta $2,000.00'];
            } else if (sobraPorcentaje(ingresostot, eggresostot) > 20 && sobraPorcentaje(ingresostot, eggresostot) <= 40) {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $8,000.00'];
            } else {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Tarjeta de crédito Platinum', 'Crédito personal hasta $25,000.00'];
            }
        } else if (ingresostot > 3000) {
            if (sobraPorcentaje(ingresostot, eggresostot) <= 20) {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Crédito personal hasta $8,000.00'];
            } else if (sobraPorcentaje(ingresostot, eggresostot) > 20 && sobraPorcentaje(ingresostot, eggresostot) <= 30) {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Tarjeta de crédito Platinum', 'Crédito personal hasta $25,000.00'];
            } else {
                return ['Apertura de cuenta', 'Tarjeta de Crédito Clásica', 'Tarjeta de Crédito Oro', 'Tarjeta de crédito Platinum', 'Tarjeta de crédito Black', 'Crédito personal hasta $50,000.00'];
            }
        } else {
            return ['No se puede calcular el riesgo'];
        }
    }

    //calcular el riesgo y actualizar las ofertas
    useEffect(() => {
        setOfertas(rangosRiesgo());
    }, [ingresostot, eggresostot]);
    const ofertasFiltradas = ofertas.filter(oferta => oferta.includes('Tarjeta de'));
    const Clasica = ofertasFiltradas.includes('Tarjeta de Crédito Clásica');
    const Oro = ofertasFiltradas.includes('Tarjeta de Crédito Oro');
    const Platinum = ofertasFiltradas.includes('Tarjeta de crédito Platinum');
    const Black = ofertasFiltradas.includes('Tarjeta de crédito Black');
    

//para tarjeta clasica
const Tarjetascredito = () => {
  return (
    <View>
      {Clasica && (
        <View style={styles.tarjetasContainer}> 
          <Text>Tarjeta de Crédito Clásica</Text>
         <Tarjeta tipo="Clasica" />

        </View>
      )}
      {Oro && (
        <View style={styles.tarjetasContainer}>
           <Text>Tarjeta de Crédito Oro. </Text>
          <Tarjeta tipo='Oro' />
        </View>
      )}
      {Platinum && (
        <View style={styles.tarjetasContainer}>
          <Text>Tarjeta de Crédito Platinum. </Text>
          <Tarjeta tipo='Platinum' />
        </View>
      )}
      {Black && (
        <View style={styles.tarjetasContainer}>
          <Text>Tarjeta de Crédito Black. </Text>
          <Tarjeta tipo='Black' />
        </View>
      )}
    </View>
  );
};
const ofertasFiltradass = ofertas.filter(oferta => 
  oferta.includes('Apertura de cuenta') || 
  oferta.includes('Crédito personal hasta')
);
    
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
         <View style={styles.mainContainer}>
        <Text style={styles.title}>¡Aprovecha estas ofertas!</Text>
        <FlatList
            data={ofertasFiltradass}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text style={styles.offerContainer}>{item}</Text>
                </View>
            )}
        />

{ofertasFiltradas.length > 0 ? (
<View>
<Tarjetascredito />
</View>
) : (
<Text>No hay tarjetas disponibles.</Text>
)}
 {<Button
        title="Volver a inicio"
        onPress={() => navigation.navigate('Stackdatos')}
    />}

</View>

   
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',  
    alignItems: 'center',         
    padding: 10,
  },
  rect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '113%',
    height: '50%',
  },
  mainContainer: {
      width: '100%',
      padding: 10,
      alignItems: 'center',
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  offerContainer: {
      marginBottom: 10,
  },
  tarjetasContainer: {
      width: '100%',
      padding: 10,
      alignItems: 'center',
  },
  tarjetaContainer: {
      marginBottom: 20,
      alignItems: 'center',
      
  },


});

    