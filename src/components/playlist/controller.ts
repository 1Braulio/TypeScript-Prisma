import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    await prisma.playlist.create({ data });

    res.status(201).json({ ok: true, message: "playlist creado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const findAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        songs: {
          include: {
            song: true,
          },
        },
      },
    });

    res.status(200).json({
      ok: true,
      data: playlists,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const addSong = async (req: Request, res: Response): Promise<void> => {
	try {
		const {songId, playlistId} = req.body;

		await prisma.songsOnPlaylists.create({
			data: {
				playlistId: playlistId,
				songId: songId
			}
		});

	  res.status(201).json({ ok: true, message: "canción agregada correctamente" });

  } catch (error) {
    res.status(500).json({ ok: false, message: error });
	}
}