import {type Request, type Response } from "express";
import { User } from "../models/users";

export const mainRoot = async (req : Request, res : Response) => {
  const file = await User.find({});
  const html = `
  <ul>
    ${file.map(user => `<li>${user.first_name} -> ${user.last_name}</li>`).join("")}
  </ul>
  `
  return res.status(200).send(html);
}