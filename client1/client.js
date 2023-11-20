const express = require('express');
const app = express();
const port = 8001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile('client.html', {root: __dirname})
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });