const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = './shoppinglist.json';

app.post('/items', (req, res) => {
  const newItem = req.body;

  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file' });
    }

    let items = [];
    if (data) {
      items = JSON.parse(data);
    }

    items.push(newItem);

    fs.writeFile(FILE_PATH, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing to file' });
      }
      res.status(201).json({ message: 'Item added successfully' });
    });
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
