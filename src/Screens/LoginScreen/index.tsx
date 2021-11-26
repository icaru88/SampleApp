import React, {useEffect, useState} from 'react';
import {Alert, Keyboard, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import _ from 'lodash';
import {RectangularButton} from 'src/Components/Button';
import {EmailTextInput} from 'src/Components/EmailTextInput';
import {PasswordTextInput} from 'src/Components/PasswordTextInput';
import {Error} from 'src/Model/Error';
import {LoginStackParamList} from 'src/Navigation/login_stack';
import {REGISTER_ROUTE} from 'src/Navigation/routes';
import {useLoginMutation} from 'src/Services/AuthApi';
import {
  retrieveUserEmail,
  storeUserEmail,
  storeUserToken,
} from 'src/Utils/EncryptedStorage';
import {checkEmailValid} from 'src/Utils/Validators';
import styles from './styles';

type Props = NativeStackScreenProps<LoginStackParamList, 'LOGIN_ROUTE'>;

export const LoginScreen: React.FC<Props> = props => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, {isLoading}] = useLoginMutation();

  useEffect(() => {
    retrieveUserEmail().then(email => {
      email && setEmail(email);
    });
  }, []);

  const onSignUpPress = () => {
    props.navigation.navigate(REGISTER_ROUTE);
  };

  const onLoginPress = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Empty is not allowed');
      return;
    }
    Keyboard.dismiss();

    try {
      const user = await login({email, password}).unwrap();
      Alert.alert('Success', 'Login Success', [
        {
          text: 'OK',
          onPress: () => {
            storeUserToken(user.token);
            storeUserEmail(email);
          },
        },
      ]);
    } catch (error) {
      const errorDescription = error as Error;
      Alert.alert('Error', errorDescription.data.error);
      return;
    }
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
            title={'Password'}
            password={password}
            showPassword={showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            onPress={() => setShowPassword(!showPassword)}
          />
          <RectangularButton
            onPress={_.debounce(() => onLoginPress(), 500)}
            title={'LOGIN'}
            isLoading={isLoading}
          />
        </View>

        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have account?{'   '}
            <Text onPress={onSignUpPress} style={styles.footerLink}>
              Register
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
