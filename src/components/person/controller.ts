import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const prisma = new PrismaClient();

export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const data = req.body;
    const hash = await bcrypt.hash(data.password, saltRounds);
    console.log(`password -> ${data.password}`)
    console.log(`hash -> ${hash}`)
    data.password = hash
    
    await prisma.person.create({ data });

    res.status(201).json({ ok: true, message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      const users = await prisma.person.findMany();

      return res.status(200).json({
        ok: true,
        data: users,
      });
    } else {
      const user = await prisma.person.findUnique({
        where: {  
          id: Number(req.params.id),
        },
      });

      return res.status(200).json({
        ok: true,
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    
    const data = req.body;

    const foundUser = await prisma.person.findUnique({
      where: {
        name: data.name,
      },
    });

    if (!foundUser) {
      return res.status(401).json({ ok: false, message: "Nombre de usuario no es valido" });
    }

    const isMatch = await bcrypt.compare(data.password, foundUser.password);

    if (isMatch) {
      console.log("match");
      const token = jwt.sign(data, "secretKey", {expiresIn: '1h'});

      // const date = new Date().toLocaleDateString("es-PE", { timeZone: "America/Lima" });
      // console.log(date, typeof date);
      const datePeru = new Date();
      console.log(datePeru);
      
      await prisma.person.update({
        where: {
          name: data.name,
        },
        data: {
          last_session: datePeru,
        },
      });

      return res.status(200).json({
        ok: true,
        message: "logeado correctamente",
        token: token,
      });

    } else {
      return res.status(401).json({ ok: false, message: "password incorrecto" });
    }

  } catch (error) {
    return res.status(500).json({ ok: false, message: error });
  }
};