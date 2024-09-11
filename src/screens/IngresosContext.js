import React, { createContext, useState, useContext } from 'react';

const IngresosContext = createContext();

export const IngresosProvider = ({ children }) => {
  const [ingresos, setIngresos] = useState([]);

  return (
    <IngresosContext.Provider value={{ ingresos, setIngresos }}>
      {children}
    </IngresosContext.Provider>
  );
};

export const useIngresos = () => useContext(IngresosContext);
