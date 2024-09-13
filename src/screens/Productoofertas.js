import { View, Text, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    return (
        <View>
            <Text>Productoofertas</Text>
            
            <View>
                <Text>Ofertas disponibles según tu riesgo:</Text>
                <FlatList
                    data={ofertas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item}</Text>
                        </View>
                    )}
                />
            </View>

            <Button
                title="Volver a inicio"
                onPress={() => navigation.navigate('Stackdatos')}
            />
        </View>
    )
}
