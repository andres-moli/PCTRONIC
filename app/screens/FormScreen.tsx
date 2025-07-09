import React from 'react';
import { View, StyleSheet } from 'react-native';
import { z } from 'zod';
import Form, { Option } from '../components/Form/Form';

const validationSchema = z.object({
  text: z.string().min(1, 'Text is required'),
  email: z.string().email('Invalid email'),
  number: z.number().min(1, 'Number is required'),
  date: z.date(),
  selector: z.string(),
  checkbox: z.boolean(),
});

const defaultValues = {
  text: '',
  email: '',
  number: '',
  date: new Date(),
  selector: '1',
  checkbox: false,
};

const options: Option[] = [
  { name: 'Option 1', id: '1' },
  { name: 'Option 2', id: '2' },
  { name: 'Option 3', id: '3' },
];
type createFormType = z.infer<typeof validationSchema>;

const FormScreen: React.FC = () => {
  const handleSubmit = (data: any) => {
    console.log('Form data', data);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  const onChangeDate = () => {

  }

  return (
    <View style={styles.container}>
      <Form
        components={{
          text: { type: 'text', placeholder: 'Texto Normal'},
          email: { type: 'email', placeholder: 'Texto de email' },
          textLarge: {type: 'largeText', placeholder: 'Texto largo'},
          number: { type: 'number', placeholder: 'Texto Numerico' },
          date: { type: 'date'},
          selector: { type: 'selector', options, placeholder: 'Selecione una opcion' }, // Pasa las opciones aquí
          checkbox: { type: 'checkbox' },
        }}
        validationSchema={validationSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
  },
});

export default FormScreen;
