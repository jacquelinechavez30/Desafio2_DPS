import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const getCardStyle = (cardType) => {
  switch (cardType) {
    case 'Clasica':
      return getClasicaStyle();
    case 'Oro':
      return getOroStyle();
    case 'Platinum':
      return getPlatinumStyle();
    case 'Black':
      return getBlackStyle();
   
  }
};

const getClasicaStyle = () => ({
  backgroundColor: '#00cc00',
  rectColor: '#66ff66',
});

const getOroStyle = () => ({
  backgroundColor: '#FFD700',
  rectColor: '#FFC107',
});

const getPlatinumStyle = () => ({
  backgroundColor: '#333333',
  rectColor: '#D7D6E0',
});

const getBlackStyle = () => ({
  backgroundColor: '#000000',
  rectColor: '#333333',
});

const Card = ({ cardType }) => {
  const { backgroundColor, rectColor } = getCardStyle(cardType);

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={[styles.rect, { backgroundColor: rectColor }]} />

      {/* Detalle del chip */}
      <View style={styles.chip}>
        <View style={styles.chipInner}></View>
        <View style={styles.chipLine} />
        <View style={styles.chipLine} />
      </View>

      <Text style={styles.cardNumber}>3056 930902 5904</Text>

      <View style={styles.bottomInfo}>
        <View>
          <Text style={styles.label}>Nombre del propietario</Text>
          <Text style={styles.name}>JOHN DOE</Text>
        </View>
        <View style={styles.expirationContainer}>
          <Text style={styles.label}>Fecha valida</Text>
          <Text style={styles.expiration}>01/2023</Text>
        </View>
      </View>
    </View>
  );
};

export default function Tarjeta({ tipo }) {
 // const cardTypes = ['Clasica', 'Oro', 'Platinum', 'Black'];

  return (
    <View style={styles.container}>
      
        <Card  cardType= {tipo} />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',  // Alinear en columna (vertical)
    alignItems: 'center',     // Centrar las tarjetas horizontalmente
    padding: 10,
  },
  card: {
    width: 350,
    height: 220,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    elevation: 5,
    overflow: 'hidden',
    marginBottom: 20, // Espacio entre las tarjetas
  },
  rect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '113%',
    height: '50%',
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
