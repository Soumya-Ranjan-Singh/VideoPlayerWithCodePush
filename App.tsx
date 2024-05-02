import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform} from 'react-native';
import VideoScreen from './src/views/VideoPlayer';
import DrawerNavigator from './src/navigation/DrawerNavigation';
import CodePush from 'react-native-code-push';

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog:
    Platform.OS === 'ios'
      ? {
          appendReleaseDescription: true,
          title: 'A new update is available for iOS!',
        }
      : true,
};

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'default',
          orientation: 'portrait',
          presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
        }}>
        <Stack.Screen
          name={'Dashboard'}
          component={DrawerNavigator}
          options={{orientation: 'portrait'}}
        />
        <Stack.Screen
          name={'PLAYER'}
          component={VideoScreen}
          options={{orientation: 'landscape', statusBarHidden: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CodePush(codePushOptions)(App);
