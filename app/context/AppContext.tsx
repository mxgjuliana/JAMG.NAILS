import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { IService } from '../services/IService';

interface AppContextType {
  selectedServices: IService[];
  setSelectedServices: Dispatch<SetStateAction<IService[]>>;
  selectedTime: string | null;
  setSelectedTime: Dispatch<SetStateAction<string | null>>;
  fechaSeleccionada: Date | null;
  setFechaSeleccionada: Dispatch<SetStateAction<Date | null>>;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState<IService[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{
      selectedServices,
      setSelectedServices,
      selectedTime,
      setSelectedTime,
      fechaSeleccionada,
      setFechaSeleccionada,
      isExpanded,
      setIsExpanded
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
}; 