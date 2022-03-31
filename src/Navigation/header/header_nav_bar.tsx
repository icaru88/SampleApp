import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {deviceWidth, spaceForDevice} from 'src/Config/check_iphone_x';
import {useAppDispatch} from 'src/hooks';
import {authActions} from 'src/Store/AuthSlice';
import {Theme} from 'src/Theme';
import {clearTokenStorage} from 'src/Utils/EncryptedStorage';
type Props = {
  title?: string;
  style?: any;
};

export const HeaderNavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    Alert.alert('Logout', 'Are you sure to proceed with logout?', [
      {
        text: 'OK',
        onPress: () => {
          clearTokenStorage();
          dispatch(authActions.clearAuthDetails());
        },
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
    ]);
  };

  return (
    <View
      style={[
        [
          {
            height: spaceForDevice({iPhoneX: 88, iPhone: 64, android: 30}),
          },
          styles.mainContainer,
        ],
      ]}>
      <TouchableOpacity
        style={{
          marginRight: 25,
          marginTop: spaceForDevice({iPhoneX: 30, iPhone: 15, android: 0}),
        }}
        onPress={onLogout}>
        <Text
          style={[
            {
              color: Theme.fontColor.link,
            },
            styles.textStyle,
          ]}>
          Logout
        </Text>
      </TouchableOpacity>
      <View
        style={{
          width: deviceWidth / 5,
          marginTop: spaceForDevice({iPhoneX: 30, iPhone: 15, android: 0}),
        }}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </View>

      <View
        style={{
          width: deviceWidth / 5,
          marginTop: spaceForDevice({iPhoneX: 30, iPhone: 15, android: 0}),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
