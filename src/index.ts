import express, { type Application} from "express";
import mongoose from "mongoose";
import router from "./routes/user";
import { logUse } from "./middleware";
import { mainRoot } from "./controllers/mainRoot";
const app : Application = express();
const port : number = 8000;

//Connect MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/ARS')
.then(() => console.log("MongoDB is Connected Succesfully")
).catch((e) => console.log(`Connection Failed : ${e}`));

//MiddleWare - Plugins
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Custom MiddleWare

app.use(logUse('./src/test.txt'));

//Router
app.use('/api/users', router);

//Main
app.get('/users', mainRoot);

app.listen(port, () => {
  console.log("Server is Running...");
})