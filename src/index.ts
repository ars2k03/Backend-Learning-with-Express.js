import express, { type Application, type Request, type Response } from "express";

const app : Application = express();
const port : number = 8000;

app.get('/', (req : Request, res : Response) => {
  res.send("Hello World");
})

app.get('/about', (req : Request, res : Response) => {
  res.send(`Good Morning ${req.query.name}`);
})

app.listen(port, () => {
  console.log("Server is Running...");
})