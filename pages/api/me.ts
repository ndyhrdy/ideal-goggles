import { NextApiHandler } from "next";
import { getSessionUser } from "../../lib/helpers";

const handler: NextApiHandler = async (req, res) => {
  try {
    const user = await getSessionUser(req.headers.authorization);
    res
      .status(200)
      .json({
        email: user.email,
        fullName: user.fullName,
        favorites: user.favorites || [],
      });
  } catch (error) {
    res.status(403);
  }
};

export default handler;
