import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import axios from 'axios';

import { ConsolidadoEstado, Selecionar, ListaCidades } from './components';
import { getFullStateName, getSiglaStateName, Loading, Error, SiglasxEstado } from '../shared';

export function Estado() {
  /* URL's */
  const url_consolidado_estado = 'https://brasil.io/api/dataset/covid19/caso_full/data/?is_last=true&state=';
  const url_cidades = 'https://brasil.io/api/dataset/covid19/caso_full/data/?is_last=true&state=';
  
  /* Lista de Estados */
  const [lista_estados, setLista_Estados] = useState([]);
  const [estado_selecionado, setEstado_Selecionado] = useState('CE');  

  /* Consolidado Estado */
  const [consolidado_estado, setConsolidado_Estado] = useState([]);
  
  /* Lista de Cidades */
  const [cidades, setCidades] = useState([]);

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
    
  const SelecionarEstado = (value) => {
    setEstado_Selecionado(getSiglaStateName(value.text));
  }
  
  /* Carrega a lista de seleção com todos os estados do Brasil. */
  async function loadLista_Estados() {
    setLista_Estados(SiglasxEstado);
  }
  
  /* Carrega as informações de casos totais do estado selecionado. */
  async function loadConsolidadoEstado() {
    const response = await axios.get(url_consolidado_estado + estado_selecionado);
    response.data.results.map((item) => {
      if(item.city == null) {setConsolidado_Estado(item);}
    });
  }
  
  /* Carrega a lista de cidades municipios do estado selecionado. */
  async function loadLista_Cidades() {
    const response = await axios.get(url_cidades + estado_selecionado);
    setCidades(response.data.results);
  }
  
  /* Carrega a lista de estados uma vez */
  useEffect(() => {
    loadLista_Estados();
  }, []);

  /* Funções chamadas sempre que o estado é alterado */
  useEffect(() => {
    async function load() {
      setStatusCode(0);
      try {
        await loadConsolidadoEstado();
        await loadLista_Cidades();
        setStatusCode(1);
      } catch (error) {
        setStatusCode(3);
      }
    }
    load();
  }, [estado_selecionado]);

  return (
    <Layout style={styles.container}>
      {
        statusCode == 0 ? <Loading/> :
        statusCode == 1 ?
          <>
          <Selecionar
          options={lista_estados} selectedOption={estado_selecionado}
          SelectOption={SelecionarEstado} ult_Att={consolidado_estado.last_available_date}/>
          <ConsolidadoEstado
          estado={getFullStateName(estado_selecionado)} casos={consolidado_estado.last_available_confirmed}
          mortes={consolidado_estado.last_available_deaths}/>
          <ListaCidades data={cidades}/>
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
  text: {
    textAlign: 'center',
    fontSize: 14
  },
  bTryAgain: {
    margin: 25
  }
});
  