import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Select2 from 'react-native-select-two';

interface SelectorProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { name: string; id: string }[];
  placeholder?: string;
  style?: object;
}

const FormSelector: React.FC<SelectorProps> = ({ selectedValue, onValueChange, placeholder, options, style }) => {
  const [selected, setSelected] = useState(selectedValue);

  const handleSelection = (value: string) => {
    setSelected(value);
    onValueChange(value);
  };

  return (
    <View style={[styles.container, style]}>
         <Select2
          isSelectSingle
          style={{ borderRadius: 5 }}
          colorTheme="black"
          popupTitle={placeholder}
          title={placeholder}
          data={[
            { id: 1, name: "React Native Developer"}, // set default checked for render option item
            { id: 2, name: "Android Developer" },
            { id: 3, name: "iOS Developer" }
          ]}
          onSelect={(value)=> {
            onValueChange(value?.toString())
          }}
          cancelButtonText={'Cancelar'}
          selectButtonText={'Selecionar'}
          searchPlaceHolderText={'Buscar...'}
          listEmptyTitle={'No se encontro resultados'}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  select: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
});

export default FormSelector;
