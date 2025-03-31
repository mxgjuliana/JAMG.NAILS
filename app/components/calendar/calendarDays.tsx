import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CalendarHeader from './calendarHeader';

interface Props {
  mesSeleccionado: Date;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
  manejarMesAnterior: () => void;
  manejarMesSiguiente: () => void;
}

const CalendarDays: React.FC<Props> = ({ mesSeleccionado, onSelectDate, selectedDate, manejarMesAnterior, manejarMesSiguiente }) => {
  const nombresDias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  const generarDias = () => {
    const año = mesSeleccionado.getFullYear();
    const mes = mesSeleccionado.getMonth();

    const primerDiaMes = new Date(año, mes, 1);
    const ultimoDiaMes = new Date(año, mes + 1, 0);

    const dias: { fecha: Date; fueraDeMes: boolean }[] = [];

    // Día de la semana en que empieza el mes (0 = Domingo, 6 = Sábado)
    const primerDiaSemana = (primerDiaMes.getDay() + 6) % 7; // Ajuste para empezar en lunes
    const diasEnMesAnterior = primerDiaSemana;

    // Agregar días del mes anterior
    const mesAnterior = new Date(año, mes, 0);
    for (let i = diasEnMesAnterior; i > 0; i--) {
      dias.push({
        fecha: new Date(año, mes - 1, mesAnterior.getDate() - i + 1),
        fueraDeMes: true
      });
    }

    // Agregar días del mes actual
    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      dias.push({ fecha: new Date(año, mes, i), fueraDeMes: false });
    }

    // Agregar días del mes siguiente para completar las filas
    while (dias.length % 7 !== 0) {
      dias.push({
        fecha: new Date(año, mes + 1, dias.length - ultimoDiaMes.getDate() - diasEnMesAnterior + 1),
        fueraDeMes: true
      });
    }

    return dias;
  };

  const formatearFecha = (fecha: Date) => fecha.toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <View style={styles.encabezadoMes}>
        <CalendarHeader
          mesSeleccionado={mesSeleccionado}
          manejarMesAnterior={manejarMesAnterior}
          manejarMesSiguiente={manejarMesSiguiente}
        />
      </View>
      
      {/* Encabezado con los días de la semana */}
      <View style={styles.encabezado}>
        {nombresDias.map((dia, index) => (
          <Text key={index} style={styles.encabezadoTexto}>{dia}</Text>
        ))}
      </View>

      {/* Días del calendario */}
      <View style={styles.diasContainer}>
        {generarDias().map(({ fecha, fueraDeMes }, index) => {
          const esSeleccionado = selectedDate && formatearFecha(fecha) === formatearFecha(selectedDate);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectDate(fecha)}
              style={[styles.dia, esSeleccionado && styles.diaSeleccionado]}
            >
              <Text
                style={[
                  styles.diaTexto,
                  fueraDeMes && styles.diaTextoFueraDeMes,
                  esSeleccionado && styles.diaTextoSeleccionado
                ]}
              >
                {fecha.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  encabezadoMes: {
    width: '100%'
  },
  encabezado: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
  encabezadoTexto: {
    flex: 1, // Hace que cada texto ocupe un espacio igual
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  dia: {
    width: '14%', // Ancho fijo para asegurar 7 columnas exactas
    height: 50, // Asegura que cada día sea un cuadrado
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaSeleccionado: {
    backgroundColor: '#94c87d',
    borderRadius: 50, // Hace el fondo seleccionado redondo
    // width: 40,
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diaTexto: {
    fontSize: 16,
    color: '#333',
  },
  diaTextoSeleccionado: {
    color: '#fff',
  },
  diaTextoFueraDeMes: {
    color: '#bbb',
  },
});

export default CalendarDays;
