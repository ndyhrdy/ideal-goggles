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
  favorites?: University[];
};

export type BackendUser = User & {
  password: string;
};

export type AuthenticatedUser = User & {
  token: string;
};

export type Session = {
  email: string;
  token: string;
};
