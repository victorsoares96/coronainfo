import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import { Layout, Text, Button, Card, CardHeader, Avatar } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const Header = () => (<CardHeader title='O que é?'/>);
const Header2 = () => (<CardHeader title='Sintomas'/>);

function Home () {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Layout style={styles.container}>
      <Avatar style={styles.avatar} size='giant' source={require('../../../assets/corona.png')}/>
      <Text style={styles.title}>Corona Vírus</Text>
      <Card style={styles.card} header={Header} status='primary'>
        <Text>
        "Coronavírus" é na verdade o nome dado a um grupo 
        de vírus pertencentes à mesma família, a Coronaviridae, 
        que são responsáveis por infecções respiratórias que 
        podem ser leves ou bastante graves dependendo do 
        coronavírus responsável pela infecção.{"\n"}{"\n"}
        
        Os casos mais graves desta infecção parecem afetar 
        especialmente pessoas idosas com idade superior a 60 anos, 
        mas o vírus pode afetar pessoas de todas as idades, sendo, 
        por isso, muito importante ficar atento ao surgimento de 
        sintomas que possam indicar a infecção, especialmente febre 
        alta, tosse persistente e dificuldade para respirar.
        </Text>
      </Card>
  
      <Card style={styles.card} header={Header2} status='primary'>
        <Text>
        Os sintomas da infecção COVID-19 parecem variar de uma simples 
        gripe até uma infecção mais grave, por isso, se acha que pode 
        estar infectado, por favor, responda às seguintes perguntas para 
        saber qual o seu risco:{'\n'}{'\n'}
        </Text>
        <Button onPress={() => {navigation.navigate('EXAME');}}>REALIZAR EXAME</Button>
      </Card>
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