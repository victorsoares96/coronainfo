import React from 'react';
import { Layout } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { Header } from './components';

function Status () {
    return (
    <Layout style={styles.container}>
      <Header/>
    </Layout>
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