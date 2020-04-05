import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Header, MundoScreen, PaisScreen, EstadoScreen } from './components';

const Stack = createStackNavigator();
function Status () {
    return (
      <>
      <Layout style={styles.container}>
        <Header/>
      </Layout>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Mundo" component={() => <MundoScreen/>}/>
        <Stack.Screen name="Pais" component={() => <PaisScreen/>}/>
        <Stack.Screen name="Estado" component={() => <EstadoScreen/>}/>
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