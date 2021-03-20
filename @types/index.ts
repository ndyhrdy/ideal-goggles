export type University = {
  "state-provice": null | string;
  alpha_two_code: string;
  country: string;
  domains?: string[];
  name: string;
  web_pages?: string[];
};

export type User = {
  email: string;
  fullName: string;
};

export type BackendUser = User & {
  password: string;
};
