import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

// Validaciones
const validationSchema = Yup.object().shape({
  tipoIngreso: Yup.string().required('Selecciona un tipo de ingreso'),
  monto: Yup.number().typeError('El monto debe ser un número').required('Ingresa un monto $').positive('El monto debe ser  un valor positivo'),
});

export default function Ingresos() {
  const navigation = useNavigation();

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
    <View>
      <Formik
        initialValues={{ tipoIngreso: '', monto: '' }}
        validationSchema={validationSchema}
        onSubmit={guardarIngreso}
      >
        
        {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <Text>Tipo de Ingreso:</Text>
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
            />
            {touched.tipoIngreso && errors.tipoIngreso && <Text>{errors.tipoIngreso}</Text>}

            <Text>Monto:</Text>
            <TextInput
              onChangeText={handleChange('monto')}
              value={values.monto}
              keyboardType="numeric"
              placeholder="Ingresa el monto"
            />
            {touched.monto && errors.monto && <Text>{errors.monto}</Text>}

            <Button title="Agregar Ingreso" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      {ingresos.length > 0 ? (
  <View>
    <Text>Lista de los ingresos:</Text>
    <FlatList
      data={ingresos}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => editarIngreso(index)}>
          <Text>Tipo de Ingreso: {item.tipoIngreso}</Text>
          <Text>Monto: ${item.monto}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
) : (
  <Text>No hay ingresos disponibles.</Text>
)}

      {/* Modal para editar ingresos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            {editingIndex !== null && (
              <Formik
                initialValues={ingresos[editingIndex]}
                validationSchema={validationSchema}
                onSubmit={guardarEdicion}
              >
                {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                  <View>
                    <Text>Editar Ingreso :</Text>
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
                    />
                    {touched.tipoIngreso && errors.tipoIngreso && <Text>{errors.tipoIngreso}</Text>}

                    <Text>Introduce el valor del monto del ingreso :</Text>
                    <TextInput
                      onChangeText={handleChange('monto')}
                      value={values.monto}
                      keyboardType="numeric"
                      placeholder="Ingresa el monto"
                    />
                    {touched.monto && errors.monto && <Text>{errors.monto}</Text>}

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

      {/* Button para la pantalla de egresos */}
      <Button
        title="Ir a Egresos"
        onPress={() => navigation.navigate('FormularioEgresos')}
      />
    </View>
  );
}
