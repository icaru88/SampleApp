import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme} from 'src/Theme';

type Props = {
  password: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  onPress: () => void;
  title: string;
};

export const PasswordTextInput: React.FC<Props> = props => {
  const {password, onChangeText, showPassword, onPress, title} = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        placeholderTextColor="#aaaaaa"
        secureTextEntry={!showPassword}
        placeholder={title}
        onChangeText={onChangeText}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity onPress={onPress} style={styles.eyeIconContainer}>
        <Ionicons
          name={showPassword ? 'eye-outline' : 'eye-off-outline'}
          size={23}
          color={Theme.colors.pink}
        />
      </TouchableOpacity>
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
  eyeIconContainer: {
    alignSelf: 'center',
  },
});
