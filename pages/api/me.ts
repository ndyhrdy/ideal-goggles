import { NextApiHandler } from "next";
import bcrypt from "bcrypt";
import fs from "fs";
import { validateRequired } from "../../lib/helpers";
import { BackendUser, Session } from "../../@types";

const usersDatabaseFilename = process.env.USERS_DATABASE_FILENAME;
const sessionsDatabaseFilename = process.env.SESSIONS_DATABASE_FILENAME;

const handler: NextApiHandler = async (req, res) => {
  if (!validateRequired(req.headers.authorization)) {
    res.status(403);
    return;
  }
  const token = req.headers.authorization;

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
    res.status(403);
    return;
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
    res.status(403);
    return;
  }

  const users: BackendUser[] = JSON.parse(usersJsonContent);
  const user = users.find((user) => user.email === session.email);
  if (!user) {
    res.status(403);
    return;
  }
  res.status(200).json({ email: user.email, fullName: user.fullName });
};

export default handler;
