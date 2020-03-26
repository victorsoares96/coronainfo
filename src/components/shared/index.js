import React from 'react';
import {StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import Home from '../home';
import Exame from '../exame';
import Status from '../status';

import PersonIcon from '../../../assets/icons';

export const FacebookIcon = (style) => (
    <Icon name='facebook' {...style} />
);

const HomeScreen = () => (<Home/>);
const ExameScreen = () => (<Exame/>);
const StatusScreen = () => (<Status/>);

function Tabs() {
    return (
      <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}
      
      tabBarOptions={{
        swipeEnabled:false,
        animationEnabled: true,
        scrollEnabled: true
      }}>
        <BottomTab.Screen name="INFORMATIVO" component={HomeScreen} />
        <BottomTab.Screen name="EXAME" component={ExameScreen} />
        <BottomTab.Screen name="STATUS" component={StatusScreen} />
      </BottomTab.Navigator>
    );
}

const BottomTab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };
  return (
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title='INFORMATIVO' icon={PersonIcon}/>
        <BottomNavigationTab style={styles.bTab} title='EXAME' icon={FacebookIcon}/>
        <BottomNavigationTab title='STATUS'/>
      </BottomNavigation>
  );
};

const styles = StyleSheet.create({
    bTab: {
        marginVertical: 10
    }
});
export default Tabs;