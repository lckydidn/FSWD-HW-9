// Lucky Didan Ramadhan
// FSWD Batch 7
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import morgan from "morgan";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
