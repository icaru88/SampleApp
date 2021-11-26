import {Dimensions, Platform, StatusBar} from 'react-native';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
export const isIphoneX =
  Platform.OS === 'ios' && deviceHeight >= 812 && deviceWidth >= 375;

type SpaceForDevice = {
  iPhoneX?: number;
  iPhone?: number;
  android?: number;
};

export const spaceForDevice = ({
  iPhoneX = 0,
  iPhone = 0,
  android = 0,
}: SpaceForDevice): number => {
  const androidSize = (!!StatusBar && StatusBar.currentHeight) || 0;
  return Platform.OS === 'ios'
    ? isIphoneX
      ? iPhoneX
      : iPhone
    : android + androidSize;
};

export const spaceForDeviceBottom = ({
  iPhoneX = 0,
  iPhone = 0,
  android = 0,
}: SpaceForDevice): number => {
  return Platform.OS === 'ios' ? (isIphoneX ? iPhoneX : iPhone) : android;
};
