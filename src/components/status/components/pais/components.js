import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Select, Text, CardHeader, Card, Tooltip } from '@ui-kitten/components';

export function ConsolidadoPais({pais, casos, mortes, recuperados}) {
  return (
      <>
    <Text style={{fontWeight: '800', fontSize: 22, textAlign: 'center', lineHeight: 24 * 1.2}}>Brasil</Text>
    <Text style={{textAlign: 'center'}}>
      Casos: {casos}, Mortes: {mortes}, Recuperados: {recuperados}
    </Text>
    </>
  );
}

export function Selecionar({options, selectedOption, SelectOption}) {
  return (
    <>
    <Text style={styles.caption}>Disponível apenas no Brasil por enquanto!</Text>
    <Select
      style={styles.select}
      //data={options}
      disabled
      size='small'
      status='basic'
      placeholder='Brasil'
      //selectedOption={selectedOption}
      //onSelect={SelectOption}
    />
    </>
  );
}

export function EstadoList({data}) {

  function Header({estado, populacao}) {
    function formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "1.")
    }
    return (
      <CardHeader title={estado} description={`População: ${formatNumber(populacao)}`}/>
    );
  }

  function CardList({estado, populacao, casos, casos_hab, mortes, mortalidade}) {
    return (
      <Card style={styles.card} header={() => <Header estado={estado} populacao={populacao}/>}>
        <Text>
          Casos: {casos} {'\n'}
          Casos por Habitante: {casos_hab.toFixed(2)} {'\n'}
          Mortes: {mortes} {'\n'}
          Mortalidade: {((mortalidade)*100).toFixed(2)}%
        </Text>
      </Card>
    );
  }
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => 
      <CardList estado={item.state} populacao={item.estimated_population_2019} 
                casos={item.confirmed} casos_hab={item.confirmed_per_100k_inhabitants}
                mortes={item.deaths} mortalidade={item.death_rate}/>}
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
  card: {
      marginVertical: 8
  },
  buttonGroup: {
    margin: 8
  },
  caption: {
    fontWeight: '100',
    color: 'grey',
    fontSize: 12,
    textAlign: 'center'
  }
});