// src/context/ColorContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, ReactNode } from 'react';

// Definimos la interfaz de la paleta de colores
interface ColorPalette {
  primary: string;
  darkGray: string;
  white: string;
  softYellow: string;
  coral: string;
  lightPink: string;
  lightBeige: string;
}

// Paletas de colores
const colorsBlue: ColorPalette = {
  primary: '#4A90E2',
  darkGray: '#4B4B4B',
  white: '#FFFFFF',
  softYellow: '#F6EB61',
  coral: '#B0C4DE',
  lightPink: '#B0E0E6',
  lightBeige: '#F7F7F7',
};
const colorsBlue2: ColorPalette = {
  primary: "#007BFF",      // Azul vibrante como color principal
  darkGray: "#2C3E50",     // Gris oscuro, para texto y detalles
  white: "#FFFFFF",        // Blanco puro
  softYellow: "#5DADE2",     // Azul suave, más apagado
  coral: "#FF6F61",        // Coral con un toque más frío, ajustado al tema
  lightPink: "#ADD8E6",    // Azul claro, sutil y fresco
  lightBeige: "#F0F8FF",   // Beige claro con tonos azules
};
const colorsPink: ColorPalette = {
  primary: '#ff4757',
  darkGray: '#4B4B4B',
  white: '#FFFFFF',
  softYellow: '#FFD60A',
  coral: '#FF6F61',
  lightPink: '#FF9F9D',
  lightBeige: '#F7F7F7',
};

const colorsBrown: ColorPalette = {
  primary: '#8B4513',
  darkGray: '#4B4B4B',
  white: '#FFFFFF',
  softYellow: '#FFD60A',
  coral: '#F4A460',
  lightPink: '#D2691E',
  lightBeige: '#F7F7F7',
};

const colorsGreen: ColorPalette = {
  primary: '#4CAF50',     // Verde primario (Tono principal)
  darkGray: '#4B4B4B',    // Gris oscuro
  white: '#FFFFFF',       // Blanco
  softYellow: '#D4E157',  // Amarillo suave (Verde lima suave)
  coral: '#81C784',       // Verde coral (Verde pastel)
  lightPink: '#A5D6A7',   // Verde claro (Tono de menta)
  lightBeige: '#F1F8E9',  // Beige claro (Tono verde claro)
};
const colorsRed: ColorPalette = {
  primary: '#E53935',     // Rojo primario (Rojo intenso)
  darkGray: '#4B4B4B',    // Gris oscuro
  white: '#FFFFFF',       // Blanco
  softYellow: '#FFB74D',  // Amarillo suave (Tono anaranjado suave)
  coral: '#FF6F61',       // Coral (Tono rojizo anaranjado)
  lightPink: '#FFCDD2',   // Rosa claro (Tono pastel rojizo)
  lightBeige: '#FFEDEB',  // Beige claro (Beige con matiz rosado)
};

const colorsPurple: ColorPalette = {
  primary: '#7E57C2',     // Morado principal (Morado suave y vibrante)
  darkGray: '#4B4B4B',    // Gris oscuro
  white: '#FFFFFF',       // Blanco
  softYellow: '#EFD680',  // Amarillo suave (Tono dorado pastel)
  coral: '#CE93D8',       // Coral (Rosa púrpura claro)
  lightPink: '#E1BEE7',   // Rosa claro (Pastel lila)
  lightBeige: '#F3E5F5',  // Beige claro (Beige con un matiz lavanda)
};
const getColor = async () =>{
  const jsonValue = await AsyncStorage.getItem("typeColor");
  if(jsonValue == 'Azul Claro'){
    return colorsBlue
  }
}
// Hook personalizado para acceder al contexto
export const useColor = () =>{
    return {
        color: colorsBlue2
    }
};
