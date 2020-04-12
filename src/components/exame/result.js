import React from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Image, ScrollView, View } from 'react-native';
import { Layout, Button, Card, CardHeader, Text } from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';

function Header({title, description}) {
  return (<CardHeader titleStyle={{fontSize: 18}} title={title} description={description}/>);
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
      Você não parece estar com o novo Coronavírus. 
      Mas fique atento! Mais e mais pessoas estão se 
      contagiando com o decorrer da pandemia então é 
      importante que você continue se cuidando e ficando em casa!
    </Text>
  );
}
function Resultado() {
  const route = useRoute();
  const navigation = useNavigation();
  const {count} = route.params;
  return (
    <Layout style={{flex: 1, justifyContent: 'center', paddingTop: 40}}>
      <Image
        style={count >= 6 ? styles.headerImageSick: styles.headerImageHealthy}
        source={count >= 6 ? require('../../../assets/doente.png') : require('../../../assets/healthy.png')}
      />
      <Card header = {() => <Header title={count >= 6 ? 'Temos más notícias..' : 'Temos boas notícias!'} 
                             description={`Você possui ${count} dos sintomas.`}/>} style={{margin: 8}}>
        <Description sintomas={count}/>
      </Card>
      <View style={styles.footerContainer}>
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
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    padding: 8,
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
    alignSelf: 'center'
  },
  headerImageHealthy: {
    width: 150,
    height: 192,
    alignSelf: 'center'
  },
  footerControl: {
    marginHorizontal: 4,
  },
});

export default Resultado;