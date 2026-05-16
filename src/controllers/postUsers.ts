import {type Request, type Response } from "express";
import { User } from "../models/users";

export const postUsers = async (req : Request, res : Response) => {
  const body = req.body;
  if(!body.first_name || 
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ){
    return res.status(404).json({
      message : "All Field are Required"
    })
  }

  const result = await User.create({
    first_name : body.first_name,
    last_name : body.last_name,
    email : body.email,
    gender : body.gender,
    job_title : body.job_title
  })

  return res.status(201).json({
    message : "Success",
    data : result
  })
}