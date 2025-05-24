import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Cita {
    id: number;
    fecha: Date;
    hora: string;
    servicios: string[];
    duracion: number;
    estado: 'confirmada' | 'cancelada';
}

const MisCitas = () => {
    const navigation = useNavigation<DrawerNavigationProp<any>>();

    // Simulación de citas (reemplazar con datos reales)
    const citas: Cita[] = [
        {
            id: 1,
            fecha: new Date('2024-03-20'),
            hora: '15:00',
            servicios: ['Corte de cabello', 'Tinte'],
            duracion: 150,
            estado: 'confirmada'
        },
        // Agregar más citas de ejemplo
    ];

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCancelarCita = (id: number) => {
        // Implementar lógica de cancelación
        console.log('Cancelar cita:', id);
    };

    return (
        <View style={styles.container}>
            
            <ScrollView style={styles.content}>
                {citas.map((cita) => (
                    <View key={cita.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.fecha}>{formatDate(cita.fecha)}</Text>
                            <Text style={styles.hora}>{cita.hora}</Text>
                        </View>
                        <View style={styles.serviciosContainer}>
                            {cita.servicios.map((servicio, index) => (
                                <Text key={index} style={styles.servicio}>
                                    • {servicio}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.cardFooter}>
                            <Text style={styles.duracion}>Duración: {cita.duracion} min</Text>
                            {cita.estado === 'confirmada' && (
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleCancelarCita(cita.id)}
                                >
                                    <MaterialIcons name="cancel" size={20} color="#ff6b6b" />
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    fecha: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    hora: {
        fontSize: 16,
        color: '#666',
    },
    serviciosContainer: {
        marginBottom: 12,
    },
    servicio: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 12,
    },
    duracion: {
        fontSize: 14,
        color: '#666',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    cancelButtonText: {
        color: '#ff6b6b',
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default MisCitas; 