import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Theme} from 'src/Theme';

type itemProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeHolder?: string;
  onPressToSearch: () => void;
  onClearText: () => void;
};

export const SearchBar: React.FC<itemProps> = props => {
  const {value, onChangeText, placeHolder, onPressToSearch, onClearText} =
    props;
  return (
    <View style={{paddingTop: 10, flex: 1}}>
      <View style={styles.itemContainer}>
        <TextInput
          style={styles.itemText}
          onChangeText={onChangeText}
          value={value}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          placeholder={placeHolder}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.clearButton} onPress={onClearText}>
          <Ionicons name={'close'} size={16} color={Theme.colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.goButton} onPress={onPressToSearch}>
          <Text style={styles.goText}>Go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: Theme.colors.lightGray,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: Theme.fontSize.title6,
    color: Theme.colors.black,
    textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexGrow: 1,
  },
  clearButton: {
    borderRadius: 20,
    backgroundColor: Theme.colors.lightGray,
    margin: 10,
  },
  goButton: {
    borderColor: Theme.colors.lightGray,
    borderLeftWidth: 1,
  },
  goText: {
    fontSize: Theme.fontSize.title6,
    color: Theme.colors.black,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
