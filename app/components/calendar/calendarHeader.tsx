import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  mesSeleccionado: Date;
  manejarMesAnterior: () => void;
  manejarMesSiguiente: () => void;
}

const CalendarHeader: React.FC<Props> = ({ mesSeleccionado, manejarMesAnterior, manejarMesSiguiente }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={manejarMesAnterior} style={styles.button}>
        <MaterialIcons name="chevron-left" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.monthText}>
        {mesSeleccionado.toLocaleString('es', { month: 'long', year: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())}
      </Text>
      <TouchableOpacity onPress={manejarMesSiguiente} style={styles.button}>
        <MaterialIcons name="chevron-right" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
//   button: { padding: 10 },
//   monthText: { fontSize: 18, fontWeight: 'bold' }
// });


const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
  button: { padding: 10 },
  monthText: { fontSize: 18, fontWeight: 'bold' },
});

export default CalendarHeader;
