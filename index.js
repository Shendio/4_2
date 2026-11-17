'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8')
);

// lista kategorii
app.get('/jokebook/categories', (req, res) => {
  res.json(data.categories);
});

// losowy żart z kategorii
app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;
  const jokes = data[category];

  if (!jokes || !Array.isArray(jokes) || jokes.length === 0) {
    return res.json({ error: `no jokes for category ${category}` });
  }

  const index = Math.floor(Math.random() * jokes.length);
  res.json(jokes[index]);
});

// wszystkie żarty z danej kategorii
app.get('/jokebook/jokes/:category', (req, res) => {
  const category = req.params.category;
  const jokes = data[category];

  if (!jokes || !Array.isArray(jokes)) {
    return res.json({ error: `no jokes for category ${category}` });
  }

  res.json(jokes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
