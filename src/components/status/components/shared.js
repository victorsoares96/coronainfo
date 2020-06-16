import React from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import {
  Layout,
  Spinner,
  Text,
  Button
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

export const SiglasxEstado = [
  {
    text: 'Norte',
    items: [
      { sigla: 'AM', text: 'Amazonas', capital: 'Manaus', index: 1 },
      { sigla: 'RR', text: 'Roraima', capital: 'Boa Vista', index: 2 },
      { sigla: 'AP', text: 'Amapá', capital: 'Manaus', index: 3 },
      { sigla: 'PA', text: 'Pará', capital: 'Belém', index: 4 },
      { sigla: 'TO', text: 'Tocantins', capital: 'Palmas', index: 5 },
      { sigla: 'RO', text: 'Rondônia', capital: 'Porto Velho', index: 6 },
      { sigla: 'AC', text: 'Acre', capital: 'Rio Branco', index: 7 },
    ],
  },
  {
    text: 'Nordeste',
    items: [
      { sigla: 'MA', text: 'Maranhão', capital: 'São Luís', index: 8 },
      { sigla: 'PI', text: 'Piauí', capital: 'Teresina', index: 9 },
      { sigla: 'CE', text: 'Ceará', capital: 'Fortaleza', index: 10 },
      { sigla: 'PB', text: 'Paraíba', capital: 'João Pessoa', index: 11 },
      { sigla: 'RN', text: 'Rio Grande do Norte', capital: 'Natal', index: 12 },
      { sigla: 'PE', text: 'Pernambuco', capital: 'Recife', index: 13 },
      { sigla: 'PC', text: 'Paraíba', capital: 'João Pessoa', index: 14 },
      { sigla: 'SE', text: 'Sergipe', capital: 'Aracaju', index: 15 },
      { sigla: 'AL', text: 'Alagoas', capital: 'Maceió', index: 16 },
      { sigla: 'BA', text: 'Bahia', capital: 'Salvador', index: 17 },
    ],
  },
  {
    text: 'Centro Oeste',
    items: [
      { sigla: 'DF', text: 'Distrito Federal', capital: 'Brasília', index: 18 },
      { sigla: 'MT', text: 'Mato Grosso', capital: 'Cuiabá', index: 19 },
      { sigla: 'MS', text: 'Mato Grosso do Sul', capital: 'Teresina', index: 20 },
      { sigla: 'GO', text: 'Goiás', capital: 'Goiânia', index: 21 },
    ],
  },
  {
    text: 'Sudeste',
    items: [
      { sigla: 'SP', text: 'São Paulo', capital: 'São Paulo', index: 22 },
      { sigla: 'RJ', text: 'Rio de Janeiro', capital: 'Rio de Janeiro', index: 23 },
      { sigla: 'ES', text: 'Espirito Santo', capital: 'Vitória', index: 24 },
      { sigla: 'MG', text: 'Minas Gerais', capital: 'Belo Horizonte', index: 25 },
    ],
  },
  {
    text: 'Sul',
    items: [
      { sigla: 'PR', text: 'Paraná', capital: 'Curitiba', index: 26 },
      { sigla: 'RS', text: 'Rio Grande do Sul', capital: 'Porto Alegre', index: 27 },
      { sigla: 'SC', text: 'Santa Catarina', capital: 'Florianópolis', index: 28 },
    ],
  }
];

export function Loading() {
  return(
    <Layout style={{alignItems: 'center'}}>
      <Spinner status='basic' size='giant'/>
      <Text category='h3'>Carregando...</Text>
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
  const dArr = dateStr.split("-");
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
}

export function getFullStateName(sigla) {
  var estado = 'Erro';
  for (let i = 0; i < SiglasxEstado.length; i++) {
    for (let x = 0; x < SiglasxEstado[i].items.length; x++) {
      if (sigla == SiglasxEstado[i].items[x].sigla) {
        estado = SiglasxEstado[i].items[x].text;
        break;
      }
    }
  }
  return estado;
}

export function getSiglaStateName(full_name) {
  var estado = 'Erro';
  for (let i = 0; i < SiglasxEstado.length; i++) {
    for (let x = 0; x < SiglasxEstado[i].items.length; x++) {
      if (full_name == SiglasxEstado[i].items[x].text) {
        estado = SiglasxEstado[i].items[x].sigla;
        break;
      }
    }
  }
  return estado;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
  },
  select: {
    margin: 8
  },
  text: {
    textAlign: 'center',
    fontSize: 14
  },
  bTryAgain: {
    margin: 25
  },
  buttonGroup: {
    margin: 8
  },
  text: {
    textAlign: 'center'
  },
  card: {
    marginVertical: 8
  },
});