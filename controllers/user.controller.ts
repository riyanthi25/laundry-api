import { PrismaClient, Prisma  } from "@prisma/client";
import { decodeHash, generateHash } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const userData = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
        },
      });

      res.status(200).json({ data: userData });
    } catch (error) {
      console.error("Error while getting users:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving users." });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user) {
        res.json({ data: user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error("Error while getting user by ID:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving user." });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      // destruct data
      const { username, password, role } = req.body as {
        username: string;
        password: string;
        role: string;
      };

      if (!username || !password || !role) {
        return res.status(400).json({ error: "All fields are required." });
      }
      const hashedPassword = generateHash(password);
      const result = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role: Number(role),
        },
      });
      res.status(201).json(result);
    } catch (error) {
      console.error("Error while creating user:", error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this username"
          );
        }
        const errorMessage =
          error.code === "P2002"
            ? "Username Already exists."
            : "An error occurred while creating the user.";
        res
          .status(error.code === "P2002" ? 409 : 500)
          .json({ error: errorMessage });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };
      const findUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (findUser) {
        const isPasswordValid = decodeHash(password, findUser.password);
        if (isPasswordValid) {
          const { id, username, role } = findUser;
          res.status(200).json({
            token: generateToken({ id, username, role }),
          });
        } else {
          res.status(400).json({ message: "Invalid username or password" });
        }
      } else {
        res.status(400).json({ message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error while user login:", error);
      res.status(500).json({ error: "An error occurred while user login." });
    }
  }
}

export default UserController;
