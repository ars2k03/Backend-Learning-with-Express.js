import {type Request, type Response } from "express";
import { User } from "../models/users";

export const deleteUser = async (req: Request, res: Response) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  return res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser
  });
}