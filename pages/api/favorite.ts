import { NextApiHandler } from "next";
import fs from "fs";
import { BackendUser } from "../../@types";
import { getSessionUser, validateRequired } from "../../lib/helpers";

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
  if (!validateRequired(req.body.universityName)) {
    res.status(422).json({ message: "University name is required." });
    return;
  }

  user = {
    ...user,
    favorites: user.favorites?.includes(req.body.universityName)
      ? user.favorites.filter((fav) => fav !== req.body.universityName)
      : [...(user.favorites || []), req.body.universityName],
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
