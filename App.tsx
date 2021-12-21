import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import themeReducer from './stores/themeReducers';

import { MainLayout } from './screens';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

const store = createStore(themeReducer, applyMiddleware(thunk));

const App = () => {
  let [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Dashboard'}
        >
          <Stack.Screen name='Dashboard' component={MainLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
