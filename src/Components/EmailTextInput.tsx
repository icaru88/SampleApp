import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme} from 'src/Theme';

type Props = {
  email: string;
  onChangeText: (text) => void;
  isEmailValid?: boolean;
};

export const EmailTextInput: React.FC<Props> = props => {
  const {email, onChangeText, isEmailValid} = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        placeholder="E-mail"
        placeholderTextColor="#aaaaaa"
        onChangeText={onChangeText}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={'email-address'}
      />
      {!!isEmailValid && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Theme.colors.skyblue, Theme.colors.pink]}
          style={styles.iconContainer}>
          <Ionicons name={'checkmark-outline'} size={16} color={'white'} />
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: Theme.colors.pink,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 20,
  },
  inputText: {
    color: Theme.fontColor.gray,
    width: '90%',
  },
  iconContainer: {
    backgroundColor: Theme.colors.pink,
    borderRadius: 12,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
