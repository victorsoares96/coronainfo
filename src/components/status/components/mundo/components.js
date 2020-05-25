import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Select, Text, CardHeader, Card } from '@ui-kitten/components';

function formatNumber (num) {
  return new Intl.NumberFormat().format(num);
}

export function ConsolidadoMundo({casos, mortes, recuperados}) {
  return (
    <>
    <Text style={{fontWeight: '800', fontSize: 22, textAlign: 'center', lineHeight: 24 * 1.2}}>Mundo</Text>
    <Text style={{textAlign: 'center'}}>
      Casos: {formatNumber(casos)}, 
      Mortes: {formatNumber(mortes)}, 
      Recuperados: {formatNumber(recuperados)}
    </Text>
    </>
  );
}

export function Selecionar({options, selectedOption, SelectOption}) {
  return (
    <Select
      style={styles.select}
      data={options}
      size='small'
      status='basic'
      disabled
      placeholder={selectedOption}
      selectedOption={selectedOption}
      onSelect={SelectOption}
    />
  );
}

export function WorldList({data}) {

  function Header({pais, provincia}) {
    return (
      <CardHeader title={pais} description={`Província: ${provincia}`}/>
    );
  }

  function CardList({pais, provincia, casos, mortes, recovered}) {
    const mortalidade = ((mortes/casos)*100).toFixed(2);
    const tx_recovered = ((recovered/casos)*100).toFixed(2);
    return (
      <Card style={styles.card} header={() => <Header pais={pais} provincia={provincia}/>}>
        <Text>
          Casos: {formatNumber(casos)} {'\n'}
          Mortes: {formatNumber(mortes)} {'\n'}
          Mortalidade: {mortalidade}% {'\n'}
          Recuperações: {formatNumber(recovered)} {'\n'}
          Taxa de Recuperações: {tx_recovered}%
        </Text>
      </Card>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
      <CardList pais={item.countryregion} provincia={item.provincestate == '' ? 'Nenhuma' : item.provincestate}
                casos={item.confirmed} mortes={item.deaths} recovered={item.recovered}/>}
      keyExtractor={item => (item.id)}
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
