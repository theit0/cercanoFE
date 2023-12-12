import React, { createContext, useContext, useState, FC } from 'react';
import { Categoria } from '../types/Categoria';

// Crear el contexto
interface CategoriaContextType {
  categoriaSeleccionada: Categoria | null;
  setCategoriaSeleccionada: React.Dispatch<React.SetStateAction<Categoria | null>>;
}

const CategoriaContext = createContext<CategoriaContextType>({
  categoriaSeleccionada: null,
  setCategoriaSeleccionada: () => {},
});

type CartProviderProps = {
    children: React.ReactNode;
};


// Proveedor del contexto para envolver la aplicación
export const CategoriaProvider:FC<CartProviderProps> = ({ children }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

  return (
    <CategoriaContext.Provider value={{ categoriaSeleccionada, setCategoriaSeleccionada }}>
      {children}
    </CategoriaContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useCategoria = () => {
  const context = useContext(CategoriaContext);
  if (!context) {
    throw new Error('useCategoria debe usarse dentro de un CategoriaProvider');
  }
  return context;
};
