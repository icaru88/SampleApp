import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../Screens/HomeScreen';
import {HeaderNavBar} from './header/header_nav_bar';
import {HOME_ROUTE} from './routes';

const HomeStack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={HOME_ROUTE}
      screenOptions={{gestureEnabled: false}}>
      <HomeStack.Screen
        name={HOME_ROUTE}
        component={HomeScreen}
        options={() => ({
          header: () => <HeaderNavBar title={'User List'} />,
        })}
      />
    </HomeStack.Navigator>
  );
};
