import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Spinner, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { ConsolidadoPais, Selecionar, EstadoList } from './components';

export function Pais() {
  const navigation = useNavigation();
  const [pais, setPais] = useState([]);
  const [estados, setEstados] = useState([]);
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
      <Text category='h2'>sem conexão!</Text>
      <Text style={styles.text} category='label'>
        houve uma falha ao se conectar ao serviço de dados,
        cheque sua conexão com a internet ou tente novamente mais tarde!
      </Text>
      <Button 
      style={styles.bTryAgain} 
      status='basic' 
      onPress={() => navigation.reset({index: 2, routes: [{ name: 'STATUS', params: { initialRouteName: 'Pais' }}]})}>
      TENTAR NOVAMENTE
      </Button>
    </Layout>
  );
  useEffect(() => {
    async function loadBrasil() {
      try {
        setLoadingStatus(true);
        setErrorStatus(false);
        const response = await axios.get(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest`);
        setPais(response.data[28]);
        setLoadingStatus(false);
      } catch (error) {
        setErrorStatus(true);
      }
    }
    loadBrasil();
  }, []);

  useEffect(() => {
    async function loadEstados() {
      try {
        setLoadingStatus(true);
        setErrorStatus(false);
        const response = await axios.get(`https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&place_type=state`);
        setEstados(response.data.results);
      } catch (error) {
        setErrorStatus(true);
      }
    }
    loadEstados();
  }, []);
  return (
    <Layout style={styles.container}>
      {
        isLoading == true ?
          <Loading/>
          :
          <>
          <Selecionar/>
          <ConsolidadoPais casos={pais.confirmed} mortes={pais.deaths} recuperados={pais.recovered}/>
          <EstadoList data={estados}/>
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
