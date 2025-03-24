import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  mesSeleccionado: Date;
  onSelectDate: (date: Date) => void;
}

const CalendarDays: React.FC<Props> = ({ mesSeleccionado, onSelectDate }) => {
  const generarDias = () => {
    const año = mesSeleccionado.getFullYear();
    const mes = mesSeleccionado.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const dias = [];

    for (let fecha = 1; fecha <= ultimoDia.getDate(); fecha++) {
      dias.push(new Date(año, mes, fecha));
    }

    return dias;
  };

  return (
    <View style={styles.container}>
      {generarDias().map((fecha, index) => (
        <TouchableOpacity key={index} onPress={() => onSelectDate(fecha)} style={styles.dia}>
          <Text>{fecha.getDate()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', backgroundColor: '#fff' },
  day: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, margin: 2 },
  encabezado: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center'
    // justifyContent: 'space-between'
  },
  encabezadoCalendario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  botonEncabezado: {
    padding: 8,
  }, monthContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textoMes: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  diasSemana: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  textoDiaSemana: {
    color: '#666',
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  calendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dia: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  diaTexto: {
    fontSize: 16,
    color: '#333',
  },
  diaBloqueado: {
    opacity: 0.3,
  },
  textoDiaBloqueado: {
    color: '#999',
  },
  diaNoDisponible: {
    // backgroundColor: '#ffebee',
    borderRadius: 20,
    opacity: 0.3,
  },
  diaNoDisponibleTexto: {
    color: '#999',
  },
  diaDisponible: {
    // backgroundColor: '#e8f5e9',
    borderRadius: 20,
  },
  indicadorDisponible: {
    position: 'absolute',
    bottom: 2,
  },
  contenededorModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contenidoModal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  botonCerrar: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  tituloModal: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  fechaSeleccionada: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  menuDesplegable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  menuDesplegableTexto: {
    fontSize: 16,
    color: '#333',
  },

  tituloSeccion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  franjasHorarias: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  franjaHoraria: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  franjaHorariaSeleccionada: {
    backgroundColor: '#94c87d',
  },
  franjaHorariaTexto: {
    color: '#333',
    fontSize: 14,
  },
  franjaHorariaSeleccionadaTexto: {
    color: 'white',
  },
  agendarBoton: {
    backgroundColor: '#94c87d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  agendarBotonTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSocial: {
    width: 15,
    height: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
  },
  contenedorEstados: {
    display: 'flex',
    width: 100,
    flexDirection: 'row',
    marginRight: 3,
    alignItems: 'center'
    // justifyContent: 'space-around'
  },
  logoContenedor: {
    alignItems: "center",
    flex: 1, // Ocupa toda la pantalla
    justifyContent: "flex-end",
    backgroundColor: '100%'
    // paddingBottom: 10, // Espacio desde la parte inferior
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },



  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 7,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    // shadowColor: '#fcfcf',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    elevation: 5,
  },
  selectedServicesScroll: {
    maxHeight: 35,
    marginBottom: 20,
    marginTop: 10
  },

  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b9daa9',
    borderRadius: 20,
    // padding: 4,
    paddingRight: 12,
    paddingLeft: 12,
    marginRight: 8,
    paddingBottom: 0,
    paddingTop: 0
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
  },
  chipRemove: {
    padding: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 7,
    marginBottom: 20,
    // marginTop: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  servicesList: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceItemSelected: {
    backgroundColor: '#eef4eb',
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  serviceCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  serviceDetails: {
    flexDirection: 'row',
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f48fb1',
    marginRight: 10,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryDetails: {
    flex: 1,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#94c87d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  timeSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  timeSlot: {
    width: '23%',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  selectedTime: {
    backgroundColor: '#94c87d',
  },
  timeText: {
    color: '#666',
  },
  selectedTimeText: {
    color: '#fff',
  },
  bookButton: {
    backgroundColor: '#94c87d',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CalendarDays;
