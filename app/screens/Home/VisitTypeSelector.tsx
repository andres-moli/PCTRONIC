import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Select, { OptionsSelect } from '../../components/input/Select';
import { useVisitTypesQuery, VisitTypeStatusEnum } from '../../graphql/generated/graphql';

interface VisitType {
  id: string;
  nombre: string;
}

interface VisitTypeSelectorProps {
  onSelect: (visitType: VisitType) => void;
  placeholder?: string;
}

const VisitTypeSelector: React.FC<VisitTypeSelectorProps> = ({ onSelect, placeholder }) => {
  const {data, loading, error} = useVisitTypesQuery({
    fetchPolicy: 'no-cache'
  })

  if (loading) return <ActivityIndicator size="small" color="#000" />;
  if (error) return <Text>{error.message}</Text>;

  const options: OptionsSelect[] = data?.visitTypes.filter((type) => type.status ==  VisitTypeStatusEnum.Active).map(item => ({
    key: item.id,
    value: item.name
  })) || [];
  return (
    <Select
      options={options}
      placeholder={placeholder || 'Selecciona un tipo de visita'}
      onSelect={(value) => {
        const selected: any = data?.visitTypes.find(item => item?.id == value);
        onSelect(selected);
      }}
    />
  );
};

export default VisitTypeSelector;
