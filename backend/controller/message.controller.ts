import { Request, Response } from "express";
import { Pool } from "pg";

const db: Pool = require("../db");

export const getMessages = async (req: Request, res: Response) => {
  const chatId = req?.query?.chatId;

  try {
    if (!chatId) {
      throw Error;
    }

    const data = await db.query(
      'SELECT * FROM (SELECT * FROM messages WHERE "chatId" = $1) as message order by "createdAt" ASC',
      [chatId]
    );

    res.json(data.rows);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Server error",
    });
  }
};

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const data = await db.query("DELETE FROM users WHERE id = $1", [
//       req.params.id,
//     ]);

//     res.json({ message: "Пользователь удалён", id: req.params.id });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       error: "Server error",
//     });
//   }
// };
