import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import {
  Button,
  Card,
  CardHeader,
  Text,
  Layout,
  Radio,
  RadioGroup
} from '@ui-kitten/components';

const Header = ({title, description}) => <CardHeader title={title} description={description}/>

const Footer = () => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      size='small'>
      ACCEPT
    </Button>
  </View>
);

const DATA = [
  {
    id: 1,
    description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    answer: 'dfsdfdf'
  },
  {
    id: 2,
    description: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    answer: 'dfsdfdf'
  },
  {
    id: 3,
    description: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    answer: 'dfsdfdf'
  },
];

function ExameList({answer, title, description, onCheckedChange, count}) {
  return (<Card header={() => <Header title={title} description={description}/>} style={styles.card}>
    <Text category='h6'>{answer} {count}</Text>
    <RadioGroup selectedIndex={count} onChange={onCheckedChange}>
      <Radio text='Sim' status='success'/>
      <Radio text='Não' status='danger'/>
    </RadioGroup>
  </Card>);
}
function Exame () {
  const onCheckedChange = (index) => { index == 0 ? setSelectedIndex('Sim') : setSelectedIndex('Não')};
  const [selectedIndex, setSelectedIndex] = useState('Sim');
  const [count, setCount] = useState(null);
  useEffect(() => {
    if(count == 1) setCount(0); else setCount(1);
    console.log('count', count, '\n', 'selectedIndex:', selectedIndex);
    return () => {}
  }, [selectedIndex]);

  return (
    <ScrollView>
      <Layout style={{flex: 1}}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <ExameList count={count} onCheckedChange={onCheckedChange} answer={item.answer} title={item.title} description={`Pergunta ${item.id}`}/>}
        keyExtractor={item => item.id}
      />
      </Layout>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 8
  },
  text: {
    marginVertical: 8,
  },
  radio: {
    marginVertical: 8,
  },
});
export default Exame;