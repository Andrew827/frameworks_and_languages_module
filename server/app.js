const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const items = {};
let nextID = 1;

app.get('/', (req, res) =>{
  res.sendFile('client.html', {root: __dirname})
})

function item(user_id, keywords, description, lat, lon) {
  const id = nextID++;
  const date_from = new Date().toISOString(); 
  const newItem = {
    id,
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
  return newItem;
}

function removeItem(id) {
  if (items[id]) {
    delete items[id];
    Object.keys(items).forEach((key, index) => {
      items[key].forEach((item) => {
        item.id = index + 1;
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
  res.status(200).json(allItems);
});

app.post('/item', (req, res) => {
  const { user_id, keywords, description, lat, lon } = req.body;

  if (!user_id || !keywords || !description || !lat || !lon) {
    res.status(405).json({ error: 'Missing required fields' });
  } else {
    
    const newItem = item(user_id, keywords, description, lat, lon);
    res.status(201).json(newItem);
  }
});

app.get('/items/user/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const filteredItems = filterItemsByUser(user_id);
  res.status(200).json(filteredItems);
});

app.get('/items/keywords/:keywords', (req, res) => {
  const keywords = req.params.keywords.split(',');
  const filteredItems = filterItemsByKeywords(keywords);
  res.status(200).json(filteredItems);
});

app.get('/items/location', (req, res) => {
  const { lat, lon, radius } = req.query;
  const filteredItems = filterItemsByLocation(lat, lon, radius);
  res.status(200).json(filteredItems);
});

app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = getItemById(id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.delete('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = removeItem(id);

  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

function filterItemsByUser(user_id) {
  return Object.values(items)
    .flat()
    .filter((item) => item.user_id === user_id);
}

function filterItemsByKeywords(keywords) {
  return Object.values(items)
    .flat()
    .filter((item) => keywords.some((kw) => item.keywords.includes(kw)));
}

function filterItemsByLocation(lat, lon, radius) {
  return Object.values(items)
    .flat()
    .filter((item) => calculateDistance(lat, lon, item.lat, item.lon) <= radius);
}

function getItemById(id) {
  return Object.values(items)
    .flat()
    .find((item) => item.id === id);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
