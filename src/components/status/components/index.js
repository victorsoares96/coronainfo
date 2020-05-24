import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Estado } from './estado';
import { Pais } from './pais';
import { Mundo } from './mundo';

export function Header() {
  const navigation = useNavigation();
  return(
    <Layout style={styles.container}>
    <ButtonGroup style={styles.buttonGroup} status='basic'>
      <Button onPress={() => navigation.navigate('Mundo')}>MUNDO</Button>
      <Button onPress={() => navigation.navigate('Pais')}>PAÍS</Button>
      <Button onPress={() => navigation.navigate('Estado')}>ESTADO</Button>
    </ButtonGroup>
    </Layout>
  );
}

export function MundoScreen() {
  return (<Mundo/>);
}

export function PaisScreen() {
  return (<Pais/>);
}

export function EstadoScreen() {
  return (<Estado/>);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 30
  },
  buttonGroup: {
    margin: 8,
  }
});
