import express from "express";
import { config } from "dotenv";
import { ConnectDB } from "./dbConnection.js";

import {notes} from "./data/notes.js"; 

config();
ConnectDB();

const port = process.env.PORT || 5000;
const app = express();

app.get('/notes', (req, res) => {
    res.json(notes);
})

app.listen(port, () => console.log(`Server started at ${port}`));
