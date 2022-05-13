import { Request, Response } from "express";
import { Pool } from "pg";

const db: Pool = require("../db");

export const createRoom = async (req: Request, res: Response) => {
  const { usersIds } = req.body;

  try {
    const rooms = await (await db.query("SELECT * FROM rooms")).rows;

    const availableRoom = rooms.find((room) => {
      return room.users.every((user) => usersIds.includes(user));
    });

    if (availableRoom) {
      res.json(availableRoom);
    } else {
      const userData = await db.query(
        "INSERT INTO rooms (users) values($1::uuid[]) RETURNING *",
        [usersIds]
      );

      res.json(userData.rows[0]);
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  const userId = req?.query?.userId;

  console.log(userId);

  try {
    const rooms = await db.query("SELECT * FROM rooms");

    const partnersIds = rooms.rows.map((room) =>
      room.users.find((user) => user !== userId)
    );

    const partners = await (
      await db.query("SELECT * FROM users")
    ).rows.filter((user) => partnersIds.includes(user.id));

    const filteredRooms = rooms.rows
      .filter((room) => room.users.includes(userId))
      .map((room) => {
        const partnerId = room.users.find((user) => user !== userId);

        room.partner = partners.find((user) => user.id === partnerId);

        return room;
      });

    res.json(filteredRooms);
  } catch (e) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  const chatId = req?.query?.chatId;

  try {
    if (!chatId) {
      throw Error;
    }

    const data = await db.query("SELECT * FROM rooms WHERE id = $1", [chatId]);

    res.json(data.rows[0]);
  } catch (e) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const chatId = req?.query?.chatId;

  try {
    if (!chatId) {
      throw Error;
    }

    await db.query("DELETE FROM rooms WHERE id = $1", [chatId]);

    res.json({ message: "Комната удалена", chatId });
  } catch (e) {
    res.status(500).json({
      error: "Server error",
    });
  }
};
