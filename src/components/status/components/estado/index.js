import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Spinner, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { ConsolidadoEstado, Selecionar, CityList } from './components';

export function Estado() {
  const navigation = useNavigation();

  /* Lista de Siglas x Estado */
  const SiglasxEstado = [
    {sigla: 'AC', estado: 'Acre'},
    {sigla: 'AL', estado: 'Alagoas'},
    {sigla: 'AP', estado: 'Amapá'},
    {sigla: 'AM', estado: 'Amazonas'},
    {sigla: 'BA', estado: 'Bahia'},
    {sigla: 'CE', estado: 'Ceará'},
    {sigla: 'DF', estado: 'Distrito Federal'},
    {sigla: 'ES', estado: 'Espírito Santo'},
    {sigla: 'GO', estado: 'Goiás'},
    {sigla: 'MA', estado: 'Maranhão'},
    {sigla: 'MT', estado: 'Mato Grosso'},
    {sigla: 'MS', estado: 'Mato Grosso do Sul'},
    {sigla: 'MG', estado: 'Minas Gerais'},
    {sigla: 'PA', estado: 'Pará'},
    {sigla: 'PB', estado: 'Paraíba'},
    {sigla: 'PR', estado: 'Paraná'},
    {sigla: 'PE', estado: 'Pernambuco'},
    {sigla: 'PI', estado: 'Piauí'},
    {sigla: 'RJ', estado: 'Rio de Janeiro'},
    {sigla: 'RN', estado: 'Rio Grande do Norte'},
    {sigla: 'RS', estado: 'Rio Grande do Sul'},
    {sigla: 'RO', estado: 'Rondônia'},
    {sigla: 'RR', estado: 'Roraima'},
    {sigla: 'SC', estado: 'Santa Catarina'},
    {sigla: 'SP', estado: 'São Paulo'},
    {sigla: 'SE', estado: 'Sergipe'},
    {sigla: 'TO', estado: 'Tocantins'}
  ];
  /* Lista de Estados */
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('SP');  
  const [estados, setEstados] = useState([]);

  /* Consolidado Estado */
  const [Consolidado_confirmados, setConsolidado_confirmados] = useState(null);
  const [Consolidado_mortes, setConsolidado_mortes] = useState(null);
  const [Consolidado_ultAtt, setConsolidado_ultAtt] = useState(null); 
  
  /* Lista de Cidades */
  const [cidades, setCidades] = useState([]);

  /* Tratamento de Exceções & Carregamentos */
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
      onPress={() => navigation.reset({index: 2, routes: [{ name: 'STATUS', params: { initialRouteName: 'Estado' }}]})}>
      TENTAR NOVAMENTE
      </Button>
    </Layout>
  );
    
  const SelectOption = (value) => {
    setSelectedOption(getSiglaStateName(value.text));
    setEstados(value.text);
    //setIndex(value.index);
  }
  function getFullStateName(sigla) {
    var estado = 'Erro';
    SiglasxEstado.map((item) => {
      if(sigla == item.sigla) return estado = item.estado;
    });
    return estado;
  }
  function getSiglaStateName(full_name) {
    var estado = 'Erro';
    SiglasxEstado.map((item) => {
      if(full_name == item.estado) return estado = item.sigla;
    });
    return estado;
  }
  function getYesterdayDay() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  }
  
  /* Carrega a lista de seleção com todos os estados do Brasil. */
  async function loadSelecao() {
    const response = await axios.get('https://api.coronaanalytic.com/journal');
    var estados = [];
    (response.data.values).map((item) => estados.push({text: getFullStateName(item.state)}));
    //console.log(estados.sort());
    setOptions(estados.sort());
  }
  
  /* Carrega as informações de casos totais do estado selecionado. */
  async function loadConsolidadoEstado() {
    try {
      setLoadingStatus(true);
      const response = await axios.get(`https://brasil.io/api/dataset/covid19/caso_full/data/?date=${getYesterdayDay()}&state=${selectedOption}&city=`);
      response.data.results.map((item) => {
      if(item.city == null) {
        setConsolidado_confirmados(item.last_available_confirmed);
        setConsolidado_mortes(item.last_available_deaths);
        setConsolidado_ultAtt(item.last_available_date);
      }
      });
    } catch (error) {
      setLoadingStatus(true);
      setErrorStatus(true);
    } finally {
      setErrorStatus(false);
      setLoadingStatus(false);
    }
  }
  
  /* Carrega a lista de cidades municipios do estado selecionado. */
  async function loadCidades() {
    try {
      setLoadingStatus(true);
      const response = await axios.get(`https://brasil.io/api/dataset/covid19/caso_full/data/?state=${selectedOption}&date=${getYesterdayDay()}`);
      setCidades(response.data.results);
    } catch(error) {
      setLoadingStatus(true);
      setErrorStatus(true);
    } finally {
      setErrorStatus(false);
      setLoadingStatus(false);
    }
  }
  /* Carrega a lista de estado uma vez */
  useEffect(() => {
    loadSelecao();
  }, []);

  /* Funções chamadas sempre que o estado é alterado */
  useEffect(() => {
    loadConsolidadoEstado();
    loadCidades();
  }, [selectedOption]);
  return (
    <Layout style={styles.container}>
      {
        isLoading == true ?
          <Loading/>
          :
          <>
          <Selecionar
          options={options} selectedOption={selectedOption}
          SelectOption={SelectOption} ult_Att={Consolidado_ultAtt}/>
          <ConsolidadoEstado 
          estado={getFullStateName(selectedOption)} casos={Consolidado_confirmados} 
          mortes={Consolidado_mortes}/>
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
  