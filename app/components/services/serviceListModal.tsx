import React, { FC, useState } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { IService } from '@/app/services/IService';
import { MaterialIcons } from '@expo/vector-icons';
import ServiceItem from './serviceItem';

const SERVICIOS = [
    { IdServicio: 1, Servicio: 'Corte de cabello', Categoria: 'Cabello', Duracion: 30 },
    { IdServicio: 2, Servicio: 'Tinte', Categoria: 'Cabello', Duracion: 120 },
];

interface ServiceListProps {
    servicesSelected: IService[];
    setServicesSelected: React.Dispatch<React.SetStateAction<IService[]>>;
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceListModal: FC<ServiceListProps> = ({ servicesSelected, setServicesSelected, isExpanded, setIsExpanded }) => {
    const [serviceInput, setServiceInput] = useState<string>('');
    //   const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const onSelect = (service: IService) => {
        setServicesSelected([...servicesSelected, service]);
    };

    const filteredServices = SERVICIOS.filter(s =>
        s.Servicio.toLowerCase().includes(serviceInput.toLowerCase())
    );

    const totalDuration = servicesSelected.reduce((sum, service) => sum + service.Duracion, 0);

    return (
        <>
            {isExpanded && (
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Selecciona Servicios</Text>
                            <TouchableOpacity onPress={() => setIsExpanded(false)} style={styles.closeButton}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Buscar servicio..."
                                value={serviceInput}
                                onChangeText={setServiceInput}
                                autoFocus
                            />
                        </View>

                        {filteredServices.length > 0 ? (
                            <ScrollView>
                                {filteredServices.map((service) => {
                                    //   const isSelected = servicesSelected.find(s => s.IdServicio === service.IdServicio);
                                    return (
                                        <ServiceItem isSelected={servicesSelected.some(x => x.IdServicio === service.IdServicio)} onSelect={onSelect} servicio={service}></ServiceItem>
                                        // <TouchableOpacity
                                        //   key={service.IdServicio}
                                        //   style={[
                                        //     styles.serviceItem,
                                        //     isSelected ? styles.serviceItemSelected : {},
                                        //   ]}
                                        //   onPress={() => onSelect(service)}
                                        // >
                                        //   <View style={styles.serviceInfo}>
                                        //     <Text style={styles.serviceName}>{service.Servicio}</Text>
                                        //     <Text style={styles.serviceCategory}>{service.Categoria}</Text>
                                        //     <View style={styles.serviceDetails}>
                                        //       <Text style={styles.serviceDuration}>Aprox. {service.Duracion} min</Text>
                                        //     </View>
                                        //   </View>
                                        //   <MaterialIcons
                                        //     name={isSelected ? "check-circle" : "radio-button-unchecked"}
                                        //     size={24}
                                        //     color={isSelected ? "#94c87d" : "#666"}
                                        //   />
                                        // </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 10 }}>No hay resultados</Text>
                        )}
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
            )}
        </>
    );
};

const styles = StyleSheet.create({
    searchIcon: {
        marginRight: 10,
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
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
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
    serviceDuration: {
        fontSize: 14,
        fontWeight: '600',
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
});

export default ServiceListModal;
