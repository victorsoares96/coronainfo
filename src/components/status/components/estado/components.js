import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Select, Text, CardHeader, Card } from '@ui-kitten/components';

function formatNumber (num) {
  return new Intl.NumberFormat().format(num);
}

export function ConsolidadoEstado({estado, casos, mortes}) {
  return (
    <Text style={{textAlign: 'center'}}>
      Estado: {estado}, Casos: {formatNumber(casos)}, Mortes: {formatNumber(mortes)}
    </Text>
  );
}

export function Selecionar({options, selectedOption, SelectOption, ult_Att}) {
  return (
  <>
    <Text category='label' appearance='hint' style={styles.text}>
      Ultima atualização {new Date(ult_Att).toLocaleDateString()}
    </Text>
    <Select
      style={styles.select}
      data={options}
      size='small'
      status='basic'
      placeholder='Escolha um Estado:'
      selectedOption={selectedOption}
      onSelect={SelectOption}
    />
  </>
  );
}

export function CityList({data}) {

  function Header({cidade, populacao}) {
    return (
      <CardHeader 
      title={cidade} 
      description={`População: ${formatNumber(populacao)}`}/>
    );
  }

  function CardList({cidade, populacao, casos, casos_hab, mortes, mortalidade}) {
    return (
      <Card style={styles.card} header={() => <Header cidade={cidade} populacao={populacao}/>}>
        <Text>
          Casos: {formatNumber(casos)} {'\n'}
          Mortes: {formatNumber(mortes)} {'\n'}
          Mortalidade: {((mortalidade)*100).toFixed(2)}% {'\n'}
          Casos a cada 100 mil habitantes: {formatNumber(casos_hab)}
        </Text>
      </Card>
    );
  }

  return (
    <FlatList
      data={data}
      initialNumToRender={25}
      renderItem={({ item }) =>
      <CardList cidade={item.city} populacao={item.estimated_population_2019}
                casos={item.last_available_confirmed} casos_hab={item.last_available_confirmed_per_100k_inhabitants}
                mortes={item.last_available_deaths} mortalidade={item.last_available_death_rate}/>}
      keyExtractor={item => item.city_ibge_code}
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
  },
  text: {
    textAlign: 'center'
  },
  card: {
    marginVertical: 8
  },
});