import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Validaciones
const validationSchema = Yup.object().shape({
  tipoEgreso: Yup.string().required("Selecciona un tipo de Egreso"),
  monto: Yup.number()
    .typeError("El monto debe ser un número")
    .required("Ingresa un monto ($)")
    .positive("El monto no puede ser negativo"),
});

export default function Egresos() {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const [egresos, setEgresos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [datos, setDatos] = useState([]); // Se agrega para guardar los datos en storage

  // Función para guardar los datos en storage
  const guardarDatosStorage = async (dato) => {
    try {
      const datosJSON = JSON.stringify(dato);
      await AsyncStorage.setItem('egresos', datosJSON);
      setDatos([...datos, datosJSON]);
      console.log('Datos guardados' + datosJSON);
    } catch (error) {
      console.log(error);
    }
  }

  // Función para guardar un nuevo Egreso
  const guardarEgreso = (values, { resetForm }) => {
    console.log("Nuevo egreso:", values); // Verifica el Egreso añadido
    setEgresos([...egresos, values]);
    guardarDatosStorage([...egresos, values]);
    resetForm();
  };

  // Función para preparar la edición de un Egreso
  const editarEgreso = (index) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  // Función para guardar los cambios en la edición
  const guardarEdicion = (values) => {
    const updateEgresos = egresos.map((egreso, index) =>
      index === editingIndex ? values : egreso
    );
    setEgresos(updateEgresos);
    guardarDatosStorage(updateEgresos);
    setEditingIndex(null);
    setModalVisible(false);
  };

  // Función para eliminar un Egreso
  const eliminarEgreso = () => {
    const updateEgresos = egresos.filter(
      (_, index) => index !== editingIndex
    );
    setEgresos(updateEgresos);
    guardarDatosStorage(updateEgresos);
    setEditingIndex(null);
    setModalVisible(false);
  };

  //estilos
  const styles = StyleSheet.create({
    Text: {
      margin: 10,
    },
    Container: {
      backgroundColor: '#f8f9fa',
    },
    RNPickerSelect: {
      marginTop: 0,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
      width: width * 0.94, 
      height: 40,
      borderWidth: 1,
      backgroundColor: '#fff',
    },
    Button: {
      padding: 10,
      alignItems: 'center',
    },
    buttonModal: {
      marginTop: 10,
    },
    error: {
      color: 'red',
      marginTop: 0,
      marginLeft: 10,
      marginBottom: 5,
    },
    TextInput: {
      marginTop: 0,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      borderWidth: 0.5,
      backgroundColor: '#fff',
    },
    separator: {
      height: 1,
      backgroundColor: '#000',
      marginVertical: 10,
      marginLeft: 25,
      marginRight: 25,
    },
    lista: {
      marginLeft: 30,
      marginRight: 10,
      marginBottom: 10,
      marginTop: 10,
    },
  });

  return (
    // Formulario para agregar egresos
    <View style={styles.Container}>
      <Formik
        initialValues={{ tipoEgreso: "", monto: "" }}
        validationSchema={validationSchema}
        onSubmit={guardarEgreso}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View>
            <Text style={styles.Text}>Tipo de Egreso:</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue("tipoEgreso", value)}
              items={[
                { label: "Seguro social", value: "Seguro social" },
                { label: "AFP", value: "AFP" },
                { label: "Gastos vitales", value: "Gastos vitales" },
                { label: "Alquiler", value: "Alquiler" },
                { label: "Prestamo", value: "Prestamo" },
              ]}
              style={{ inputIOS: styles.RNPickerSelect, inputAndroid: styles.RNPickerSelect }}
              value={values.tipoEgreso}
              placeholder={{
                label: "Selecciona un tipo de Egreso",
                value: null,
              }}
            />
            {touched.tipoEgreso && errors.tipoEgreso && (
              <Text style={styles.error}>{errors.tipoEgreso}</Text>
            )}

            <Text style={styles.Text}>Monto:</Text>
            <TextInput
              onChangeText={handleChange("monto")}
              style={styles.TextInput}
              value={values.monto}
              keyboardType="numeric"
              placeholder="Ingresa el monto"
            />
            {touched.monto && errors.monto && <Text style={styles.error}>{errors.monto}</Text>}

            <View style={styles.Button}>
            <Button title="Agregar Egreso" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>

      <View style={styles.separator} />

      {egresos.length > 0 ? (
        <View style={styles.lista}>
          <Text style={{ color: '#198754', marginBottom: 8, }}>Toca un egreso para editar</Text> 
          <Text style={{fontWeight: 'bold'}}>Lista de los egresos:</Text>
          <FlatList
            data={egresos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => editarEgreso(index)}>
                <Text>➤ Tipo de Egreso: {item.tipoEgreso}</Text>
                <Text>Monto: ${item.monto}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <Text style={styles.Text}>No hay egresos disponibles.</Text>
      )}

      <View style={styles.separator} />

      {/* Modal para editar egresos */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            {editingIndex !== null && (
              <Formik
                initialValues={egresos[editingIndex]}
                validationSchema={validationSchema}
                onSubmit={guardarEdicion}
              >
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <View>
                    <Text style={styles.Text}>Editando egreso:</Text>
                    <RNPickerSelect
                      onValueChange={(value) =>
                        setFieldValue("tipoEgreso", value)
                      }
                      items={[
                        { label: "Seguro social", value: "Seguro social" },
                        { label: "AFP", value: "AFP" },
                        { label: "Gastos vitales", value: "Gastos vitales" },
                        { label: "Alquiler", value: "Alquiler" },
                        { label: "Prestamo", value: "Prestamo" },
                      ]}
                      value={values.tipoEgreso}
                      placeholder={{
                        label: "Selecciona un tipo de Egreso",
                        value: null,
                      }}
                    />
                    {touched.tipoEgreso && errors.tipoEgreso && (
                      <Text style={styles.error}>{errors.tipoEgreso}</Text>
                    )}

                    <Text style={styles.Text}>Nuevo monto:</Text>
                    <TextInput
                      onChangeText={handleChange("monto")}
                      style={styles.TextInput}
                      value={values.monto}
                      keyboardType="numeric"
                      placeholder="Ingresa el monto"
                    />
                    {touched.monto && errors.monto && (
                      <Text style={styles.error}>{errors.monto}</Text>
                    )}

                    <View style={styles.buttonModal}> 
                    <Button
                      title="Guardar"
                      color="green"
                      onPress={handleSubmit}
                    />
                    </View>
                    <View style={styles.buttonModal}>
                    <Button
                      title="Eliminar"
                      color="red"
                      onPress={eliminarEgreso}
                    />
                    </View>
                    <View style={styles.buttonModal}>
                    <Button
                      title="Cancelar"
                      onPress={() => setModalVisible(false)}
                    />
                    </View>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
      {/* Button para la pantalla de egresos */}
      {egresos.length > 0 ? (
        <View style={styles.Button}>
        <Button
          title="Ir a Graficas"
          color={'#198754'}
          onPress={() => navigation.navigate("Grafica", { egresos })}
        />
        </View>
      ) : (<Text>Debes insertar al menos un egreso</Text>)
      }
    </View>
  );
}