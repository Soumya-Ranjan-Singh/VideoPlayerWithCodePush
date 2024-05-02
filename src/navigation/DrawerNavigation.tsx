import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../views/Home';
import About from '../views/About';
import {Platform} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const drawerIcon = (
    {focused, size}: {focused: boolean; size: number},
    name: string,
  ) => {
    return (
      <Icon
        name={name}
        size={size}
        color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  return (
    <Drawer.Navigator
      //drawerType="slide"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.transparent,
        drawerInactiveBackgroundColor: Colors.transparent,
        drawerActiveTintColor: Colors.active,
        drawerInactiveTintColor: Colors.inactive,
        drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
        overlayColor: Colors.transparent,
        drawerStyle: {
          backgroundColor: Colors.bg,
          width: '60%',
        },
        sceneContainerStyle: {
          backgroundColor: Colors.bg,
        },
      }}
      //backBehavior='firstRoute'

      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: options => drawerIcon(options, 'home-outline'),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: options => drawerIcon(options, 'information-outline'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const Colors = {
  bg: '#009688',
  active: '#fff',
  inactive: '#eee',
  transparent: 'transparent',
};
