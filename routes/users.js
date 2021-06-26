const express = require('express');
const router = express.Router();
const fs = require('fs').promises;  
const users = require('../data/users.json');

router.get('/', function (req, res, next) {
  res.send(users);
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  const user = users.find(user => user.customerID === id);

  res.send(user);
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;
  const user = users.find(user => user.customerID === id);

  res.send(user);
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = users.filter(user => user.customerID !== id);
  await fs.writeFile('../data/users.json', 'test');
  

  res.sendStatus(200);
});

module.exports = router;
