import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from 'src/Theme';

type Props = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  isLoading?: boolean;
  style?: {};
};

export const RectangularButton: React.FC<Props> = props => {
  const {title, onPress, disabled, isLoading, style} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[styles.buttonStyle, style]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          !disabled
            ? [Theme.colors.skyblue, Theme.colors.pink]
            : [Theme.colors.gray, Theme.colors.lightGray]
        }
        style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.buttonTitle}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: Theme.colors.gray,
    shadowOpacity: 1,
  },
  buttonContainer: {
    elevation: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 25,
    paddingVertical: 20,
    borderColor: Theme.colors.pink,
    borderWidth: 1,
  },
  buttonTitle: {
    color: 'white',
    fontSize: Theme.fontSize.buttonText,
    fontWeight: 'bold',
  },
});
