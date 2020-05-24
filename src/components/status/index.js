import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header, MundoScreen, PaisScreen, EstadoScreen } from './components';

const Mundo = () => (<MundoScreen/>);
const Pais = () => (<PaisScreen/>);
const Estado = () => (<EstadoScreen/>);

const Stack = createStackNavigator();
function Status ({initialRouteName}) {
  return (
    <>
    <Layout style={styles.container}>
      <Header/>
    </Layout>
    <Stack.Navigator headerMode='none' initialRouteName={initialRouteName}>
      <Stack.Screen name="Mundo" component={Mundo}/>
      <Stack.Screen name="Pais" component={Pais}/>
      <Stack.Screen name="Estado" component={Estado}/>
    </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  }
});

export default Status;