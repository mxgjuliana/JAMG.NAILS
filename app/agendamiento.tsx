import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, ScrollView, Platform, Image, FlatList, Pressable } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Menu from '@/components/Menu';
import Volver from '@/components/Menu';

const SERVICIOS: IServicio[] = [
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

const HORAS_DISPONIBLES = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Simulación de días disponibles (en un caso real esto vendría de tu backend)
const FECHAS_DISPONIBLES: Record<string, boolean> = {
  "2025-02-19": true,
  "2025-02-21": false,
  "2025-02-15": true,
  "2025-02-16": true,
};

interface IServicio {
  IdServicio: number,
  Servicio: string,
  Duracion: number,
  Categoria: string
}

interface IDatosAgendamiento {
  IdAgenda: number,
  NombreCliente: string,
  NumeroCelular: string,
  Servicios: IServicio[],
  FechaServicio: string,
  HoraServicio: string,
}

const estadoInicial: IDatosAgendamiento = {
  IdAgenda: 0,
  NombreCliente: '',
  NumeroCelular: '',
  Servicios: [],
  FechaServicio: '',
  HoraServicio: ''
}

export default function AgendamientoCalendario() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [verModal, setVerModal] = useState(false);
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date());
  const [datosAgendamiento, setDatosAgendamiento] = useState<IDatosAgendamiento>(estadoInicial);
  const [showServices, setShowServices] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedServices, setSelectedServices] = useState<IServicio[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [filtrarServicios, setFiltrarServicios] = useState<IServicio[]>(SERVICIOS)

  const generarDíasCalendarios = () => {
    const año = mesSeleccionado.getFullYear();
    const mes = mesSeleccionado.getMonth();
    const primerDia = new Date(año, mes, 1);
    const siguienteDia = new Date(año, mes + 1, 0);
    const dias = [];

    // Ajuste para que la semana comience en lunes (0 = lunes, 6 = domingo)
    let primerDiaSemana = primerDia.getDay() - 1;
    if (primerDiaSemana === -1) primerDiaSemana = 6; // Si es domingo (0), convertir a 6

    // Agregar días del mes anterior para completar la primera semana
    for (let i = primerDiaSemana; i > 0; i--) {
      const fechaa = new Date(año, mes, 1 - i);
      dias.push({ fechaa, disabled: true });
    }

    // Agregar días del mes actual
    for (let fecha = 1; fecha <= siguienteDia.getDate(); fecha++) {
      const fechaCompleta = new Date(año, mes, fecha);
      const fechaTexto = fechaCompleta.toISOString().split('T')[0];
      const estaDisponible = FECHAS_DISPONIBLES[fechaTexto] !== false;
      const esAntesHoy = fechaCompleta.getTime() < new Date().setHours(0, 0, 0, 0);


      console.log(fechaTexto)
      dias.push({
        date: fechaCompleta,
        disabled: esAntesHoy,
        available: estaDisponible,
        fechaTexto: fechaTexto
      });
    }

    return dias;
  };

  const obtenerFranjasTiemposDisponibles = () => {
    if (!fechaSeleccionada) return [];

    const ahora = new Date();
    const esHoy = fechaSeleccionada.toDateString() === ahora.toDateString();

    return HORAS_DISPONIBLES.filter(slot => {
      if (!esHoy) return true;
      const [horas, minutos] = slot.split(':').map(Number);
      const tiempoRanura = new Date();
      tiempoRanura.setHours(horas, minutos, 0, 0);
      return tiempoRanura > ahora;
    });
  };

  const manejarFechaAlPresionar = (fecha: any) => {
    if (fecha.disabled) return;

    const dateString = fecha.date.toISOString().split('T')[0];

    if (!fecha.available) {
      alert('Lo sentimos, no hay disponibilidad para esta fecha');
      return;
    }

    // setFechaSeleccionada(fecha.date);
    console.log(dateString)
    cambioDatosAgendamiento('FechaServicio', dateString)
    // setVerModal(true);
    // setDatosAgendamiento(estadoInicial);
  };

  const agendarServicio = () => {
    if (!datosAgendamiento.NombreCliente || !datosAgendamiento.NumeroCelular || datosAgendamiento.Servicios.length === 0 || !datosAgendamiento.HoraServicio) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Aquí irían las validaciones adicionales y el envío al backend    Alert.alert('¡Éxito!', 'Tu cita ha sido agendada correctamente');
    setVerModal(false);
  };

  const manejarMesAnterior = () => {
    const nuevaFecha = new Date(mesSeleccionado);
    nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
    setMesSeleccionado(nuevaFecha);
  };

  const manejarMesSiguiente = () => {
    const nuevaFecha = new Date(mesSeleccionado);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
    setMesSeleccionado(nuevaFecha);
  };

  useEffect(() => {
    if (isExpanded) {
      const filtro = filtrarServicios.filter(servicio =>
        servicio.Servicio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        servicio.Categoria.toLowerCase().includes(searchQuery.toLowerCase()))
      if (filtro.length > 0) {
        setFiltrarServicios(filtro)

      }

    }
  }, [isExpanded]);

  const renderizarEncabezadoCalendario = () => (
    <View style={styles.encabezadoCalendario}>
      <TouchableOpacity
        onPress={manejarMesAnterior}
        style={styles.botonEncabezado}
      >
        <MaterialIcons name="chevron-left" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.monthContainer}>
        <Text style={styles.textoMes}>
          {mesSeleccionado.toLocaleString('es', { month: 'long', year: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())}
        </Text>
      </View>
      <TouchableOpacity
        onPress={manejarMesSiguiente}
        style={styles.botonEncabezado}
      >
        <MaterialIcons name="chevron-right" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  // const filtrarServicios = SERVICIOS.filter(servicio =>
  //   servicio.Servicio.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   servicio.Categoria.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const toggleService = (servicio: IServicio) => {
    // setDatosAgendamiento({
    //   ...datosAgendamiento,
    //   Servicios: 
    // })
    setDatosAgendamiento(prev => ({
      ...prev,
      Servicios: prev.Servicios.some(s => s.IdServicio === servicio.IdServicio)
        ? prev.Servicios.filter(s => s.IdServicio !== servicio.IdServicio)
        : [...prev.Servicios, servicio]
    }));

  };

  const removeService = (idServicio: number) => {
    setDatosAgendamiento({
      ...datosAgendamiento,
      Servicios: datosAgendamiento.Servicios.filter(s => s.IdServicio !== idServicio)
    })
    setSelectedServices(prev => prev.filter(s => s.IdServicio !== idServicio));
  };

  // const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = datosAgendamiento.Servicios.reduce((sum, service) => sum + service.Duracion, 0);

  const cambioDatosAgendamiento = (
    nombreCampo: keyof IDatosAgendamiento,
    nuevoValor: IDatosAgendamiento[keyof IDatosAgendamiento]
  ) => {
    setDatosAgendamiento((valorActual) => ({ ...valorActual, [nombreCampo]: nuevoValor }));
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Volver ruta={'../inicio'}></Volver>
        <Text style={[{ width: '100%', fontSize: 25, color: '#94c87d', fontWeight: 'bold', textAlign: 'center' }]}>Agenda tu cita</Text>
      </View>

      <Text style={[{ fontSize: 17, marginBottom: 30 }]}>¡Te damos la bienvenida! Elige el mejor servicio y sientete como en casa</Text>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setIsExpanded(true)}
      >
        <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon}
        />
        <Text
          style={styles.searchButtonText}
        >
          {datosAgendamiento.Servicios.length > 0
            ? `${datosAgendamiento.Servicios.length} servicios seleccionados`
            : "Selecciona servicios..."}
        </Text>
        <MaterialIcons
          name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {datosAgendamiento.Servicios.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedServicesScroll}
        >
          {datosAgendamiento.Servicios.map(service => (
            <View key={service.IdServicio}
              style={styles.serviceChip}
            >
              <Text style={styles.chipText}
              >{service.Servicio}</Text>
              <TouchableOpacity
                onPress={() => removeService(service.IdServicio)}
                style={styles.chipRemove}
              >
                <MaterialIcons name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {isExpanded && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecciona Servicios</Text>
              <TouchableOpacity
                onPress={() => setIsExpanded(false)}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar servicio..."
                value={searchQuery}
                onChangeText={(texto) => setSearchQuery(texto)}
                autoFocus
              />
            </View>

            {filtrarServicios.length > 0 ? (
              <ScrollView>
                {filtrarServicios.map((service) => {
                  console.log(filtrarServicios)
                  const isSelected = datosAgendamiento.Servicios.find(s => s.IdServicio === service.IdServicio);
                  return (
                    <TouchableOpacity
                      key={service.IdServicio}
                      style={[styles.serviceItem,
                      isSelected && isSelected.IdServicio !== 0 ? styles.serviceItemSelected : ''
                      ]}
                      onPress={() => toggleService(service)}
                    >
                      <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{service.Servicio}</Text>
                        <Text style={styles.serviceCategory}>{service.Categoria}</Text>
                        <View style={styles.serviceDetails}>
                          <Text style={styles.serviceDuration}>Aprox. {service.Duracion} min</Text>
                        </View>
                      </View>
                      <MaterialIcons
                        name={
                          isSelected && isSelected.IdServicio !== 0 ? "check-circle" :
                            "radio-button-unchecked"}
                        size={24}
                        color={
                          isSelected && isSelected.IdServicio !== 0 ? "#94c87d" :
                            "#666"}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            ) : (<></>)}

            {datosAgendamiento.Servicios.length > 0 && (
              <View style={styles.summary}>
                <View style={styles.summaryDetails}>
                  <Text style={styles.summaryText}>
                    {totalDuration} min
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => setIsExpanded(false)}
                >
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
      {/* <View style={[styles.contenedorEstados, { marginBottom: 20 }]}>
        <View style={[styles.contenedorEstados]}>
          <TouchableOpacity
            style={[styles.botonSocial, { backgroundColor: '#94c87d', marginRight: 5 }]}
            onPress={() => alert('Funcionalidad en desarrollo')}
          >
          </TouchableOpacity>
          <Text >Agendado</Text>
        </View>
        <View style={[styles.contenedorEstados, { marginLeft: 0 }]}>
          <TouchableOpacity
            style={[styles.botonSocial, { backgroundColor: '#333', opacity: 0.1, marginRight: 5 }]}
            onPress={() => alert('Funcionalidad en desarrollo')}
          >
          </TouchableOpacity>
          <Text >No disponible</Text>
        </View>
      </View> */}
      {renderizarEncabezadoCalendario()}
      <View style={styles.diasSemana}>
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, posicion) => (
          <Text key={posicion} style={styles.textoDiaSemana}>{dia}</Text>
        ))}
      </View>

      <View style={styles.calendario}>
        {generarDíasCalendarios().map((dia, posicion) => (
          <TouchableOpacity
            key={posicion}
            style={[
              styles.dia,
              dia.disabled && styles.diaBloqueado,
              !dia.available && !dia.disabled && styles.diaNoDisponible,
              dia.available && !dia.disabled && styles.diaDisponible,
              { backgroundColor: dia.fechaTexto === datosAgendamiento.FechaServicio ? '#94c87d' : '' }]}
            onPress={() => manejarFechaAlPresionar(dia)}
            disabled={dia.disabled || !dia.available}
          >
            <Text style={[
              styles.diaTexto,
              dia.disabled && styles.textoDiaBloqueado,
              !dia.available && !dia.disabled && styles.diaNoDisponibleTexto,
              { color: dia.fechaTexto === datosAgendamiento.FechaServicio ? '#fff' : '' }]}>
              {dia.date && dia.date.getDate()}
            </Text>
            {/* {dia.fechaTexto === datosAgendamiento.FechaServicio && (
              <View style={styles.indicadorDisponible}>
                <Ionicons name="checkmark-circle" size={16} color="" />
              </View>
            )} */}
          </TouchableOpacity>
        ))}

      </View>
      {datosAgendamiento.Servicios.length > 0 && datosAgendamiento.FechaServicio !== null && (
        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
          <View style={styles.timeGrid}>
            {HORAS_DISPONIBLES.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  datosAgendamiento.HoraServicio === time && styles.selectedTime
                  , { margin: 3 }]}
                onPress={() => cambioDatosAgendamiento('HoraServicio', time)}
              >
                <Text style={[
                  styles.timeText,
                  datosAgendamiento.HoraServicio === time && styles.selectedTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      {/* <View style={styles.logoContenedor}>
        <Image
          source={require("../assets/images/logo_recortado_jamg.png")} // Ruta corregida
          style={styles.logo}
        />
      </View> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={verModal}
        onRequestClose={() => setVerModal(false)}
      >
        <View style={styles.contenededorModal}>
          <View style={styles.contenidoModal}>
            <TouchableOpacity
              style={styles.botonCerrar}
              onPress={() => setVerModal(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.tituloModal}>Agendar Cita</Text>
            <Text style={styles.fechaSeleccionada}>
              {fechaSeleccionada?.toLocaleDateString()}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={datosAgendamiento.NombreCliente}
              onChangeText={(text) => cambioDatosAgendamiento('NombreCliente', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              keyboardType="phone-pad"
              value={datosAgendamiento.NumeroCelular}
              onChangeText={(text) => cambioDatosAgendamiento('NumeroCelular', text)}
            />

            {selectedServices.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.selectedServicesScroll}
              >
                {selectedServices.map(service => (
                  <View key={service.IdServicio}
                    style={styles.serviceChip}
                  >
                    <Text style={styles.chipText}
                    >{service.Servicio}</Text>
                    <TouchableOpacity
                      onPress={() => removeService(service.IdServicio)}
                      style={styles.chipRemove}
                    >
                      <MaterialIcons name="close" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* {showServices && (
              <FlatList
                data={SERVICIOS}
                keyExtractor={(servicio, posicion) => posicion.toString()}
                style={styles.menuDesplegable}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => setDatosAgendamiento({ ...datosAgendamiento, Servicios: [...datosAgendamiento.Servicios, item] })}>
                    <Text >{item.Servicio}</Text>
                  </TouchableOpacity>
                )}
              />
            )} */}
            {/* </View>  */}


            {/* <Text style={styles.tituloSeccion}>Horarios disponibles:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.franjasHorarias}>
                {obtenerFranjasTiemposDisponibles().map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.franjaHoraria,
                      datosAgendamiento.HoraServicio === time && styles.franjaHorariaSeleccionada
                    ]}
                    onPress={() => setDatosAgendamiento({ ...datosAgendamiento, HoraServicio: time })}
                  >
                    <Text style={[
                      styles.franjaHorariaTexto,
                      datosAgendamiento.HoraServicio === time && styles.franjaHorariaSeleccionadaTexto
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView> */}

            <TouchableOpacity
              style={styles.agendarBoton}
              onPress={agendarServicio}
            >
              <Text style={styles.agendarBotonTexto}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >
      {datosAgendamiento.Servicios.length > 0 && datosAgendamiento.FechaServicio !== '' && datosAgendamiento.HoraServicio !== '' && (

        <TouchableOpacity
          style={[{
            backgroundColor: '#fff', width: '100%', display: 'flex', alignItems: 'flex-end', flex: 1, // Ocupa toda la pantalla
            justifyContent: "flex-end", position: 'sticky', zIndex: 100, top: 4, left: 0
          }]}
          onPress={() => setVerModal(true)}
        >
          <View style={[{ display: 'flex', flexDirection: 'row' }]}>
            <Text style={[{ color: '#94c87d', fontSize: 20 }]}>Siguiente</Text>
            <MaterialIcons name="chevron-right" size={24} color="#94c87d" />
          </View>
        </TouchableOpacity>
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
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



  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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