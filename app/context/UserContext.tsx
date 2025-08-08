import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../graphql/generated/graphql';
import { SESSION_COOKIE_KEY } from '../graphql/client';



// Definir el tipo del contexto que exportaremos
interface UserContextType {
  user: User | null;
  loading: boolean;
  companyId: string | null | undefined
  saveUser: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

// Crear el contexto con un valor inicial vacío (lo rellenaremos en el Provider)
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Definir las props del proveedor
interface UserProviderProps {
  children: ReactNode;
}

// Crear el UserProvider para envolver la aplicación
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [companyId, setcompanyId] = useState<string | null>("");
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_COOKIE_KEY);
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };


  return (
    <UserContext.Provider value={{ user, loading, saveUser, logout, companyId }}>
      {children}
    </UserContext.Provider>
  );
};
