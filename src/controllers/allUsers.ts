import { User } from "../models/users";
import {type Request, type Response } from "express";

export const allUsers = async (req : Request, res : Response) => {
  const user = await User.find({})
  res.setHeader('X-Me', 'A R S Arafat');
  return res.status(200).json(user);
}