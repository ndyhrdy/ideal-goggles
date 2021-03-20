// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";
import fs from "fs";
import { validateEmail, validateRequired } from "../../lib/helpers";

const databaseFilename = process.env.NEWSLETTER_DATABASE_FILENAME;

const addUserToSubscribersList = (email: string): void => {
  let jsonContent = "[]";
  try {
    jsonContent = fs.readFileSync(databaseFilename, { encoding: "utf-8" });
  } catch (error) {
    console.log(
      `Database does not exist yet. Creating ${databaseFilename} file.`
    );
  }
  let usersList: string[] = JSON.parse(jsonContent);
  if (!usersList.find((user) => user === email)) {
    usersList = [...usersList, email];
  }
  fs.writeFileSync(databaseFilename, JSON.stringify(usersList, null, 2), {
    encoding: "utf-8",
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() !== "post") {
    res.status(404);
    return;
  }
  if (!validateRequired(req.body.email)) {
    res.status(400).json({ message: "Email address is required." });
    return;
  }
  if (!validateEmail(req.body.email)) {
    res.status(400).json({ message: "Email address is not valid." });
    return;
  }
  addUserToSubscribersList(req.body.email);
  res
    .status(200)
    .json({ message: "You have successfully subscribed to our newsletter!" });
};

export default handler;
