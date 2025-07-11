import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [correo, setCorreo] = useState(null);
  const [nombre, setNombre] = useState(null);


  return (
    <AuthContext.Provider 
      value={{ role, setRole, correo, setCorreo, nombre, setNombre }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usarlo fácilmente
export function useAuth() {
  return useContext(AuthContext);
}