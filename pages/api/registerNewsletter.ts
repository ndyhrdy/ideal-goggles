// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";
import fs from "fs";

const databaseFilename = "data/users.json";

const addUserToSubscribersList = (email: string): void => {
  let jsonContent = "[]";
  try {
    jsonContent = fs.readFileSync(databaseFilename, { encoding: "utf-8" });
  } catch (error) {
    console.log("Database does not exist yet. Creating users.json file.");
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
  if (
    !req.body.email ||
    typeof req.body.email !== "string" ||
    !req.body.email.trim().length
  ) {
    res.status(400).json({ message: "Email address is required." });
    return;
  }
  if (
    !req.body.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).length
  ) {
    res.status(400).json({ message: "Email address is not valid." });
    return;
  }
  addUserToSubscribersList(req.body.email);
  res
    .status(200)
    .json({ message: "You have successfully subscribed to our newsletter!" });
};

export default handler;
