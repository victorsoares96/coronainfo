import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import axios from 'axios';

import {
  Loading,
  Error,
} from '../shared';
import { ConsolidadoMundo, MundoLista, Procurar } from './components';

export function Mundo() {

  /* URL's */
  const url_consolidado_mundo = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief';
  const url_paises = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest';
  
  /* Lista de Países */
  const [paises, setPaises] = useState([]);

  /* Filtro de País */
  const [pais_procurado, setPais_Procurado] = useState('');

  /* Consolidado Estado */
  const [consolidado_mundo, setConsolidado_Mundo] = useState([]);
  
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

  async function loadConsolidadoMundo() {
    const response = await axios.get(url_consolidado_mundo);
    setConsolidado_Mundo(response.data);
  }

  /*const onInputChanges = (e) => {
    setPais_Procurado(e.target.value);
  };*/

  /*async function loadPaisProcurado() {
    const response = await axios.get(url_paises);
    const search = response.data.filter(function (e) {
      return e.countryregion.toLowerCase().indexOf(pais_procurado.toLowerCase()) > -1;
    });
    setPaises(search);
  }*/

  async function loadListaPaises() {
    const response = await axios.get(url_paises);
    setPaises(response.data);
  }
  
  /*useEffect(() => {
    async function load() {
      try {
        await loadPaisProcurado();
      } catch (error) {
        setStatusCode(3);
        console.log(error);
      }
    }
    setTimeout(() => {
      load();
    }, 2000);
  }, [pais_procurado]);*/
  useEffect(() => {
    async function load() {
      try {
        setStatusCode(0);
        await loadConsolidadoMundo();
        await loadListaPaises();
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
          <ConsolidadoMundo ult_atualizacao={paises[0]?.lastupdate} casos={consolidado_mundo.confirmed} mortes={consolidado_mundo.deaths}
          recuperados={consolidado_mundo.recovered}/>
          <MundoLista data={paises}/>
          </>
        :
        <Error/>
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