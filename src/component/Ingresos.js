import React, { useState } from 'react';
import { Formik } from 'formik';//para el formulario
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import * as Yup from 'yup'; //para la validacion 
import RNPickerSelect from 'react-native-picker-select';// para el selector de ingresos 


//validaciones
const validationSchema = Yup.object().shape({
  tipoIngreso: Yup.string().required('Selecciona un tipo de ingreso'),
  monto: Yup.number().typeError('El monto debe ser un número').required('Ingresa un monto $').positive('El monto debe ser  un valor positivo'),
});

export default function Ingresos() {
  const [ingresos, setIngresos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Función para guardar un nuevo ingreso
  const guardarIngreso = (values, { resetForm }) => {
    setIngresos([...ingresos, values]);
    resetForm();
  };

  // Función para preparar la edición de un ingreso
  const editarIngreso = (index) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  // Función para guardar los cambios en la edición
  const guardarEdicion = (values) => {
    const updatedIngresos = ingresos.map((ingreso, index) =>
      index === editingIndex ? values : ingreso
    );
    setIngresos(updatedIngresos);
    setEditingIndex(null);
    setModalVisible(false);
  };

  // Función para eliminar un ingreso
  const eliminarIngreso = () => {
    const updatedIngresos = ingresos.filter((_, index) => index !== editingIndex);
    setIngresos(updatedIngresos);
    setEditingIndex(null);
    setModalVisible(false);
  };

  return (
    // Formulario para agregar ingresos 
    <View style={styles.container}>
      <Formik
        initialValues={{ tipoIngreso: '', monto: '' }}
        validationSchema={validationSchema}
        onSubmit={guardarIngreso}
      >
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <Text style={styles.label}>Tipo de Ingreso:</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue('tipoIngreso', value)}
              items={[
                { label: 'Salario', value: 'Salario' },
                { label: 'Negocio Propio', value: 'Negocio Propio' },
                { label: 'Pensiones', value: 'Pensiones' },
                { label: 'Remesas', value: 'Remesas' },
                { label: 'Ingresos Varios', value: 'Ingresos Varios' },
              ]}
              value={values.tipoIngreso}
              placeholder={{ label: 'Selecciona un tipo de ingreso', value: null }}
              style={styles.input}
            />
            {touched.tipoIngreso && errors.tipoIngreso && <Text style={styles.errorText}>{errors.tipoIngreso}</Text>}

            <Text style={styles.label}>Monto:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('monto')}
              value={values.monto}
              keyboardType="numeric"
              placeholder="Ingresa el monto"
            />
            {touched.monto && errors.monto && <Text style={styles.errorText}>{errors.monto}</Text>}

            <Button title="Agregar Ingreso" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
        
     
      {ingresos.length > 0 && (
        <View>
          <Text style={styles.listTitle}>Lista de los ingresos:</Text>
          <FlatList
            data={ingresos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => editarIngreso(index)} style={styles.itemContainer}>
                <Text>Tipo de Ingreso: {item.tipoIngreso}</Text>
                <Text>Monto: ${item.monto}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Modal para editar ingresos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {editingIndex !== null && (
              <Formik
                initialValues={ingresos[editingIndex]}
                validationSchema={validationSchema}
                onSubmit={guardarEdicion}
              >
                {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                  <View>
                    <Text style={styles.label}>Editar Ingreso :</Text>
                    <RNPickerSelect
                      onValueChange={(value) => setFieldValue('tipoIngreso', value)}
                      items={[
                        { label: 'Salario', value: 'Salario' },
                        { label: 'Negocio Propio', value: 'Negocio Propio' },
                        { label: 'Pensiones', value: 'Pensiones' },
                        { label: 'Remesas', value: 'Remesas' },
                        { label: 'Ingresos Varios', value: 'Ingresos Varios' },
                      ]}
                      value={values.tipoIngreso}
                      placeholder={{ label: 'Selecciona un tipo de ingreso', value: null }}
                      style={styles.input}
                    />
                    {touched.tipoIngreso && errors.tipoIngreso && <Text style={styles.errorText}>{errors.tipoIngreso}</Text>}

                    <Text style={styles.label}>Monto:</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('monto')}
                      value={values.monto}
                      keyboardType="numeric"
                      placeholder="Ingresa el monto"
                    />
                    {touched.monto && errors.monto && <Text style={styles.errorText}>{errors.monto}</Text>}

                    <Button title="Guardar" color="green" onPress={handleSubmit} />
                    <Button title="Eliminar" color="red" onPress={eliminarIngreso} />
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  listTitle: {
    fontSize: 18,
    marginVertical: 20,
  },

});
