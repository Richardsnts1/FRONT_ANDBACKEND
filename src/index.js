const express = require("express");
const { uuid, isUuid } = require("uuidv4");
const app = express();
app.use(express.json());

const scraps = [];

// /scraps
// /scraps/:id

app.get("/scraps", (request, response) => {
  const { title } = request.query;
  const results = title
    ? scraps.filter((Scrapbook) => Scrapbook.title.includes(title))
    : scraps;
  return response.json(results);
});

app.post("/scraps", (request, response) => {
  const { title, message } = request.body;

  const scrap = { id: uuid(), title, message };

  scraps.push(scrap);

  return response.json(scrap);
});

app.put("/scraps/:id", (request, response) => {
  const { id } = request.params;
  const { title, message } = request.body;
  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return response.status(400).json({ error: "Scrap not Found" });
  }
  const scrap = { id, title, message };

  scraps[scrapIndex] = scrap;
  return response.json(scrap);
});

app.delete("/scraps/:id", (request, response) => {
  const { id } = request.params;
  const { title, message } = request.body;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    console.log(scrapIndex);
    return response.status(400).json({ error: "Scrap not found" });
  }

  const scrap = { id, title, message };

  scraps.splice(scrapIndex, 1);
  return response.status(204).send();
});

const port = 3333;
app.listen(port, () => {
  console.log(`Server running on port ${port}🚀️`);
});

//teste xD
