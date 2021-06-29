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
  if (!user) {
    res.statusCode(404);
  }

  res.send(user);
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  const userToRemove = users.find(user => user.customerID === id);
  if (!userToRemove) {
    res.statusCode(404);
  }
  
  const updatedUsers = users.filter(user => user.customerID !== userToRemove.customerID);
  await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 4));

  res.sendStatus(204);
});

router.post('/', async (req, res, next) => {
  const { body: newUser } = req;

  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 4));

  res.sendStatus(201);
});

router.put('/:userId/permissions/:permissionId', async (req, res, next) => {
  const { userId, permissionId } = req.params;
  const { permissionStatus } = req.body;

  const updatedUsers = users.map(user => ({
    ...user,
    ...(user.customerID === userId) && {
      accountPermissions: user.accountPermissions.map(permission => {
        return {
          ...permission,
          ...(permission.id === permissionId) && { permissionStatus }
        }
      })
    }
  }));

  await fs.writeFile(usersPath, JSON.stringify(updatedUsers, null, 4));

  res.sendStatus(204);
});

module.exports = router;
