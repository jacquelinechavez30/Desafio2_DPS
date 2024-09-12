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
} from "react-native";
import * as Yup from "yup";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

// Validaciones
const validationSchema = Yup.object().shape({
  tipoEgreso: Yup.string().required("Selecciona un tipo de Egreso"),
  monto: Yup.number()
    .typeError("El monto debe ser un número")
    .required("Ingresa un monto $")
    .positive("El monto debe ser un valor positivo"),
});

export default function Egresos() {
  const navigation = useNavigation();

  const [egresos, setEgresos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Función para guardar un nuevo Egreso
  const guardarEgreso = (values, { resetForm }) => {
    console.log("Nuevo egreso:", values); // Verifica el Egreso añadido
    setEgresos([...egresos, values]);

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
    setEditingIndex(null);
    setModalVisible(false);
  };

  // Función para eliminar un Egreso
  const eliminarEgreso = () => {
    const updateEgresos = egresos.filter(
      (_, index) => index !== editingIndex
    );
    setEgresos(updateEgresos);
    setEditingIndex(null);
    setModalVisible(false);
  };

  return (
    // Formulario para agregar egresos
    <View>
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
            <Text>Tipo de Egreso:</Text>
            <RNPickerSelect
              onValueChange={(value) => setFieldValue("tipoEgreso", value)}
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
              <Text>{errors.tipoEgreso}</Text>
            )}

            <Text>Monto:</Text>
            <TextInput
              onChangeText={handleChange("monto")}
              value={values.monto}
              keyboardType="numeric"
              placeholder="Ingresa el monto"
            />
            {touched.monto && errors.monto && <Text>{errors.monto}</Text>}

            <Button title="Agregar Egreso" onPress={handleSubmit} />
          </View>
        )}
      </Formik>

      {egresos.length > 0 ? (
        <View>
          <Text>Lista de los egresos:</Text>
          <FlatList
            data={egresos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => editarEgreso(index)}>
                <Text>Tipo de Egreso: {item.tipoEgreso}</Text>
                <Text>Monto: ${item.monto}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <Text>No hay egresos disponibles.</Text>
      )}

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
                    <Text>Editar Egreso :</Text>
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
                      <Text>{errors.tipoEgreso}</Text>
                    )}

                    <Text>Introduce el valor del monto del Egreso :</Text>
                    <TextInput
                      onChangeText={handleChange("monto")}
                      value={values.monto}
                      keyboardType="numeric"
                      placeholder="Ingresa el monto"
                    />
                    {touched.monto && errors.monto && (
                      <Text>{errors.monto}</Text>
                    )}

                    <Button
                      title="Guardar"
                      color="green"
                      onPress={handleSubmit}
                    />
                    <Button
                      title="Eliminar"
                      color="red"
                      onPress={eliminarEgreso}
                    />
                    <Button
                      title="Cancelar"
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                )}
              </Formik>
            )}
          </View>
        </View>
      </Modal>
      {/* Button para la pantalla de egresos */}
      {egresos.length > 0 ? (
        <Button
          title="Ir a Graficas"
          onPress={() => navigation.navigate("Grafica", { egresos })}
        />
      ) : null
      }
    </View>
  );
}

 /* return (
    <View>
      <Text>Pantalla de Egresos prueba </Text>
      
       <Text>
        para ir a graficas
       </Text>
       <Button
        title="Ir a Graficas"
        onPress={() => navigation.navigate('Grafica')}
        />

    </View>
  );*/
   /*<Button
        title="Regresar a Ingresos"
        onPress={() => navigation.navigate("FormularioIngresos", { egresos })}
      />*/