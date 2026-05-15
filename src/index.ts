import express, { type Application, type Request, type Response } from "express";
import file from './Database/data.json' with { type: 'json' };
const app : Application = express();
const port : number = 8000;

app.get('/users', (req : Request, res : Response) => {
  const html = `
  <ul>
    ${file.map(user => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `
  return res.status(200).send(html);
})


//REST API
app.route('/api/users').get((req : Request, res : Response) => {
  return res.status(200).json(file);
}).post((req : Request, res : Response) => {
  return res.status(200).json({
    message : "Pending..."
  })
})

app.route('/api/users/:id')
.get((req : Request, res : Response) => {
  const id = req.params.id;
  const user = file.find(person => person.id === Number(id));

  if(!user) {
    res.status(404).json({
      message : "404 Not Found"
    })
  }

  return res.status(200).json(user);
})
.patch((req : Request, res : Response) => {

})
.delete((req : Request, res : Response) => {

})


app.listen(port, () => {
  console.log("Server is Running...");
})