import { NextApiHandler } from "next";
import fs from "fs";

const databaseFilename = process.env.NEWSLETTER_DATABASE_FILENAME;

const getSubscibersList = (): string[] => {
  let jsonContent = "[]";
  try {
    jsonContent = fs.readFileSync(databaseFilename, { encoding: "utf-8" });
  } catch (error) {
    console.log("Database does not exist.");
  }
  let usersList: string[] = JSON.parse(jsonContent);
  return usersList;
};

const handler: NextApiHandler = (req, res) => {
  if (req.method?.toLowerCase() !== "get") {
    res.status(404);
    return;
  }
  const subscibersList = getSubscibersList();
  res.status(200).json(subscibersList);
};

export default handler;
