import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../Screens/HomeScreen';
import {HOME_ROUTE} from './routes';
import {HeaderNavBar} from './header/header_nav_bar';

const HomeStack = createNativeStackNavigator();

export const HomeNavigation = ({navigation}) => {
  return (
    <HomeStack.Navigator
      initialRouteName={HOME_ROUTE}
      screenOptions={{gestureEnabled: false}}>
      <HomeStack.Screen
        name={HOME_ROUTE}
        component={HomeScreen}
        options={({navigation, route}) => ({
          header: () => (
            <HeaderNavBar
              navigation={navigation}
              route={route}
              title={'User List'}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};
