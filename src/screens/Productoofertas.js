import { View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal, } from 'react-native'
import React , {  useEffect,useState }  from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Productoofertas() {

    const navigation = useNavigation() //para navegar entre pantallas
    const [ingresos, setIngresos] = useState([]);
    const [egresos, setEgresos] = useState([]);
    const [ofertas, setOfertas] = useState([])
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

  //comprobacion de los datos
  console.log('Ingresos obtenidos:', ingresos);
  console.log('Egresos obtenidos:', egresos);

  //funcion para sumar los ingresos
  const ingresostot = ingresos.reduce((acc, ingreso) => acc + parseFloat(ingreso.monto), 0);

  //funcion para sumar los egresos
  const eggresostot = egresos.reduce((acc, egreso) => acc + parseFloat(egreso.monto), 0);

  console.log('Ingresos totales:', ingresostot);
  console.log('Egresos totales:', eggresostot);

    //funcion para conocer porcentaje de dinero sobrante
    const sobraPorcentaje = (totalI, totalE) => {
        return (((totalI - totalE) * 100) / totalI);
    }

    //funcion para mostrar los rangos de riesgo
    const rangosRiesgo = () => {
      if(console.log('r1: riesgo alto')) {
        //aca se pone la interfaz con los productos que se ofrecen
        return ['¡Apertura una cuenta con nosotros!']; //respuesta para mientras
      }
      else if(console.log('r2: riesgo suficiente')) {
        return ['¡Apertura una cuenta con nosotros!','Tarjeta de crédito clásica','Crédito personal hasta $2,000'];
      }
      else if(console.log('r3: riesgo bueno')) {
        return ['¡Apertura una cuenta con nosotros!','Tarjeta de crédito clásica','Tarjeta de crédito Oro','Crédito personal hasta $8,000'];
      }
      else if(console.log('r4: riesgo muy bueno')) {
        return ['¡Apertura una cuenta con nosotros!','Tarjeta de crédito clásica','Tarjeta de crédito Oro','Tarjeta de crédito Platinum','Crédito personal hasta $25,000'];
      }
      else if(console.log('r5: riesgo excelente')) {
        return ['¡Apertura una cuenta con nosotros!','Tarjeta de crédito clásica','Tarjeta de crédito Oro','Tarjeta de crédito Platinum','Tarjeta de crédito Black','Crédito personal hasta $50,000'];
      }
      else{
        return  ['¡No se puede calcular el riesgo lo siento solo este se muestra!'];
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
    useEffect(() => {
      setOfertas(rangosRiesgo());
  }, [ingresostot, eggresostot]);


  return (
    <View>
      <Text>Productoofertas</Text>

      <View>
          <Text>Lista de oferyas:</Text>
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
