import { Express } from "express";
import { setupApp } from "./app";

const port = 8080;
const start = (app: Express) => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
};

setupApp()
  .then(start)
  .catch(console.error);
