require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const History = require('./history.cjs');
const People = require('./person.cjs');

// const cors = require('cors')
const app = express();
// app.use(cors())

// Middleware
app.use(express.json());
morgan.token('data', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//People routes
app.get('/people', (req, res) => {
  People.find({})
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))
})

app.get('/people/:id', (req, res) => {
  People.findById(req.params.id)
    .then(result => result ? res.json(result) : res.status(404).end())
    .catch(error => res.status(500).json({ error: error.message }))
})

app.patch('/people/:id', (req, res) => {
  People.findById(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).end()
      }

      if (req.body.transactionMade !== undefined) {
        result.transactionMade = req.body.transactionMade
      }

      return result.save().then(updatedPerson => res.json(updatedPerson))
    })
    .catch(error => res.status(500).json({ error: error.message }))
})

app.post('/people', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      error: 'name is missing'
    })
  }

  const person = new People({
    name: req.body.name,
    transactionMade: 0,
    balance: 0
  })

  person
    .save()
    .then(saved => res.json(saved))
    .catch(error => res.status(500).json({ error: error.message }))
})

// History routes
app.get('/history', (req, res) => {
  History.find({})
    .sort({ date: -1})
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))
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
    const express = await import('@react-router/express');

    const { createRequestHandler } = express;

    const build = await import('./build/server/index.js');

    const handler = createRequestHandler({
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
  console.log(`Server is running on port ${PORT}`);
});
