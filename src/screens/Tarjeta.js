import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Tarjeta({ cardType }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // Función para obtener los estilos según el tipo de tarjeta
  const getCardStyle = () => {
    switch (cardType) {
      case 'Clasica':
        return { backgroundColor: '#00cc00', rectColor: '#66ff66' };
      case 'Oro':
        return { backgroundColor: '#FFD700', rectColor: '#FFC107' };
      case 'Platinum':
        return { backgroundColor: '#333333', rectColor: '#D7D6E0' };
      case 'Black':
        return { backgroundColor: '#000000', rectColor: '#333333' };
      default:
        return { backgroundColor: '#ff9800', rectColor: '#ffa726' };
    }
  };

  const { backgroundColor, rectColor } = getCardStyle();

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal */}
      <Button title="Ver tarjeta" onPress={() => setModalVisible(true)} />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.card, { backgroundColor }]}>
            {/* Rectángulo de diseño en la tarjeta */}
            <View style={[styles.rect, { backgroundColor: rectColor }]} />

            {/* Detalle del chip */}
            <View style={styles.chip}>
              <View style={styles.chipInner}></View>
              <View style={styles.chipLine} />
              <View style={styles.chipLine} />
            </View>

            {/* Número de tarjeta */}
            <Text style={styles.cardNumber}>3056 930902 5904</Text>

            {/* Información del propietario */}
            <View style={styles.bottomInfo}>
              <View>
                <Text style={styles.label}>Nombre del propietario</Text>
                <Text style={styles.name}>JOHN DOE</Text>
              </View>
              <View style={styles.expirationContainer}>
                <Text style={styles.label}>Fecha válida</Text>
                <Text style={styles.expiration}>01/2023</Text>
              </View>
            </View>
          </View>

          {/* Botón para cerrar el modal */}
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: 350,
    height: 220,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    elevation: 5,
    overflow: 'hidden', // Importante para el rectángulo
  },
  rect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '113%',
    height: '50%', // Ocupa la mitad de la altura de la tarjeta
  },
  chip: {
    width: 50,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipInner: {
    width: 30,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#e0e0e0',
  },
  chipLine: {
    width: 40,
    height: 2,
    backgroundColor: '#bdbdbd',
    marginTop: 2,
  },
  cardNumber: {
    fontSize: 24,
    letterSpacing: 3,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
  },
  expirationContainer: {
    alignItems: 'flex-end',
  },
  expiration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
