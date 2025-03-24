import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { IService } from '../services/IService';
import CalendarHeader from '../components/calendar/calendarHeader';
import CalendarDays from '../components/calendar/calendarDays';
import ServiceList from '../components/services/serviceList';
import ServiceListModal from '../components/services/serviceListModal';

const AgendamientoCalendario = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [verModal, setVerModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const manejarMesAnterior = () => {
    setMesSeleccionado((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const manejarMesSiguiente = () => {
    setMesSeleccionado((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.encabezado}>
        {/* <Volver ruta={'../inicio'}></Volver> */}
        <Text style={[{ width: '100%', fontSize: 25, color: '#94c87d', fontWeight: 'bold', textAlign: 'center' }]}>Agenda tu cita</Text>
      </View>

      <Text style={[{ fontSize: 17, marginBottom: 30 }]}>¡Te damos la bienvenida! Elige el mejor servicio y sientete como en casa</Text>
      <ServiceList servicesSelected={selectedServices} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      {/* <TimeSlots selectedDate={fechaSeleccionada} onSelectTime={setSelectedTime} /> */}
      <ServiceListModal servicesSelected={selectedServices} setServicesSelected={setSelectedServices} isExpanded={isExpanded} setIsExpanded={setIsExpanded}></ServiceListModal>
      <CalendarHeader
        mesSeleccionado={mesSeleccionado}
        manejarMesAnterior={manejarMesAnterior}
        manejarMesSiguiente={manejarMesSiguiente}
      />
      <CalendarDays mesSeleccionado={mesSeleccionado} onSelectDate={setFechaSeleccionada} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center'
    // justifyContent: 'space-between'
  },
  container: { flex: 1, padding: 16, marginTop: 40, backgroundColor: '#fff' },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default AgendamientoCalendario;
