import React, { FC, FunctionComponent, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ServiceItem from './serviceItem';
import { IService } from '@/app/services/IService';
import { MaterialIcons } from '@expo/vector-icons';

const SERVICIOS = [
  { IdServicio: 1, Servicio: 'Corte de cabello', Categoria: 'Cabello', Duracion: 30 },
  { IdServicio: 2, Servicio: 'Tinte', Categoria: 'Cabello', Duracion: 120 },
];

interface ServiceListProps {
  servicesSelected: IService[];
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const ServiceList: FC<ServiceListProps> = ({ servicesSelected, isExpanded, setIsExpanded }) => {

  const [serviceInput, setServiceInput] = useState<string>('');

  return (
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
  );
};

const styles = StyleSheet.create({
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

export default ServiceList;
