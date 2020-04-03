import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import { Layout, Text, Avatar } from '@ui-kitten/components';

import {
  Header,
  Definição, 
  Surgimento, 
  Transmissão, 
  Mortalidade, 
  Prevenção, 
  Mascara, 
  Pet, 
  Incubação, 
  Detecção,
  IrExame
} from './components';

function Home () {
  return (
    <ScrollView>
      <Layout style={styles.container}>
      <Header/>
      <Definição/>
      <Surgimento/>
      <Transmissão/>
      <Mortalidade/>
      <Prevenção/>
      <Mascara/>
      <Pet/>
      <Incubação/>
      <Detecção/>
      </Layout>
      <Layout>
      <IrExame/>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 30, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default Home;