import cors from "cors";
import morgan from "morgan";
import express from "express";
import { router } from "./api/Router/router";

const app = express()

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json());

app.use(router)

export default app;