import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import Select, { OptionsSelect } from '../../components/input/Select';
import { useProjectVistsQuery, useVisitTypesQuery, VisitProjectStatusEnum, VisitTypeStatusEnum } from '../../graphql/generated/graphql';

interface VisitType {
  id: string;
  nombre: string;
}

interface VisitTypeSelectorProps {
  onSelect: (visitType: VisitType) => void;
  placeholder?: string;
}

const VisitProjectSelector: React.FC<VisitTypeSelectorProps> = ({ onSelect, placeholder }) => {
  const currentDate = useMemo(() => {
    return new Date().toISOString().split('T')['0']; // o .split('T')[0] si solo quieres la fecha
  }, []); // Solo se evalúa una vez al montar
  const {data, loading, error} = useProjectVistsQuery({
    variables: {
      where: {
        status: {
          _in: [VisitProjectStatusEnum.InProgress]
        },
        endDate: {
          _gte: currentDate
        } 
      }
    },
    pollInterval: 60000, // actualiza cada 60 segundos
    fetchPolicy: 'network-only'
  })

  if (loading) return <ActivityIndicator size="small" color="#000" />;
  if (error) return <Text>{error.message}</Text>;

  const options: OptionsSelect[] = data?.projectVists.map(item => ({
    key: item.id,
    value: item.name
  })) || [];
  return (
    <Select
      options={options}
      placeholder={placeholder || 'Selecciona un tipo de visita'}
      onSelect={(value) => {
        const selected: any = data?.projectVists.find(item => item?.id == value);
        onSelect(selected);
      }}
    />
  );
};

export default VisitProjectSelector;
