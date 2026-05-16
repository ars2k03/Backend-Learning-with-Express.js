import {type Request, type Response } from "express";
import { User } from "../models/users";

export const oneUser = async (req : Request, res : Response) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return res.status(404).json({
      message : "404 Not Found"
    })
  }
  return res.status(200).json(user);
}