import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Spinner, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { ConsolidadoMundo, WorldList } from './components';

export function Mundo() {

  const navigation = useNavigation();
  const [paises, setPaises] = useState([]);
  const [mundo, setMundo] = useState([]);
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
      <Text category='h2'>sem conexão! mundo</Text>
      <Text style={styles.text} category='label'>
        houve uma falha ao se conectar ao serviço de dados,
        cheque sua conexão com a internet ou tente novamente mais tarde!
      </Text>
      <Button 
      style={styles.bTryAgain} 
      status='basic' 
      onPress={() => navigation.reset({index: 2, routes: [{ name: 'STATUS', params: { initialRouteName: 'Mundo' }}]})}>
      TENTAR NOVAMENTE
      </Button>
    </Layout>
  );
  useEffect(() => {
    async function loadWorld() {
      try {
        setLoadingStatus(true);
        setErrorStatus(false);
        const response = await axios.get(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief`);
        const response2 = await axios.get(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest`);
        setLoadingStatus(false);
        setPaises(response2.data);
        setMundo(response.data);
      } catch (error) {
        setErrorStatus(true);
      }
    }
    loadWorld();
  }, []);
  return (
    <Layout style={styles.container}>
      {
        isLoading == true ?
          <Loading/>
          :
          <>
          <ConsolidadoMundo casos={mundo.confirmed} mortes={mundo.deaths} recuperados={mundo.recovered}/>
          <WorldList data={paises}/>
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
  spinner: {
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
    fontSize: 14
  },
  bTryAgain: {
    margin: 25
  }
});