import React, { FC, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { IService } from '@/app/services/IService';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'expo-router';

interface ModalConfirmacionProps {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (userData: { nombre: string; celular: string }) => void;
    userLoggedIn?: {
        nombre: string;
        celular: string;
    };
}

const ModalConfirmacion: FC<ModalConfirmacionProps> = ({ isVisible, onClose, onConfirm, userLoggedIn }) => {
    const router = useRouter();
    const { selectedServices, selectedTime, fechaSeleccionada } = useAppContext();
    const totalDuration = selectedServices.reduce((acc, service) => acc + service.Duracion, 0);
    const [nombre, setNombre] = useState(userLoggedIn?.nombre || '');
    const [celular, setCelular] = useState(userLoggedIn?.celular || '');
    const [isEditing, setIsEditing] = useState(!userLoggedIn);
    const [errors, setErrors] = useState({ nombre: '', celular: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const validateFields = () => {
        const newErrors = {
            nombre: nombre.trim() === '' ? 'El nombre es obligatorio' : '',
            celular: celular.trim() === '' ? 'El celular es obligatorio' :
                !/^\d{10}$/.test(celular) ? 'Ingrese un número válido de 10 dígitos' : ''
        };
        setErrors(newErrors);
        return !newErrors.nombre && !newErrors.celular;
    };

    const handleConfirm = () => {
        if (validateFields()) {
            setShowSuccess(true);
            onClose();
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        onConfirm({ nombre, celular });
        if (userLoggedIn) {
            router.push('/misCitas');
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={onClose}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Confirmar Cita</Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.content}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Datos Personales</Text>

                                <View style={styles.inputContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.inputLabel}>Nombre *</Text>
                                        <TextInput
                                            style={[styles.input, errors.nombre ? styles.inputError : null]}
                                            value={nombre}
                                            onChangeText={setNombre}
                                            placeholder="Ingrese su nombre"
                                        />
                                        {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
                                    </View>
                                    <View style={styles.inputWrapper}>
                                        <Text style={styles.inputLabel}>Celular *</Text>
                                        <TextInput
                                            style={[styles.input, errors.celular ? styles.inputError : null]}
                                            value={celular}
                                            onChangeText={setCelular}
                                            placeholder="Ingrese su celular"
                                            keyboardType="phone-pad"
                                            maxLength={10}
                                        />
                                        {errors.celular ? <Text style={styles.errorText}>{errors.celular}</Text> : null}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Servicios Seleccionados</Text>
                                {selectedServices.map((service) => (
                                    <View key={service.IdServicio} style={styles.serviceItem}>
                                        <Text style={styles.serviceName}>{service.Servicio}</Text>
                                        <Text style={styles.serviceDuration}>{service.Duracion} min</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Fecha y Hora</Text>
                                <Text style={styles.dateTime}>
                                    {fechaSeleccionada && formatDate(fechaSeleccionada)}
                                </Text>
                                <Text style={styles.dateTime}>{selectedTime}</Text>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Duración Total</Text>
                                <Text style={styles.totalDuration}>{totalDuration} minutos</Text>
                            </View>
                        </ScrollView>

                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                                <Text style={styles.confirmButtonText}>Confirmar Cita</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={showSuccess}
                transparent
                animationType="fade"
            >
                <View style={styles.overlay}>
                    <View style={[styles.modalContent, styles.successModal]}>
                        <MaterialIcons name="check-circle" size={60} color="#94c87d" style={styles.successIcon} />
                        <Text style={styles.successTitle}>¡Cita Agendada!</Text>
                        <Text style={styles.successMessage}>
                            Tu cita ha sido agendada exitosamente. Revisa tu WhatsApp para recibir los detalles de tu cita.
                        </Text>
                        <TouchableOpacity
                            style={styles.successButton}
                            onPress={handleSuccessClose}
                        >
                            <Text style={styles.successButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    content: {
        maxHeight: '70%',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    serviceName: {
        fontSize: 16,
        color: '#333',
    },
    serviceDuration: {
        fontSize: 16,
        color: '#666',
    },
    dateTime: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    totalDuration: {
        fontSize: 18,
        fontWeight: '600',
        color: '#94c87d',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    cancelButton: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#666',
        flex: 1,
        marginRight: 10,
    },
    confirmButton: {
        backgroundColor: '#94c87d',
        padding: 15,
        borderRadius: 10,
        flex: 2,
    },
    cancelButtonText: {
        color: '#666',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    inputContainer: {
        marginTop: 10,
    },
    inputWrapper: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ff6b6b',
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 12,
        marginTop: 5,
    },
    userInfoContainer: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
    },
    userInfo: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    userInfoLabel: {
        fontWeight: '600',
        width: 80,
        color: '#666',
    },
    userInfoText: {
        flex: 1,
        color: '#333',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    editButtonText: {
        color: '#94c87d',
        marginLeft: 5,
        fontWeight: '600',
    },
    successModal: {
        alignItems: 'center',
        padding: 30,
        maxWidth: '80%',
    },
    successIcon: {
        marginBottom: 20,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    successButton: {
        backgroundColor: '#94c87d',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        minWidth: 150,
    },
    successButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default ModalConfirmacion;
