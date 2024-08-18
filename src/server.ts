import express from "express";
const app = express();
const port = 8080;

app.use(express.json());

app.post("/client", (req, res) => {
  res.status(201).send(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export { app };
