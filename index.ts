import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import router from "./routers/index.router";

const app:Application = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.listen(port, () => {
  console.log(`App Listening on port: ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
