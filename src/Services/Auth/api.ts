// TODO - can try out apisauce
const BASE_URL = 'https://reqres.in/api';

export type AuthDetails = {
  email: string;
  password: string;
};
type AuthResult = {
  id?: string;
  token: string;
};

const register = async (auth: AuthDetails): Promise<AuthResult> => {
  const {email, password} = auth;
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log(response);
  return response.json();
};

const login = async (auth: AuthDetails): Promise<AuthResult> => {
  console.log(auth);
  const {email, password} = auth;
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log(response);
  return response.json();
};

export default {register, login};
