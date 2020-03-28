import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button, Card, CardHeader, Layout, Radio, RadioGroup } from '@ui-kitten/components';

import { DATA } from '../../data';

const Header = ({title, description}) => <CardHeader title={title} description={description}/>

function ExameList({title, description, id}) {
  const [check, setCheck] = useState(null);
  const toogleCheck = (index) => {index == 0 ? setCheck(0) : setCheck(1); DATA[id-1].index = index;}
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
  return (
    <ScrollView>
      <Layout style={{flex: 1}}>
      <FlatList
        style={styles.flatlist}
        data={DATA}
        renderItem={({ item }) => (<ExameList id={item.id} title={item.title} description={`Pergunta ${item.id}`}/>)}
        keyExtractor={item => item.id}
      />
      <Button style={styles.button} onPress={() => {DATA.map((data) => console.log(data.index));}}>RESULTADO</Button>
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