import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Text from '../input/FormText';
import LargeText from '../input/FormLargeText';
import Email from '../input/FormEmail';
import Number from '../input/FormNumber';
import DateInput from '../input/FormDateInput';
import Selector from '../input/FormSelector';
import Checkbox from '../input/FormCheckBox';
import FormButton from '../input/FormButton';
import FormCancelButton from '../input/FormButtonCanceld';

type ComponentMap = {
  [key: string]: React.FC<any>;
};

const componentMap: ComponentMap = {
  text: Text,
  largeText: LargeText,
  email: Email,
  number: Number,
  date: DateInput,
  selector: Selector,
  checkbox: Checkbox,
};

export interface Option {
  name: string;
  id: string;
}

interface FormProps {
  components: { [key: string]: { type: string, placeholder?: string, options?: Option[] }};
  validationSchema: z.ZodType<any>;
  defaultValues: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({ components, validationSchema, defaultValues, onSubmit, onCancel }) => {
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  return (
    <FormProvider {...methods}>
      <View style={styles.formContainer}>
        {Object.entries(components).map(([name, { type, options, placeholder }]) => {
          const Component = componentMap[type];
          return (
          <Controller
            key={name}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => {
              const Component = componentMap[type];

              // Si es un componente de fecha, pasar onChange como onChangeDate
              if (type === 'date') {
                return (
                  <Component
                    value={value}
                    onChangeDate={(date: Date) => onChange(date)} // Mapea onChange de React Hook Form
                    onBlur={onBlur}
                    {...(placeholder && { placeholder })}
                  />
                );
              }
              return (
                <Component
                  value={value}
                  onChangeText={onChange}
                  onValueChange={onChange}
                  onBlur={onBlur}
                  {...(placeholder && { placeholder })}
                  options={options} // Solo si el componente tiene opciones
                />
              );
            }}
          />
          );
        })}
        <FormButton title="Enviar" onPress={methods.handleSubmit(onSubmit)} />
        <FormCancelButton title="Cancel" onPress={onCancel}/>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
});

export default Form;
