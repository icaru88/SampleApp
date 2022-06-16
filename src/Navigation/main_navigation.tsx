import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from 'src/hooks';
import {AuthSlice, getCurrentAuthUserToken} from 'src/Store/AuthSlice';
import {retrieveUserToken} from 'src/Utils/EncryptedStorage';
import {HomeNavigation} from './home_stack';
import {LoginNavigation} from './login_stack';
import {HOME_NAVIGATOR_ROUTE, LOGIN_NAVIGATION_ROUTE} from './routes';

const MainStack = createNativeStackNavigator();

export const MainNavigation = () => {
  const dispatch = useDispatch();
  const authTokenInState = useAppSelector(state =>
    getCurrentAuthUserToken(state),
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const retrieveTokenInStorage = useCallback(async () => {
    try {
      const tokenInStorage = await retrieveUserToken();
      tokenInStorage &&
        dispatch(
          AuthSlice.actions.setAuthDetails({
            token: tokenInStorage,
          }),
        );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    // check is user previously login
    retrieveTokenInStorage();
  }, [retrieveTokenInStorage]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={LOGIN_NAVIGATION_ROUTE}
        screenOptions={{headerShown: false}}>
        {!!authTokenInState && authTokenInState.length > 0 ? (
          <MainStack.Screen
            name={HOME_NAVIGATOR_ROUTE}
            component={HomeNavigation}
            options={{title: '', gestureEnabled: false}}
          />
        ) : (
          <MainStack.Screen
            name={LOGIN_NAVIGATION_ROUTE}
            component={LoginNavigation}
            options={{title: '', gestureEnabled: false}}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
