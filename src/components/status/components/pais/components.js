import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Select, Text, CardHeader, Card } from '@ui-kitten/components';
import { getFullStateName, formatNumber, formatDate } from '../shared';


export function ConsolidadoPais({casos, mortes, recuperados, ult_atualizacao}) {
  return (
    <>
    <Text style={{fontWeight: '800', fontSize: 22, textAlign: 'center', lineHeight: 24 * 1.2}}>Brasil</Text>
    <Text category='label' appearance='hint' style={styles.caption}>
      Ultima atualização: {formatDate(ult_atualizacao)}
    </Text>
    <Text style={{textAlign: 'center'}}>
      Casos: {formatNumber(casos)},
      Mortes: {formatNumber(mortes)},
      Recuperados: {formatNumber(recuperados)}
    </Text>
    </>
  );
}

export function EstadoList({data}) {

  function Header({estado, populacao}) {

    return (
      <CardHeader 
      title={getFullStateName(estado)} 
      description={`População: ${formatNumber(populacao)}`}/>
    );
  }

  function CardList({estado, populacao, casos, casos_hab, mortes, mortalidade}) {
    return (
      <Card style={styles.card} header={() => <Header estado={estado} populacao={populacao}/>}>
        <Text>
          Casos: {formatNumber(casos)} {'\n'}
          Mortes: {formatNumber(mortes)} {'\n'}
          Mortalidade: {((mortalidade)*100).toFixed(2)}% {'\n'}
          Casos a cada 100 mil habitantes: {casos_hab.toFixed(2)}
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
      keyExtractor={item => item.state}
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
    textAlign: 'center'
  }
});
