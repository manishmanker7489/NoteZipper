import express from "express";
import {config} from "dotenv";

config();

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, '0.0.0.0', () => console.log(`Server started at ${port}`));
