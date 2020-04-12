import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

import { ConsolidadoEstado, Selecionar, CityList } from './components';

export function Estado() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(['SP']);
  const [index, setIndex] = useState(0);
    
  const [estado, setEstado] = useState([]);
  const [casos, setCasos] = useState(null);
  const [cidades, setCidades] = useState([]);
  
  useEffect(() => {
    async function loadRepositories() {
      const response = await axios.get('https://api.coronaanalytic.com/journal');
      var options2 = [];
      (response.data.values).map((item, index) => options2.push({text: item.state, index: index}));
      setOptions(options2);
      setEstado((Object.values(selectedOption)).values().next().value.toString());
      setCasos(response.data.values[index].cases);
      setCidades(response.data.values[index].citys);
    }
    loadRepositories();
  }, []);
    
  const SelectOption = (value) => {
    setSelectedOption(value.text);
    setEstado(value.text);
    setIndex(value.index);
  }

  useEffect(() => {
    async function loadConfig() {
      const response = await axios.get('https://api.coronaanalytic.com/journal');
      setCasos(response.data.values[index].cases);
      setCidades(response.data.values[index].citys);
    }
    loadConfig();
  }, [selectedOption]);

  return (
    <>
      <View>
        <Layout style={styles.container}>
          <Selecionar options={options} selectedOption={selectedOption} SelectOption={SelectOption}/>
          <ConsolidadoEstado estado={estado} casos={casos}/>
        </Layout>
      </View>
      <ScrollView>
        <Layout style={styles.container}>
          <CityList data={cidades}/>  
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
  }
});
  