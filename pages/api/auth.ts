import { NextApiHandler } from "next";
import { AuthenticatedUser, BackendUser, Session } from "../../@types";
import { validateEmail, validateRequired } from "../../lib/helpers";
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";

const usersDatabaseFilename = process.env.USERS_DATABASE_FILENAME;
const sessionsDatabaseFilename = process.env.SESSIONS_DATABASE_FILENAME;

const authenticate = async (
  email: string,
  password: string
): Promise<AuthenticatedUser> => {
  let user: BackendUser;
  try {
    const jsonContent = fs.readFileSync(usersDatabaseFilename, {
      encoding: "utf-8",
    });
    const users: BackendUser[] = JSON.parse(jsonContent);
    user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error("User not found");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    return Promise.reject({
      status: 403,
      message: "User credentials do not match our records.",
    });
  }

  const session = {
    email: user.email,
    token: crypto.randomBytes(16).toString("hex"),
  };
  let jsonContent = "[]";
  try {
    jsonContent = fs.readFileSync(sessionsDatabaseFilename, {
      encoding: "utf-8",
    });
  } catch (error) {
    console.log(
      `Database does not exist yet. Creating ${sessionsDatabaseFilename} file.`
    );
  }
  const sessions: Session[] = JSON.parse(jsonContent);
  sessions.push({ ...session, token: await bcrypt.hash(session.token, 10) });
  fs.writeFileSync(sessionsDatabaseFilename, JSON.stringify(sessions, null, 2));
  return Promise.resolve({
    ...session,
    fullName: user.fullName,
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() !== "post") {
    res.status(404);
    return;
  }
  if (!validateRequired(req.body.email)) {
    res.status(422).json({ message: "Email address is required." });
    return;
  } else if (!validateEmail(req.body.email)) {
    res.status(422).json({ message: "Email is invalid" });
    return;
  }
  if (!validateRequired(req.body.password)) {
    res.status(422).json({ message: "Password is required." });
    return;
  }
  try {
    const user = await authenticate(req.body.email, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: error.message });
  }
};

export default handler;
