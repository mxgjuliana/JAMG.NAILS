import React, { FC, useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import { IService } from '@/app/services/IService';
import { MaterialIcons } from '@expo/vector-icons';
import ServiceItem from './serviceItem';
import ServiceTag from './serviceTag';

const SERVICIOS = [
    { IdServicio: 1, Servicio: 'Corte de cabello', Categoria: 'Cabello', Duracion: 30 },
    { IdServicio: 2, Servicio: 'Tinte', Categoria: 'Cabello', Duracion: 120 },
];

interface ServiceListProps {
    servicesSelected: IService[];
    setServicesSelected: React.Dispatch<React.SetStateAction<IService[]>>;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    servicesList: IService[];
}

const ServiceListModal: FC<ServiceListProps> = ({ servicesSelected, setServicesSelected, isExpanded, setIsExpanded, servicesList }) => {
    const [serviceInput, setServiceInput] = useState<string>('');
    //   const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const onSelect = (service: IService) => {
        const existService = servicesSelected.some(serviceS => serviceS.IdServicio === service.IdServicio);
        debugger
        if (existService) {
            const updatedServices = servicesSelected.filter(serviceS => serviceS.IdServicio !== service.IdServicio);
            setServicesSelected(updatedServices);
        }
        else {
            setServicesSelected([...servicesSelected, service]);
        }
    };

    let filteredServices = [...servicesList]
    filteredServices = servicesList.filter(s =>
        s.Servicio.toLowerCase().includes(serviceInput.toLowerCase())
    );

    const totalDuration = servicesSelected.reduce((sum, service) => sum + service.Duracion, 0);

    const onRemoveService = (idService: number) => {
        const updatedServices = servicesSelected.filter(serviceS => serviceS.IdServicio !== idService);
        setServicesSelected(updatedServices);
    }

    return (
        <>
            <View>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => setIsExpanded(true)}
                >
                    <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon}
                    />
                    <Text
                        style={styles.searchButtonText}
                    >
                        {servicesSelected.length > 0
                            ? `${servicesSelected.length} servicios seleccionados`
                            : "Selecciona servicios..."}
                    </Text>
                    <MaterialIcons
                        name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                        size={24}
                        color="#666"
                    />
                </TouchableOpacity>
                {servicesSelected.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {servicesSelected.map(service =>
                        (
                            <ServiceTag
                                key={service.IdServicio}
                                label={service.Servicio}
                                colorTag='#94c87d'
                                onRemove={() => onRemoveService(service.IdServicio)} />
                        )
                        )}
                    </ScrollView>

                )}

            </View>
            {isExpanded && (
                <Modal visible={isExpanded} transparent animationType="fade">
                    <View style={styles.overlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>{}</Text>
                                <TouchableOpacity onPress={() => setIsExpanded(false)} style={styles.closeButton}>
                                    <MaterialIcons name="date-range" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>

                            {servicesSelected.length > 0 && (
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
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    searchIcon: {
        marginRight: 10,
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
    searchButtonText: {
        flex: 1,
        fontSize: 16,
        color: '#666',
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        elevation: 5, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
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
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
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
});


export default ServiceListModal;
