import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { Button, ButtonGroup, Select, Layout, Text } from '@ui-kitten/components';

import { getEstados, getPaises, getTotal } from './service';
import { useNavigation } from '@react-navigation/native';

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
    const data = [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' },
      ];
      const [selectedOption, setSelectedOption] = useState(data[0]);
      useEffect(() => {
          setSelectedOption('true');
          return () => {
            
          }
      }, [selectedOption]);
      console.log(selectedOption);
    return (
      <>
        <ScrollView>
          <Layout style={styles.container}>
    <Text>Mundo Works!</Text>
            <Select
        data={data}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
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
export function EstadoScreen() {
    const data = getEstados();
    var options = [];
    data.map((item) => options.push({text: item.state}));  
    const [selectedOption, setSelectedOption] = React.useState(null);
    useEffect(() => {
        console.log(selectedOption);
        return () => {
        }
    }, [selectedOption]);
    data.map((item) => console.log('Estado: ', item.state, 'Casos: ', item.cases, 'Cidades: ', item.citys));
    //getCasosPorEstado(data, 'SP', estado, casos);
    return (
      <>
        <ScrollView>
          <Layout style={styles.container}>
          <Select
        style={styles.select}
        data={options}
        size='small'
        status='basic'
        placeholder='Escolha um Estado:'
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />
          </Layout>
        </ScrollView>
      </>
    );
}

const styles = StyleSheet.create({
    select: {
        margin: 8,
    },
    buttonGroup: {
      margin: 8,
    },
});