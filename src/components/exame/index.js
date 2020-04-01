import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button, Card, CardHeader, Layout, Radio, RadioGroup } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { DATA } from '../../data';
import { genResult } from './result';
const Header = ({title, description}) => <CardHeader title={title} description={description}/>

function ExameList({title, description, id}) {
  const [check, setCheck] = useState(null);
  const toogleCheck = (index) => {index == 0 ? setCheck(0) : setCheck(1); DATA[id-1].index = index; console.log(DATA[id-1].index);}
  return (
  <Card header={() => <Header title={title} description={description}/>} style={styles.card}>
    <RadioGroup selectedIndex={check} onChange={toogleCheck}>
      <Radio text='Sim' status='success'/>
      <Radio text='Não' status='danger'/>
    </RadioGroup>
  </Card>
  );
}

function Exame () {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const test = () => {setCount(count + 1); console.log('count: ', count);}
  var contador;
  return (
    <ScrollView>
      <Layout style={{flex: 1}}>
      <FlatList
        style={styles.flatlist}
        data={DATA}
        renderItem={({ item }) => (<ExameList id={item.id} title={item.title} description={`Pergunta ${item.id}`}/>)}
        keyExtractor={item => item.id}
      />
      <Button style={styles.button} onPress={test
        //setCount(count + 1);
        //setCount(count => count + contador);
        //console.info('count: ', count, 'array:', contador);
        //navigation.navigate('RESULTADO', { count: count});
      }>RESULTADO {count}</Button>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 50,
  },
  button: {
    marginHorizontal: 8,
    marginBottom: 8
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 8
  }
});

export default Exame;
