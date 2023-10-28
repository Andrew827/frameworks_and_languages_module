const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const itemDictionary = {};

function addItem(id, user_id, keywords, description, lat, lon, date_from) {
  const newItem = {
    "ID": id,
    "user_id": user_id,
    "keywords": keywords,
    "description": description,
    "lat": lat,
    "lon": lon,
    "date_from": date_from
  };

  itemDictionary[id] = newItem;
}

addItem(1, "user1234", ["hammer", "nails", "tools"], "A hammer and nails set", 1, 1, "2021-11-22T08:22:39.067408");

app.get('/items',(req, res) => 
{
  res.json(itemDictionary)
})


app.post('/itemDictionary', (req,res) =>
{
  items.push(req.body)
  res.status(201).json(req.body)
})

app.delete('/items/:ID', (req, res) => {
  console.log("Delete" + req.params.ID)
  res.status(204).json()
} )




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})