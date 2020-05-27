import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Spinner, Text, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

/* Lista de Siglas x Estado */
export const SiglasxEstado = [
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

export function Loading() {
  return(
    <Layout style={{alignItems: 'center'}}>
    {
      <>
      <Spinner status='basic' size='giant'/>
      <Text category='h3'>Carregando...</Text>
      </>
    }
    </Layout>
  );
}

export function Error() {
  const navigation = useNavigation();
  return (
    <Layout style={{alignItems: 'center'}}>
      <Image
        style={styles.errorImage}
        source={require('../../../../assets/error.png')}
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
}
export function getYesterdayDay() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

export function formatNumber(num) {
  return num ?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');;
}

export function formatDate(dateStr) {
  const dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2); //ex out: "18/01/10"
}

export function getFullStateName(sigla) {
  var estado = 'Erro';
  SiglasxEstado.map((item) => {
    if (sigla == item.sigla) return estado = item.estado;
  });
  return estado;
}

export function getSiglaStateName(full_name) {
  var estado = 'Erro';
  SiglasxEstado.map((item) => {
    if (full_name == item.estado) return estado = item.sigla;
  });
  return estado;
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