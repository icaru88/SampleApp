import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {isIphoneX} from 'src/Config/check_iphone_x';
import {Theme} from 'src/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? (isIphoneX ? 30 : 15) : 0,
    backgroundColor: Theme.backgroundColor,
    justifyContent: 'center',
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: Theme.fontSize.title1,
    marginTop: 50,
    marginBottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
  },
  header: {
    fontSize: Theme.fontSize.title1,
    marginBottom: 20,
  },
  subtitle1: {
    fontSize: Theme.fontColor.subtitle1,
    opacity: 0.6,
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: Theme.colors.pink,
    height: 86,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  eyeIconContainer: {
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: Theme.fontSize.subtitle1,
    textAlign: 'center',
    paddingTop: 20,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: Theme.colors.gray,
    marginBottom: 10,
  },
  footerContainer: {
    marginBottom: 100,
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: Theme.fontColor.gray,
  },
  footerLink: {
    color: Theme.fontColor.link,
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  checkbox: {
    marginRight: 10,
  },
  tnc: {flex: 1, flexWrap: 'wrap'},
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
