import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import {
  Layout,
  Button,
  Card,
  CardHeader,
  Text,
} from '@ui-kitten/components';

import { DATA } from '../../data';

const Header = () => (
  <View>
    <Text
      style={styles.headerText}
      category='h6'>
      Maldives
    </Text>
  </View>
);

const Footer = () => (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'>
      REFAZER EXAME
    </Button>
    <Button
      style={styles.footerControl}
      size='small'>
      VOLTAR AO INICIO
    </Button>
  </View>
);

async function gerar() {
  const [result, setResult] = useState(null);
  await DATA.map((data) => data.index == 0 ? setResult(result + 1) : result);
}

async function Resultado() {
  const [result, setResult] = useState(null);
  await DATA.map((data) => data.index == 0 ? setResult(result + 1) : result);
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Image
      style={styles.headerImage}
      source={require('../../../assets/doente.png')}
    />
    <Card header={Header} footer={Footer}>
      <Text>
      {result}
      The Maldives, officially the Republic of Maldives, is a small country in South Asia,
      located in the Arabian Sea of the Indian Ocean.
      It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian continent
      </Text>
    </Card>
    </Layout>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  headerImage: {
    width: 250,
    height: 292,
  },
  footerControl: {
    marginHorizontal: 4,
  },
});

export default Resultado;
