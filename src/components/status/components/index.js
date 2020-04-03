import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup } from '@ui-kitten/components';

import { getEstados, getPaises, getTotal } from './service';
const test1 = () => (
    console.log(getEstados())
);
export function Header() {
    return(
        <ButtonGroup style={styles.buttonGroup} status='basic'>
            <Button onPress={test1}>MUNDO</Button>
            <Button onPress={() => console.log(getPaises())}>PAÍS</Button>
            <Button onPress={() => console.log(getEstados())}>ESTADO</Button>
        </ButtonGroup>
    );
}

const styles = StyleSheet.create({
    buttonGroup: {
      margin: 8,
    },
});