import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.get("/planets", (req, res) => {
  res.json(planets);
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});