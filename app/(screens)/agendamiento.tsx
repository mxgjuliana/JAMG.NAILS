import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { IService } from '../services/IService';
import CalendarDays from '../components/calendar/calendarDays';
import ServiceListModal from '../components/services/serviceListModal';
import HourTag from '../components/hours/tagHour';

const servicesList: IService[] = [
  {
    IdServicio: 1,
    Servicio: 'Corte de cabello',
    Categoria: 'Cabello',
    Duracion: 30
  },
  {
    IdServicio: 2,
    Servicio: 'Tinte',
    Categoria: 'Cabello',
    Duracion: 120
  },
  {
    IdServicio: 3,
    Servicio: 'Manicure',
    Categoria: 'Uñas',
    Duracion: 60
  },
  {
    IdServicio: 4,
    Servicio: 'Pedicure',
    Categoria: 'Uñas',
    Duracion: 60
  },
  {
    IdServicio: 5,
    Servicio: 'Maquillaje',
    Categoria: 'Maquillaje',
    Duracion: 60
  },
  {
    IdServicio: 6,
    Servicio: 'Tratamiento capilar',
    Categoria: 'Cabello',
    Duracion: 60
  }
];

const hoursDisponibles: string[] = [
  '8:00',
  '10:00',
  '13:00',
  '15:30',
  '17:00',
  '18:30',
]


const AgendamientoCalendario = () => {
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    if (selectedServices.length === 0) {
      setSelectedTime(null)
    }
  }, [selectedServices])

  const manejarMesAnterior = () => {
    setMesSeleccionado((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const manejarMesSiguiente = () => {
    setMesSeleccionado((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const onSelectHour = (hour: string) => {
    setSelectedTime(hour);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.encabezado}>
          <Text style={[{ width: '100%', fontSize: 25, color: '#94c87d', fontWeight: 'bold', textAlign: 'center' }]}>Agenda tu cita</Text>
        </View>
        <Text style={[{ fontSize: 17, marginBottom: 30 }]}>¡Te damos la bienvenida! Elige el mejor servicio y sientete como en casa</Text>
        <ServiceListModal
          servicesSelected={selectedServices}
          setServicesSelected={setSelectedServices}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          servicesList={servicesList}
        ></ServiceListModal>
        <CalendarDays
          mesSeleccionado={mesSeleccionado}
          onSelectDate={setFechaSeleccionada}
          selectedDate={fechaSeleccionada}
          manejarMesAnterior={manejarMesAnterior}
          manejarMesSiguiente={manejarMesSiguiente}
          />
        {fechaSeleccionada !== null && selectedServices.length > 0 && (
          <View>
            <Text style={[{ fontSize: 17, marginTop: 20, marginBottom: 5 }]}>Horarios disponibles</Text>
            <View style={styles.hoursContainer}>
              {hoursDisponibles.map((hour, index) => (
                <HourTag key={index} label={hour} colorTag={selectedTime === hour ? '#94c87d' : ''} onSelect={() => onSelectHour(hour)} />
              ))}
            </View>
          </View>

        )}

      </ScrollView>
      {fechaSeleccionada !== null && selectedTime !== null && selectedTime !== '' && selectedServices.length > 0 && (
        <TouchableOpacity style={styles.botonConfirmar}>
          <Text style={styles.textoBoton}>Confirmar</Text>
        </TouchableOpacity>
      )}

    </>
  );
};

const styles = StyleSheet.create({
  encabezado: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#fff'
    // justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    padding: 16, marginTop: 40,
    backgroundColor: '#fff'
  },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  hoursContainer: {
    flexDirection: 'row',  // Alinea los elementos en fila
    flexWrap: 'wrap',      // Permite que pasen a la siguiente línea
    justifyContent: 'space-between', // Centra los elementos
    marginTop: 10,
  },

  botonConfirmar: {
    backgroundColor: '#94c87d',  // Color verde
    paddingVertical: 12,         // Altura del botón
    paddingHorizontal: 20,       // Espaciado horizontal
    borderRadius: 25,           
    alignItems: 'center',        // Centra el texto
    justifyContent: 'center',    // Centra verticalmente
    marginBottom: 30,     
    marginTop: 10,  
    marginLeft: 10,    
    marginRight: 10,                 
  },
  textoBoton: {
    color: '#fff',               // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendamientoCalendario;
