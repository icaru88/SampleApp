import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'TOKEN';
const EMAIL_KEY = 'EMAIL';

const storeUserToken = async (token: string) => {
  console.log('storing user token - ', token);
  try {
    await EncryptedStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log('storeUserToken - data:', token, ' - error:', error);
  }
};

const retrieveUserToken = async () => {
  console.log('retrieving user token');

  try {
    const token = await EncryptedStorage.getItem(TOKEN_KEY);
    console.log(token);
    return token as string;
  } catch (error) {
    console.log('retrieveUserToken:', error);
    return;
  }
};

const storeUserEmail = async (email: string) => {
  console.log('storing user email - ', email);
  try {
    await EncryptedStorage.setItem(EMAIL_KEY, email);
  } catch (error) {
    console.log('storeUserEmail - data:', email, ' - error:', error);
  }
};

const retrieveUserEmail = async () => {
  console.log('retrieving user email');

  try {
    const email = await EncryptedStorage.getItem(EMAIL_KEY);
    console.log(email);
    return email as string;
  } catch (error) {
    console.log('retrieveUserEmail:', error);
    return;
  }
};

const clearTokenStorage = async () => {
  console.log('clearing user token');

  try {
    await EncryptedStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log('clearStorage:', error);
  }
};

export {
  storeUserToken,
  retrieveUserToken,
  clearTokenStorage,
  storeUserEmail,
  retrieveUserEmail,
};
