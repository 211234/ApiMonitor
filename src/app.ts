import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault('America/Mexico_City');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3002;
const HOST = process.env.HOST || "0.0.0.0"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

db().then(() => console.log("Conexion Ready"));

app.listen({ port: PORT, host: HOST }, () => {
  console.log(`Listo por el puerto ${PORT} y la dirección ${HOST}`);
});
