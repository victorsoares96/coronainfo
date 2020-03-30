import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
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
import { useNavigation } from '@react-navigation/native';

var arraySintomasDoUsuario = [];

function Header({title, description}) {
  return (
  <CardHeader title={title} description={description}/>
  );
}

function Footer() {
  const navigation = useNavigation();
  return (
  <View style={styles.footerContainer}>
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'
      onPress={() => navigation.navigate('EXAME')}>
      REFAZER EXAME
    </Button>
    <Button
      style={styles.footerControl}
      size='small'
      onPress={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'INFORMATIVO' },
              {
                name: 'STATUS',
                params: { arraySintomasDoUsuario: [] },
              },
            ],
          })
        );
      /*navigation.navigate('INFORMATIVO', DATA.map((data) => data.index = null))*/}}>
      VOLTAR AO INICIO
    </Button>
  </View>
  );
}

export function genResult() {
  //DATA.map((data) => {array.pop()});
  arraySintomasDoUsuario = [];
  DATA.map((data) => {if(data.index == 0) arraySintomasDoUsuario.push(1)});
}

function Resultado() {
  console.log('antes:', arraySintomasDoUsuario);
  console.log('depois:', arraySintomasDoUsuario);
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Image
      style={arraySintomasDoUsuario.lenght >= 6 ? styles.headerImageSick: styles.headerImageHealthy}
      source={require(arraySintomasDoUsuario.length >= 6 ? '../../../assets/doente.png' : '../../../assets/healthy.png')}
    />
    <Card
      header= {() => <Header title={arraySintomasDoUsuario.length >= 6 ? 'Temos más notícias..' : 'Temos boas notícias!'} description={`Você possui ${arraySintomasDoUsuario.length} dos sintomas.`}/>} 
      footer={() => <Footer/>} style={{margin: 8}}>
      <Text>
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
  headerImageSick: {
    width: 250,
    height: 292,
  },
  headerImageHealthy: {
    width: 150,
    height: 192,
  },
  footerControl: {
    marginHorizontal: 4,
  },
});

export default Resultado;
