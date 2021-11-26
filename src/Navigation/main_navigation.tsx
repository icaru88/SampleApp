import React, {useEffect, useState, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginNavigation} from './login_stack';
import {HOME_NAVIGATOR_ROUTE, LOGIN_NAVIGATION_ROUTE} from './routes';
import {HomeNavigation} from './home_stack';
import {retrieveUserToken} from 'src/Utils/EncryptedStorage';
import {ActivityIndicator, Alert} from 'react-native';
import {useAppSelector} from 'src/hooks';
import {AuthSlice, getCurrentAuthUserToken} from 'src/Store/AuthSlice';
import {useDispatch} from 'react-redux';

const MainStack = createNativeStackNavigator();

export const MainNavigation = () => {
  const dispatch = useDispatch();
  const authTokenInState = useAppSelector(state =>
    getCurrentAuthUserToken(state),
  );

  console.log('token in state', authTokenInState);

  const [loading, setLoading] = useState<boolean>(true);

  const retrieveTokenInStorage = async () => {
    try {
      const tokenInStorage = await retrieveUserToken();
      console.log('token updated', tokenInStorage);
      tokenInStorage &&
        dispatch(
          AuthSlice.actions.setAuthDetails({
            token: tokenInStorage,
          }),
        );
      loading && setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      loading && setLoading(false);
    }
  };

  useEffect(() => {
    //check is user previously login
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
