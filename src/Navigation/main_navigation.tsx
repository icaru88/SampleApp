import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from 'src/hooks';
import {authActions, getCurrentAuthUserToken} from 'src/Store/AuthSlice';
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

  const [loading, setLoading] = useState<boolean>(true);

  const retrieveTokenInStorage = async () => {
    try {
      const tokenInStorage = await retrieveUserToken();
      tokenInStorage &&
        dispatch(
          authActions.setAuthDetails({
            token: tokenInStorage,
          }),
        );
      loading && setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      loading && setLoading(false);
    }
  };

  useEffect(() => {
    // check is user previously login
    retrieveTokenInStorage();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={LOGIN_NAVIGATION_ROUTE}
        screenOptions={{headerShown: false}}>
        {/* {!!token && token.length > 0 ? ( */}
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
