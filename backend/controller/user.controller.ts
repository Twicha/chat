import { Request, Response } from "express";
import { Pool } from "pg";

const db: Pool = require("../db");

export const createUser = async (req: Request, res: Response) => {
  const { username, firstname, phone } = req.body;

  try {
    const data = await db.query("SELECT * FROM users WHERE phone=$1;", [phone]);

    const isUserExist: boolean = !!data.rows.length;

    if (isUserExist) {
      res.status(400).json({ message: "Пользователь уже существует" });
    } else {
      const userData = await db.query(
        "INSERT INTO users (username, firstname, phone) values($1, $2, $3) RETURNING *",
        [username, firstname, phone]
      );

      res.json(userData.rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getUsers = async (_: Request, res: Response) => {
  try {
    const data = await db.query("SELECT * FROM users");

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await db.query("SELECT * FROM users WHERE username = $1", [
      req.params.id,
    ]);

    res.json(data.rows[0]);
  } catch (e) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const data = await db.query("DELETE FROM users WHERE id = $1", [
      req.params.id,
    ]);

    res.json({ message: "Пользователь удалён", id: req.params.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const login = async (
  req: Request<any, any, { phone: string }>,
  res: Response
) => {
  const { phone } = req.body;

  const formattedPhone: string = phone.replace(/\s/g, "");

  try {
    const data = await db.query("SELECT * FROM users WHERE phone=$1;", [
      formattedPhone,
    ]);

    const isUserExist: boolean = !!data.rows.length;

    if (isUserExist) {
      res.json(data.rows[0]);
    } else {
      res.status(400).json({ message: "Пользователя не существует" });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
