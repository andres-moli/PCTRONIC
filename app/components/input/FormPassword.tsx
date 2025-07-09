import React from 'react';
import Text from './FormText';
import { Keyboard } from 'react-native';

const FormPassword: React.FC<{ value: string; onChangeText: (text: string) => void; placeholder: string }> = (props) => (
  <Text {...props}   onBlur={Keyboard.dismiss} secureTextEntry={true} />
);

export default FormPassword;
