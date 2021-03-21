import { NextApiHandler } from "next";
import bcrypt from "bcrypt";
import fs from "fs";
import { BackendUser } from "../../@types";
import { validateEmail, validateRequired } from "../../lib/helpers";

type RegisterUserData = {
  email: string;
  fullName: string;
  password: string;
};

const usersDatabaseFilename = process.env.USERS_DATABASE_FILENAME;

const registerUser = async (data: RegisterUserData): Promise<BackendUser> => {
  let jsonContent = "[]";
  try {
    jsonContent = fs.readFileSync(usersDatabaseFilename, { encoding: "utf-8" });
  } catch (error) {
    console.log(
      `Database does not exist yet. Creating ${usersDatabaseFilename} file.`
    );
  }
  let usersList: BackendUser[] = JSON.parse(jsonContent);
  if (usersList.find((user) => user.email === data.email)) {
    return Promise.reject(
      new Error("User with the same email address already exists.")
    );
  }
  const passwordHashed = await bcrypt.hash(data.password, 10);
  const user: BackendUser = {
    email: data.email,
    fullName: data.fullName,
    password: passwordHashed,
  };
  usersList = [...usersList, user];
  fs.writeFileSync(usersDatabaseFilename, JSON.stringify(usersList, null, 2), {
    encoding: "utf-8",
  });
  return Promise.resolve(user);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() !== "post") {
    res.status(404);
    return;
  }
  const errors = {};
  if (!validateRequired(req.body.email)) {
    errors["email"] = { message: "Email address is required." };
  } else if (!validateEmail(req.body.email)) {
    errors["email"] = { message: "Email address is not valid." };
  }
  if (!validateRequired(req.body.fullName)) {
    errors["fullName"] = { message: "Full name is required." };
  }
  if (!validateRequired(req.body.password)) {
    errors["password"] = { message: "Password is required." };
  } else if (req.body.password.length < 8) {
    errors["password"] = {
      message: "Password should have at least 8 characters.",
    };
  }
  if (req.body.password !== req.body.confirmPassword) {
    errors["confirmPassword"] = { message: "Password does not match" };
  }

  if (Object.entries(errors).length) {
    res.status(422).json({ message: "The submitted data is invalid.", errors });
    return;
  }

  try {
    await registerUser(req.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
  res.status(200).json({ message: "You have successfully registered!" });
};

export default handler;
