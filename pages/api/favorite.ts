import { NextApiHandler } from "next";
import fs from "fs";
import { BackendUser } from "../../@types";
import { getSessionUser } from "../../lib/helpers";

const handler: NextApiHandler = async (req, res) => {
  if (req.method?.toLowerCase() !== "post") {
    res.status(404);
    return;
  }
  let user: BackendUser;
  try {
    user = await getSessionUser(req.headers.authorization);
  } catch (error) {
    res.status(403);
    return;
  }
  if (!req.body.university) {
    res.status(422).json({ message: "University is required." });
    return;
  }

  user = {
    ...user,
    favorites: user.favorites?.find(
      (fav) => fav.name === req.body.university.name
    )
      ? user.favorites.filter((fav) => fav.name !== req.body.university.name)
      : [...(user.favorites || []), req.body.university],
  };

  const usersDatabaseFilename = process.env.USERS_DATABASE_FILENAME;
  let usersJsonContent = "[]";
  try {
    usersJsonContent = fs.readFileSync(usersDatabaseFilename, {
      encoding: "utf-8",
    });
  } catch (error) {
    return Promise.reject(new Error("unauthenticated"));
  }
  const users: BackendUser[] = JSON.parse(usersJsonContent);
  fs.writeFileSync(
    usersDatabaseFilename,
    JSON.stringify(
      users.map((dbUser) => (dbUser.email === user.email ? user : dbUser)),
      null,
      2
    )
  );

  res.status(200).json({
    email: user.email,
    fullName: user.fullName,
    favorites: user.favorites || [],
  });
};

export default handler;
