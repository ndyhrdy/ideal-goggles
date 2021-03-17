import axios, { CancelTokenSource } from "axios";
import { University } from "../@types";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

type SearchUniversitiesParams = {
  country?: string;
  name?: string;
};

export const searchUniversities = async (
  params: SearchUniversitiesParams,
  cancelTokenSource: CancelTokenSource
): Promise<University[]> => {
  const { data: universities } = await api.get<University[]>("/search", {
    params,
    cancelToken: cancelTokenSource.token,
  });
  return Promise.resolve(universities.slice(0, 100));
};
