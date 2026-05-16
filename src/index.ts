import express, { type Application, type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import mongoose from "mongoose";

const app : Application = express();
const port : number = 8000;

//Connect MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/ARS')
.then(() => console.log("MongoDB is Connected Succesfully")
).catch((e) => console.log(`Connection Failed : ${e}`));

//Schema

const userSchema = new mongoose.Schema({
  first_name : {
    type : String,
    required : true,
  },

  last_name : {
    type : String,
    required : true,
  },

  email : {
    type : String,
    required : true,
    unique : true,
  },

  gender : {
    type : String,
    required : true,
  },

  job_title : {
    type : String,
    required : true
  }
}, {timestamps : true});

const User = mongoose.model('user', userSchema);

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

app.get('/users', async (req : Request, res : Response) => {
  const file = await User.find({});
  const html = `
  <ul>
    ${file.map(user => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `
  return res.status(200).send(html);
})

//REST API
app.route('/api/users')
.get( async (req : Request, res : Response) => {
  const user = await User.find({})
  res.setHeader('X-Me', 'A R S Arafat');
  return res.status(200).json(user);
})
.post(async (req : Request, res : Response) => {
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
})

app.route('/api/users/:id')
.get(async (req : Request, res : Response) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    return res.status(404).json({
      message : "404 Not Found"
    })
  }

  return res.status(200).json(user);
})
.patch( async (req: Request, res: Response) => {
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
})
.delete(async (req: Request, res: Response) => {
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
})


app.listen(port, () => {
  console.log("Server is Running...");
})