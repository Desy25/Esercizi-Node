import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken"

const logIn = async (req:Request, res:Response) => {
    const {username, password } = req.body;

    const user = (await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username)) as 
    { id: number, 
      username: string, 
      password: string, 
      token: string } | null;

    if (user && user.password === password) {
        const payload = {
            id: user.id, 
            username,
        }
        const { SECRET_KEY = "" } = process.env
        const token = jwt.sign(payload, SECRET_KEY)
        await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token])
        res.status(200).json({ id: user.id, username, token })
    } else {
        res.status(400).json({ msg: "Wrong username or password!"})
    }
}

const signUp = async (req:Request, res:Response) => {
    const { username, password } = req.body
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username)

    if (user) {
        res.status(400).json({ msg: "User already exist "})
    } else {
       const { id } = await db.one(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, password])
       res.status(201).json({id, msg: "Signup successful. Now you can log in."}) 
    }
}

const logOut = async (req: Request, res: Response) => {
    const user: any = req.user;
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null])
    res.status(200).json({ msg:"User logged out." })
}

export { logIn, signUp, logOut}