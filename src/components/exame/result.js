import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Layout, Button, Card, CardHeader, Text } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';

function Header({title, description}) {
  return (<CardHeader title={title} description={description}/>);
}

function Description({sintomas}) {
  return (
    sintomas >= 6 ?
    <Text>
      Em primeiro lugar, sem pânico!{'\n'}{'\n'}
      A doença é muito contagiosa, mas segundo os 
      dados disponíveis, a mortalidade é baixa, 
      principalmente para pacientes jovens e bem de saúde!
      {'\n'}
      A recomendação inicial do Ministério da Saúde é ligar 
      para o número 136 para receber as orientações específicas 
      caso a caso. Há também um aplicativo de celular chamado 
      Coronavírus – SUS, disponível para iOS e Android, que dá 
      o passo a passo em caso de suspeita de infecção.
    </Text>
    :
    <Text>

    </Text>
  );
}
function Resultado() {
  const route = useRoute();
  const navigation = useNavigation();
  const {count} = route.params;
  return (
    <ScrollView>
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Image
      style={count >= 6 ? styles.headerImageSick: styles.headerImageHealthy}
      source={require(count >= 6 ? '../../../assets/doente.png' : '../../../assets/healthy.png')}
    />
    <Card
      header= {() => <Header title={count >= 6 ? 'Temos más notícias..' : 'Temos boas notícias!'} description={`Você possui ${count} dos sintomas.`}/>} style={{margin: 8}}>
      <Description sintomas={count}/>
    </Card>
    <Card style={styles.card} header={() => <CardHeader title='O que é?'/>} status='primary'>
      
    </Card>
    <Layout style={styles.footerContainer}>
    <Button
      size='small'
      status='basic'
      style={styles.footerControl}
      onPress={() => navigation.reset({index: 1, routes: [{ name: 'RESULTADO', params: { count: 0 }}]})}>
      REFAZER EXAME
    </Button>
    <Button
      size='small'
      style={styles.footerControl}
      onPress={() => navigation.reset({index: 0, routes: [{ name: 'RESULTADO', params: { count: 0 }}]})}>
      VOLTAR AO INICIO
    </Button>
    </Layout>
    </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImageSick: {
    width: 250,
    height: 292,
  },
  headerImageHealthy: {
    width: 150,
    height: 192,
  },
  footerControl: {
    marginHorizontal: 4,
  },
});

export default Resultado;
