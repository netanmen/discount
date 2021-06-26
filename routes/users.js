const express = require('express');
const router = express.Router();
const fs = require('fs').promises;  
const users = require('../data/users.json');

const usersPath = './data/users.json';

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
  
  const updatedUsers = users.filter(user => user.customerID !== id);
  await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 4));
  
  res.sendStatus(200);
});

router.post('/', async (req, res, next) => {
  const { body: newUser } = req;
  
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 4));
  
  res.sendStatus(201);
});

module.exports = router;
