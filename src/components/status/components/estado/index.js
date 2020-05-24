import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Spinner, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { ConsolidadoEstado, Selecionar, CityList } from './components';

export function Estado() {
  const navigation = useNavigation();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(['SP']);
  const [index, setIndex] = useState(0);
    
  const [estado, setEstado] = useState([]);
  const [casos, setCasos] = useState(null);
  const [cidades, setCidades] = useState([]);
  const [isLoading, setLoadingStatus] = useState(true);
  const [isError, setErrorStatus] = useState(false);

  const Loading = () => (
    <Layout style={{alignItems: 'center'}}>
      {
        isError == false ?
        <Spinner status='basic' size='giant'/>
        :
        <Error/>
      }
    </Layout>
  );
  const Error = () => (
    <Layout style={{alignItems: 'center'}}>
      <Image
        style={styles.errorImage}
        source={require('../../../../../assets/error.png')}
      />
      <Text category='h2'>sem conexão! estado</Text>
      <Text style={styles.text} category='label'>
        houve uma falha ao se conectar ao serviço de dados,
        cheque sua conexão com a internet ou tente novamente mais tarde!
      </Text>
      <Button 
      style={styles.bTryAgain} 
      status='basic' 
      onPress={() => navigation.reset({index: 2, routes: [{ name: 'STATUS', params: { initialRouteName: 'Estado' }}]})}>
      TENTAR NOVAMENTE
      </Button>
    </Layout>
  );
  useEffect(() => {
    async function loadState() {
      try {
        setLoadingStatus(true);
        setErrorStatus(false);
        const response = await axios.get('https://api.coronaanalytic.com/journal');
        var options2 = [];
        (response.data.values).map((item, index) => options2.push({text: item.state, index: index}));
        setOptions(options2);
        setEstado((Object.values(selectedOption)).values().next().value.toString());
        setCasos(response.data.values[index].cases);
        setCidades(response.data.values[index].citys);
        setLoadingStatus(false);
      } catch(error) {
        setErrorStatus(true);
      }
    }
    loadState();
  }, []);
    
  const SelectOption = (value) => {
    setSelectedOption(value.text);
    setEstado(value.text);
    setIndex(value.index);
  }
  /*
    Carrega o estado selecionado nas opções
  */
  useEffect(() => {
    async function loadConfig() {
      const response = await axios.get('https://api.coronaanalytic.com/journal');
      setCasos(response.data.values[index].cases);
      setCidades(response.data.values[index].citys);
    }
    loadConfig();
  }, [selectedOption]);

  return (
    <Layout style={styles.container}>
      {
        isLoading == true ?
          <Loading/>
          :
          <>
          <Selecionar options={options} selectedOption={selectedOption} SelectOption={SelectOption}/>
          <ConsolidadoEstado estado={estado} casos={casos}/>
          <CityList data={cidades}/>
          </>
      }
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
  },
  text: {
    textAlign: 'center',
    fontSize: 14
  },
  bTryAgain: {
    margin: 25
  }
});
  