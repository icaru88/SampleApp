import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Theme} from 'src/Theme';

type UserItemProps = {
  name: string;
  email: string;
  onPress: () => void;
  avatar: string;
};

export const UserItem: React.FC<UserItemProps> = props => {
  const {onPress, name, email, avatar} = props;

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image
          source={{uri: avatar}}
          width={80}
          style={styles.profileImageStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.emailStyle}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    borderBottomColor: Theme.colors.gray,
    borderBottomWidth: 1,
    justifyContent: 'center',
    flex: 1,
  },
  profileImageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  nameStyle: {
    fontSize: Theme.fontSize.title6,
  },
  emailStyle: {
    fontSize: Theme.fontSize.body3,
    color: Theme.fontColor.gray,
    paddingTop: 10,
  },
});
