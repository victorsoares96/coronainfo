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
      const response = await axios.get(`https://coronavirus-tracker-api.herokuapp.com/v2/locations?source=jhu&country_code=BR`);
      console.log(response.data.latest);
      setPais(response.data.latest);
    }
    loadBrasil();
  }, []);

  useEffect(() => {
    async function loadEstados() {
      const response = await axios.get(`https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&place_type=state`);
      console.log(response.data.results);
      setEstados(response.data.results);
      estados.map((item) => console.log(item.state));
    }
    loadEstados();
  }, []);
  return (
    <>
      <View>
        <Layout style={styles.container}>
          <Selecionar/>
          <ConsolidadoPais casos={pais.confirmed} mortes={pais.deaths} recuperados={pais.recovered}/>
        </Layout>
      </View>
      <ScrollView>
        <Layout style={styles.container}>
          <EstadoList data={estados}/>
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