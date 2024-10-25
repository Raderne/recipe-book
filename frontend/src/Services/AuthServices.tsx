import axios from "axios";
import { UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5191/api";

export const LoginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(`${api}/account/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const RegisterAPI = async (
  userName: string,
  email: string,
  password: string
) => {
  try {
    console.log(userName, email, password);
    const data = await axios.post<UserProfileToken>(`${api}/account/register`, {
      userName,
      email,
      password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
