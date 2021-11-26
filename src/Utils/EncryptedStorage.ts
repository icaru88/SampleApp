import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'TOKEN';
const EMAIL_KEY = 'EMAIL';

const storeUserToken = async (token: string) => {
  try {
    await EncryptedStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log('storeUserToken - data:', token, ' - error:', error);
  }
};

const retrieveUserToken = async () => {
  try {
    return (await EncryptedStorage.getItem(TOKEN_KEY)) as string;
  } catch (error) {
    console.log('retrieveUserToken - error:', error);
    return;
  }
};

const storeUserEmail = async (email: string) => {
  try {
    await EncryptedStorage.setItem(EMAIL_KEY, email);
  } catch (error) {
    console.log('storeUserEmail - data:', email, ' - error:', error);
  }
};

const retrieveUserEmail = async () => {
  try {
    return (await EncryptedStorage.getItem(EMAIL_KEY)) as string;
  } catch (error) {
    console.log('retrieveUserEmail - error:', error);
    return;
  }
};

const clearTokenStorage = async () => {
  try {
    await EncryptedStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log('clearStorage - error:', error);
  }
};

export {
  storeUserToken,
  retrieveUserToken,
  clearTokenStorage,
  storeUserEmail,
  retrieveUserEmail,
};
