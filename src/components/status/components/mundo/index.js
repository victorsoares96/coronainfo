import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Layout } from '@ui-kitten/components';
import axios from 'axios';

import { ConsolidadoMundo, WorldList } from './components';

export function Mundo() {
    
  const [casos, setCasos] = useState(null);
  const [mortes, setMortes] = useState(null);
  const [recovered, setRecovered] = useState(null);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    async function loadWorld() {
      const response = await axios.get(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief`);
      const response2 = await axios.get(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest`);
      setPaises(response2.data);
      setCasos(response.data.confirmed);
      setMortes(response.data.deaths);
      setRecovered(response.data.recovered);
    }
    loadWorld();
  }, []);
  return (
    <Layout style={styles.container}>
      <ConsolidadoMundo casos={casos} mortes={mortes} recuperados={recovered}/>
      <WorldList data={paises}/>
    </Layout>
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