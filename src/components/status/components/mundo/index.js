import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

import { Selecionar, ConsolidadoMundo } from './components';

export function Mundo() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(['Brazil']);
  const [index, setIndex] = useState(0);
    
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [paises, setPaises] = useState([]);

  const SelectOption = (value) => {
    setSelectedOption(value.text);
    setIndex(value.index);
  }

  useEffect(() => {
    async function loadRepositories() {
      const response = await axios.get(`https://coronavirus-tracker-api.herokuapp.com/v2/locations`);
      response.data.locations.map((item, index) => 
        setOptions(options => 
          options.concat({text: `${item.country}, Provincia: ${item.province}`, index: index})
        )
      );
      setCasos(response.data.latest.confirmed);
      setMortes(response.data.latest.deaths);
      setRecovered(response.data.latest.recovered);
      /*var options2 = [];
      (response.data.values).map((item, index) => options2.push({text: item.state, index: index}));
      setOptions(options2);
      setEstado((Object.values(selectedOption)).values().next().value.toString());
      setCasos(response.data.values[index].cases);
      setCidades(response.data.values[index].citys);*/
    }
    loadRepositories();
  }, []);
  return (
    <>
      <View>
        <Layout style={styles.container}>
        <Selecionar SelectOption={SelectOption} options={options} selectedOption={selectedOption}/>
        <ConsolidadoMundo casos={casos} mortes={mortes} recuperados={recovered}/>
        </Layout>
      </View>
      <ScrollView>
        <Layout style={styles.container}>
          
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