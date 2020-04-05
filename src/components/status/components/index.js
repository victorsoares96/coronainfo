import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button, ButtonGroup, Select, Layout, Text } from '@ui-kitten/components';

import { getEstados, getPaises, getTotal } from './service';
import { useNavigation, useRoute } from '@react-navigation/native';

export function Header() {
    const navigation = useNavigation();
    return(
        <ButtonGroup style={styles.buttonGroup} status='basic'>
            <Button onPress={() => navigation.navigate('Mundo')}>MUNDO</Button>
            <Button onPress={() => navigation.navigate('Pais')}>PAÍS</Button>
            <Button onPress={() => navigation.navigate('Estado')}>ESTADO</Button>
        </ButtonGroup>
    );
}

export function MundoScreen() {
    return (
      <>
        <ScrollView>
          <Layout style={styles.container}>
            <Text>Mundo Works!</Text>
          </Layout>
        </ScrollView>
      </>
    );
}
  
export function PaisScreen() {
    return (
      <>
        <ScrollView>
          <Layout style={styles.container}>
            <Text>País Works!</Text>
          </Layout>
        </ScrollView>
      </>
    );
  }
  
function getCasosPorEstado(source, state, cases) {
    source.map((item) => {if(item.state == state) { state = item.state; cases = item.cases;}});
}

function Geral() {
  const route = useRoute();
  const { count } = route.params;
  return (
    <Text style={{textAlign: 'center'}}>
      Casos: {count}, Mortes: 0
    </Text>
  );
}

function Selecionar() {
  var options = [{text: 'Escolha um estado:'}];
  const [count, setCount] = useState();
  const data = getEstados();
  const navigation = useNavigation();
    data.map((item) => options.push({text: item.state}));  
    const [selectedOption, setSelectedOption] = React.useState([options[0]]);
    useEffect(() => {
      console.log(Object.values(selectedOption));
      setCount(Object.values(selectedOption));
      navigation.setParams({count: count});
        return () => {
        }
    }, [selectedOption]);
    return (
      <Select
        style={styles.select}
        data={options}
        size='small'
        status='basic'
        placeholder='Escolha um Estado:'
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
    );
}
export function EstadoScreen() {
  //const [count, setCount] = useState();
  return (
    <>
      <ScrollView>
        <Layout style={styles.container}>
          <Selecionar/>
          <Geral/>
        </Layout>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
  },
    select: {
        margin: 8,
    },
    buttonGroup: {
      margin: 8,
    },
});