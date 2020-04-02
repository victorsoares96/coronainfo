import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button, Card, CardHeader, Layout, Radio, RadioGroup } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import { DATA } from '../../data';

const Header = ({title, description}) => <CardHeader title={title} description={description}/>

var count;

function ExameList({title, description, id}) {
  const [check, setCheck] = useState(null);
  const toogleCheck = (index) => {
    index == 0 ? setCheck(0) : setCheck(1);
    DATA[id-1].index = index;
  }
  return (
  <Card header={() => <Header title={title} description={description}/>} style={styles.card}>
    <RadioGroup selectedIndex={check} onChange={toogleCheck}>
      <Radio text='Sim' status='success'/>
      <Radio text='Não' status='danger'/>
    </RadioGroup>
  </Card>
  );
}

function getCountIndex() {
  count = 0;
  DATA.map((data) => {if(data.index == 0) count = count + 1;});
  return count;
}

function Exame () {
  console.log('entrou');
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Layout style={{flex: 1}}>
      <FlatList
        style={styles.flatlist}
        data={DATA}
        renderItem={({ item }) => (<ExameList id={item.id} title={item.title} description={`Pergunta ${item.id}`}/>)}
        keyExtractor={item => (item.id).toString()}
      />
      <Button style={styles.button} onPress={() => navigation.navigate('RESULTADO', {count: getCountIndex()})}>
        RESULTADO
      </Button>
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
