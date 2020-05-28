import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import axios from 'axios';

import {
  Loading,
  Error,
} from '../shared';
import { ConsolidadoPais, EstadoList } from './components';

export function Pais() {

  /* URL's */
  const url_consolidado_pais = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest';
  const url_estados = 'https://brasil.io/api/dataset/covid19/caso/data?format=json&is_last=True&place_type=state';
  
  /* Lista de Estados */
  const [estados, setEstados] = useState([]);

  /* Consolidado Estado */
  const [consolidado_pais, setConsolidado_Pais] = useState([]);
  
  /*
   ----------------------------------------
  | Tratamento de Exceções & Carregamentos |
  |                                        |
  |  0 - Carregando                        |
  |  1 - Sucesso                           |
  |  3 - Falha                             |
   ----------------------------------------  
  */
 const [statusCode, setStatusCode] = useState(0);

  async function loadConsolidadoPais() {
    const response = await axios.get(url_consolidado_pais);
    setConsolidado_Pais(response.data[28]);
  }

  async function loadListaEstados() {
    const response = await axios.get(url_estados);
    setEstados(response.data.results);
  }

  useEffect(() => {
    async function load() {
      try {
        setStatusCode(0);
        await loadConsolidadoPais();
        await loadListaEstados();
        setStatusCode(1);
      } catch (error) {
        setStatusCode(3);
      }
    }
    load();
  }, []);

  return (
    <Layout style={styles.container}>
      {
        statusCode == 0 ? <Loading/> :
        statusCode == 1 ?
          <>
          <ConsolidadoPais ult_atualizacao={estados[0]?.date} casos={consolidado_pais.confirmed}
          mortes={consolidado_pais.deaths} recuperados={consolidado_pais.recovered}/>
          <EstadoList data={estados}/>
          </>
        : <Error/>
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
