import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    await prisma.song.create({ data });

    res.status(201).json({ ok: true, message: "cancion creada correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const find = async (req: Request, res: Response) => {
  try {
    let songs;
    if (!req.params.id) {

      songs = await prisma.song.findMany({
        where: {
          private: false,
        },
      });
    } else {
      songs = await prisma.song.findMany({
        where: {
          id: Number(req.params.id),
          private: false,
        },
      });
    }
    return res.status(200).json({
      ok: true,
      data: songs,
    });

  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const findlogged = async (req: Request, res: Response) => {
  let songs;
  try {
    if (!req.params.id) {
      songs = await prisma.song.findMany();
    } else {
      songs = await prisma.song.findMany({
        where: {
          id: Number(req.params.id),
        },
      });
    }
    return res.status(200).json({
      ok: true,
      data: songs,
    });
    
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

// export const findAllPublicP = async (req: Request, res: Response) => {
//   try {
//     if (!req.params.id) {

//       const songs = await prisma.song.findMany();

//       return res.status(200).json({
//         ok: true,
//         data: songs,
//       });

//     } else {

//       const song = await prisma.song.findUnique({
//         where: {  
//           id: Number(req.params.id),
//         },
//       });

//       return res.status(200).json({
//         ok: true,
//         data: song,
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({ ok: false, message: error });
//   }
// }; 