import { BackendUser, Session } from "../@types";
import bcrypt from "bcrypt";
import fs from "fs";

export const validateRequired = (value: any): boolean => {
  return !!value && typeof value === "string" && !!value.trim().length;
};

export const validateEmail = (value: string): boolean => {
  return !!value.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).length;
};

export const getSessionUser = async (token?: string): Promise<BackendUser> => {
  if (!validateRequired(token)) {
    return Promise.reject(new Error("unauthenticated"));
  }

  const usersDatabaseFilename = process.env.USERS_DATABASE_FILENAME;
  const sessionsDatabaseFilename = process.env.SESSIONS_DATABASE_FILENAME;

  let usersJsonContent = "[]";
  let sessionsJsonContent = "[]";
  try {
    usersJsonContent = fs.readFileSync(usersDatabaseFilename, {
      encoding: "utf-8",
    });
    sessionsJsonContent = fs.readFileSync(sessionsDatabaseFilename, {
      encoding: "utf-8",
    });
  } catch (error) {
    return Promise.reject(new Error("unauthenticated"));
  }

  const sessions: Session[] = JSON.parse(sessionsJsonContent);
  let session: Session;
  for (let index = 0; index < sessions.length; index++) {
    if (await bcrypt.compare(token, sessions[index].token)) {
      session = sessions[index];
      index = sessions.length;
    }
  }
  if (!session) {
    return Promise.reject(new Error("unauthenticated"));
  }
  const users: BackendUser[] = JSON.parse(usersJsonContent);
  const user = users.find((user) => user.email === session.email);
  if (!user) {
    return Promise.reject(new Error("unauthenticated"));
  }
  return user;
};
