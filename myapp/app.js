const express = require('express');
const app = express();
const port = 8000;

app.use(express.json()); 

const itemDictionary = {};
let nextID = 1; 

function addItem(user_id, keywords, description, lat, lon, date_from) {
  const id = nextID++; 
  const newItem = {
    "ID": id,
    "user_id": user_id,
    "keywords": keywords,
    "description": description,
    "lat": lat,
    "lon": lon,
    "date_from": date_from
  };

  if (!itemDictionary[id]) {
    itemDictionary[id] = [];
  }
  itemDictionary[id].push(newItem);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/itemDictionary', (req, res) => {
  const items = Object.values(itemDictionary).flat();
  res.json(items);
});

app.post('/addItem', (req, res) => {
  const { user_id, keywords, description, lat, lon, date_from } = req.body;
  addItem(user_id, keywords, description, lat, lon, date_from);
  res.status(201).json(req.body);
});


app.delete('/itemDictionary/:ID', (req, res) => {
  const id = req.params.ID;
  delete itemDictionary[id];
  res.status(204).json();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
