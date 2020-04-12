import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Select, Text, CardHeader } from '@ui-kitten/components';

export function ConsolidadoEstado({estado, casos}) {
  return (
    <Text style={{textAlign: 'center'}}>
      Estado: {estado}, Casos: {casos}
    </Text>
  );
}

export function Selecionar({options, selectedOption, SelectOption}) {
  return (
    <Select
      style={styles.select}
      data={options}
      size='small'
      status='basic'
      placeholder='Escolha um Estado:'
      selectedOption={selectedOption}
      onSelect={SelectOption}
    />
  );
}

export function CityList({data}) {

  function CardList({cidade, casos}) {
    return (
      <CardHeader title={cidade} description={`Casos: ${casos}`}/>
    );
  }
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <CardList cidade={item.city} casos={item.cases}/>}
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 8
  },
  select: {
    margin: 8
  },
  buttonGroup: {
    margin: 8
  }
});