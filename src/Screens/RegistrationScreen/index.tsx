import React, {useState} from 'react';
import {Alert, Keyboard, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import _ from 'lodash';
import {RectangularButton} from 'src/Components/Button';
import {EmailTextInput} from 'src/Components/EmailTextInput';
import {PasswordTextInput} from 'src/Components/PasswordTextInput';
import {useAppDispatch} from 'src/hooks';
import {Error} from 'src/Model/Error';
import {LoginStackParamList} from 'src/Navigation/login_stack';
import {LOGIN_ROUTE} from 'src/Navigation/routes';
import {registerAction} from 'src/Saga/Auth/register';
import {useRegisterMutation} from 'src/Services/AuthApi';
import {checkEmailValid} from 'src/Utils/Validators';
import styles from './styles';

type Props = NativeStackScreenProps<LoginStackParamList, 'LOGIN_ROUTE'>;

export const RegistrationScreen: React.FC<Props> = props => {
  const {navigation} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [register, {isLoading}] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const onSignInPress = async () => {
    navigation.navigate(LOGIN_ROUTE);
  };

  const onRegisterPress = async () => {
    Keyboard.dismiss();
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Error', 'Empty is not allowed');
      return;
    }

    dispatch(
      registerAction({
        email,
        password,
      }),
    );
    // try {
    //   await register({
    //     email,
    //     password,
    //   }).unwrap();
    //   Alert.alert('Success', 'Register Success', [
    //     {
    //       text: 'OK',
    //       onPress: () => navigation.navigate(LOGIN_ROUTE),
    //     },
    //   ]);
    // } catch (error) {
    //   const errorData = error as Error;
    //   Alert.alert('Error', errorData.data.error);
    // }
  };

  const onEmailTextChange = (text: string) => {
    checkEmailValid(text) ? setIsEmailValid(true) : setIsEmailValid(false);
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.keyboardContainer}>
          <Text style={styles.title}>UsersApp</Text>
          <EmailTextInput
            email={email}
            onChangeText={onEmailTextChange}
            isEmailValid={isEmailValid}
          />
          <PasswordTextInput
            password={password}
            showPassword={showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            onPress={() => setShowPassword(!showPassword)}
            title={'Password'}
          />

          <RectangularButton
            onPress={_.debounce(() => onRegisterPress(), 500)}
            title={'REGISTER'}
            // isLoading={isLoading}
          />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already have account?{'   '}
              <Text onPress={onSignInPress} style={styles.footerLink}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
