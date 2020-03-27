import React, { useEffect, Fragment, useState } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, dark as darkTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json'; // <-- Import app theme
import { default as customMapping } from './custom-mapping.json'; // <-- Import custom mapping
import * as Font from 'expo-font';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';

import Tabs from './src/components/shared';

const theme = { ...darkTheme, ...appTheme };

function App() {
  const [ready, setReady] = useState(false);
  useEffect(async () => {
    await Font.loadAsync({
      'BalooThambi2-Bold': require('./assets/fonts/BalooThambi2-Bold.ttf'),
      'BalooThambi2-Regular': require('./assets/fonts/BalooThambi2-Regular.ttf'),
    });
    setReady(ready => !ready);
    return () => {}
  }, []);
  if(!ready) return <AppLoading/>
  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider mapping={mapping} theme={theme} customMapping={customMapping}>
        <NavigationContainer>
          <Tabs/>
        </NavigationContainer>
      </ApplicationProvider>
    </Fragment>
  );
}
export default App;