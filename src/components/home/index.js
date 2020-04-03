import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import { Layout, Text, Button, Card, CardHeader, Avatar, List, ListItem } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

function Definição() {
  const Header = () => (<CardHeader title='Por que a doença foi batizada de covid-19?'/>);
  return (
    <Card style={styles.card} header={Header} status='primary'>
      <Text>
        "Co" significa corona, "vi" vem de vírus, e "d" representa 
        "doença". O número 19 indica o ano de sua aparição, 2019. 
        Esse nome substitui o de 2019-nCoV, decidido provisoriamente 
        após o surgimento da doença respiratória. O novo nome foi 
        escolhido por ser fácil de pronunciar e não ter referência 
        estigmatizante a um país ou a uma população em particular.
      </Text>
    </Card>
  );
}

function Surgimento() {
  const Header = () => (<CardHeader title='Como surgiu o coronavírus?'/>);
  return (
    <Card style={styles.card} header={Header} status='primary'>
      <Text>
        Novos vírus são descobertos a todo momento. Grande parte pula 
        de outras espécies, onde passam despercebidos, para os humanos. 
        A Sars passou para os humanos a partir de um animal selvagem 
        conhecido como civeta (ou gato-de-algália, parente do guaxinim) 
        que era considerado uma iguaria na região de Guangdong, na China.
      </Text>
    </Card>
  );
}

function Transmissão() {
  const Header = () => (<CardHeader title='Como o coronavírus se transmite?'/>);
  const data = new Array(8).fill({
    sintomas: 'Gotículas de saliva',
    sintomas: 'Espirro',
    sintomas: 'Tosse',
    sintomas: 'Catarro',
    sintomas: 'Contato pessoal próximo (toque ou aperto de mão)',
    sintomas: 'Contato com objetos ou superfícies contaminadas, seguido de contato com a boca, nariz ou olhos.',
  });
  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.sintomas} ${index + 1}`}/>
  );
  return (
    <Card style={styles.card} header={Header} status='primary'>
      <Text>
      A transmissão dos coronavírus costuma ocorrer pelo ar ou por contato pessoal com secreções contaminadas, como:
      </Text>
      <List data={data} renderItem={renderItem}/>
      <Text>
      O vírus pode ficar incubado por duas semanas, período em que os primeiros sintomas levam para aparecer desde a infecção.
      </Text>
    </Card>
  );
}

function Home () {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Layout style={styles.container}>
      <Avatar style={styles.avatar} size='giant' source={require('../../../assets/corona.png')}/>
      <Text style={styles.title}>Corona Vírus</Text>
      <Definição/>
      <Surgimento/>
      <Transmissão/>
      <Button onPress={() => {navigation.navigate('EXAME');}}>REALIZAR EXAME</Button>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'BalooThambi2-Bold',
    margin: 8,
    lineHeight: 24 * 1.2
  },
  container: {
    flex: 1, 
    paddingTop: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 8
  },
  avatar: {
    margin: 8,
    width: 200,
    height: 200
  }
});

export default Home;