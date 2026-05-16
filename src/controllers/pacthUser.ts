import {type Request, type Response } from "express";
import { User } from "../models/users";

export const patchUser = async (req: Request, res: Response) => {
  const body = req.body;

  const updatedUser = await User.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json({
    message: "User updated successfully",
    data: updatedUser
  });
}