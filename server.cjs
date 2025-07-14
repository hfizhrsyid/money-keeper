require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const History = require('./history.cjs');

const app = express();

// Middleware
app.use(express.json());
morgan.token('data', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

// Example money variable (fix: declare it!)
let money = 0;

// Money routes
app.get('/money', (req, res) => {
  res.json({ money });
});

app.post('/money', (req, res) => {
  money = req.body.money;
  res.json({ money });
});

// History routes
app.get('/history', (req, res) => {
  History.find({})
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }));
});

app.get('/history/:id', (req, res) => {
  const id = req.params.id;
  History.findById(id)
    .then(result => result ? res.json(result) : res.status(404).end())
    .catch(error => res.status(500).json({ error: error.message }));
});

app.post('/history', (req, res) => {
  const newTransaction = new History({
    name: req.body.name,
    money: req.body.money,
    date: new Date().toUTCString(),
  });

  newTransaction
    .save()
    .then(saved => res.json(saved))
    .catch(error => res.status(400).json({ error: error.message }));
});

app.delete('/history/:id', (req, res) => {
  const id = req.params.id;
  History.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch(error => res.status(500).json({ error: error.message }));
});

// Serve static build
app.use(express.static(path.join(__dirname, 'build/client')));

// React Router SSR fallback
app.all('*', async (req, res, next) => {
  try {
    const node = await import('@react-router/node');
    console.log('Node module:', node);

    const { createRequestListener } = node;

    const build = await import('./build/server/index.js');

    const handler = createRequestListener({
        build,
        getLoadContext(req, res) {
            return { req, res };
        },
    });
    return handler(req, res, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
