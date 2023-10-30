const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const items = {};
let nextID = 1;

function addItem(user_id, keywords, description, lat, lon, date_from) {
  const id = nextID++;
  const newItem = {
    ID: id,
    user_id,
    keywords,
    description,
    lat,
    lon,
    date_from,
  };

  if (!items[id]) {
    items[id] = [];
  }

  items[id].push(newItem);
}

function removeItem(id) {
  if (items[id]) {
    delete items[id];
    Object.keys(items).forEach((key, index) => {
      items[key].forEach((item) => {
        item.ID = index + 1;
      });
    });

    return true;
  }

  return false;
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/items', (req, res) => {
  const allItems = Object.values(items).flat();
  res.json(allItems);
});

app.post('/addItem', (req, res) => {
  const { user_id, keywords, description, lat, lon, date_from } = req.body;
  addItem(user_id, keywords, description, lat, lon, date_from);
  res.status(201).json(req.body);
});

app.delete('/items/:ID', (req, res) => {
  const id = parseInt(req.params.ID);
  const deleted = removeItem(id);
  if (deleted) {
    res.status(204).json();
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
