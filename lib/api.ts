import axios, { CancelTokenSource } from "axios";
import { AuthenticatedUser, University, User } from "../@types";

const universitiesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

type SearchUniversitiesParams = {
  country?: string;
  name?: string;
};

export const searchUniversities = async (
  params: SearchUniversitiesParams,
  cancelTokenSource: CancelTokenSource
): Promise<University[]> => {
  const { data: universities } = await universitiesApi.get<University[]>(
    "/search",
    {
      params,
      cancelToken: cancelTokenSource.token,
    }
  );
  return Promise.resolve(universities.slice(0, 100));
};

type RegisterUserData = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

export const registerUser = async (
  data: RegisterUserData,
  cancelTokenSource: CancelTokenSource
): Promise<void> => {
  await axios.post("/api/register", data, {
    cancelToken: cancelTokenSource.token,
  });
  return Promise.resolve();
};

type AuthenticateData = {
  email: string;
  password: string;
};

export const authenticate = async (
  data: AuthenticateData,
  cancelTokenSource: CancelTokenSource
): Promise<AuthenticatedUser> => {
  const { data: user } = await axios.post<AuthenticatedUser>(
    "/api/auth",
    data,
    { cancelToken: cancelTokenSource.token }
  );
  return Promise.resolve(user);
};

export const me = async (token: string): Promise<User> => {
  const { data: user } = await axios.get<User>("/api/me", {
    headers: {
      Authorization: token,
    },
  });
  return Promise.resolve(user);
};
