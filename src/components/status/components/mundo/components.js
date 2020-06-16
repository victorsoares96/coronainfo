import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, CardHeader, Card, Input } from '@ui-kitten/components';
import { formatNumber } from '../shared';

export function ConsolidadoMundo({casos, mortes, recuperados, ult_atualizacao}) {
  return (
    <>
    <Text category='h4' style={styles.text}>Mundo</Text>
    <Text category='label' appearance='hint' style={styles.text}>
      Ultima atualização: {new Date(ult_atualizacao).toLocaleDateString('pt-BR')}
    </Text>
    <Text style={styles.text}>
      Casos: {formatNumber(casos)},
      Mortes: {formatNumber(mortes)},
      Recuperados: {formatNumber(recuperados)}
    </Text>
    </>
  );
}

export function Procurar({ onInputChanges }) {
  return (
    <Input
      style={{margin: 8}}
      size='small'
      status='basic'
      placeholder='Procurar País:'
      onKeyPress={onInputChanges}
    />
  );
}

export function MundoLista({data}) {

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
      keyExtractor={item => ((item.location.lat+item.location.lng)/item.confirmed).toString()}
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
  text: {
    textAlign: 'center'
  }
});
