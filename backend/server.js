import express from "express";
import { config } from "dotenv";
import { ConnectDB } from "./dbConnection.js";

import { notes } from "./data/notes.js";

import UserRouter from "./routes/userRoute.js";
import NoteRouter from  "./routes/notesRoutes.js"
import { errorHandler, notFound } from "./middlewars/errorMiddlewars.js";

config();
ConnectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/user", UserRouter);
app.use("/notes", NoteRouter);

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started at ${port}`));
