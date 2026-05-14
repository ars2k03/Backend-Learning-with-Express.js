import express, { type Application, type Request, type Response } from "express";
import {Pool} from "pg";
const app : Application = express()
const port : number = 8000

app.use(express.json());
app.use(express.text());


const pool = new Pool({
  connectionString : 
  "postgresql://neondb_owner:npg_aCDs57gmcxrY@ep-winter-mud-ap9a9vae-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

app.get('/', (req : Request, res : Response) =>{
  res.status(200).json({
    message : "Express JS",
    Auth    : "A R S"
  });
})

app.post('/', (req : Request, res : Response) => {
  const {name, email, password} = req.body;
  res.status(201).json({
    message : "Created",
    data : {
      name,
      email
    },
  });
})

app.listen(port, () => {
  console.log(`Server is Rnning Port ${port}`);
})