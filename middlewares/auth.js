import prisma from "../config/config.js";
import bcrypt from "bcrypt";

const auth = async (req, res, next) => {
  const { email, password } = req.headers;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password Required",
    });
  }

  try {
    const data = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!data || !bcrypt.compareSync(password, data.password)) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    req.data = data;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
