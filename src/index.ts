import express, { type Application, type NextFunction, type Request, type Response } from "express";
import file from './Database/data.json' with { type: 'json' };
import fs from "fs";

const app : Application = express();
const port : number = 8000;

//MiddleWare - Plugins
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Custom MiddleWare

app.use((req : Request, res : Response, next : NextFunction) => {
  const data = `${new Date()} : ${req.method}\n`;
  fs.appendFile('./src/test.txt', data, (error) => {
    if(error){
      return res.status(404).send('404 Not Found');
    }
    next();
  })
})

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
  res.setHeader('X-Me', 'A R S Arafat');

  console.log(req.headers);
  
  return res.status(200).json(file);
})
.post((req : Request, res : Response) => {
  const body = req.body;
  file.push({
    id : file.length + 1,
    ...body,
  });

  fs.writeFile('./src/Database/data.json', JSON.stringify(file), (error) => {
    if(error){
      return res.status(500).json({
        message : "Failed to Created Data"
      })
    }
    return res.status(201).json({
      message : "Created Successfully", 
      data : body,
    })
  })
})

app.route('/api/users/:id')
.get((req : Request, res : Response) => {
  const id = req.params.id;
  const user = file.find(person => person.id === Number(id));

  if(!user) {
    return res.status(404).json({
      message : "404 Not Found"
    })
  }

  return res.status(200).json(user);
})
.patch((req: Request, res: Response) => {
  const id = Number(req.params.id);
  const body = req.body;

  const userIndex = file.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  file[userIndex] = {
    ...file[userIndex],
    ...body,
  };

  fs.writeFile('./src/Database/data.json', JSON.stringify(file, null, 2), (error) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to update user"
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      data: body
    });
  });
})
.delete((req: Request, res: Response) => {
  const id = Number(req.params.id);

  const userIndex = file.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const deletedUser = file[userIndex];

  file.splice(userIndex, 1);

  fs.writeFile('./src/Database/data.json', JSON.stringify(file), (error) => {
    if (error) {
      return res.status(500).json({
        message: "Failed to delete user"
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });
  });
})


app.listen(port, () => {
  console.log("Server is Running...");
})