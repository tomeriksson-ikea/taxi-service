import express from "express";
const app = express();
const port = 8080;

app.use(express.json());

app.post("/ride-request", (req, res) => {
  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export { app };
