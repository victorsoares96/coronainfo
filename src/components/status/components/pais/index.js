import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import axios from 'axios';

import { ConsolidadoPais, Selecionar, EstadoList } from './components';

export function Pais() {
  const [pais, setPais] = useState([]);
  const [estados, setEstados] = useState([]);
  useEffect(() => {
    async function loadBrasil() {
      const response = await axios.get(`https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest`);
      setPais(response.data[28]);
    }
    loadBrasil();
  }, []);

  useEffect(() => {
    async function loadEstados() {
      const response = await axios.get(`https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&place_type=state`);
      setEstados(response.data.results);
    }
    loadEstados();
  }, []);
  return (
    <Layout style={styles.container}>
      <Selecionar/>
      <ConsolidadoPais casos={pais.confirmed} mortes={pais.deaths} recuperados={pais.recovered}/>
      <EstadoList data={estados}/>
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
