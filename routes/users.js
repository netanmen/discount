const express = require('express');
const router = express.Router();
const usersService = require('../services/users');

router.get('/', function (req, res, next) {
  const users = usersService.getAll();
  
  res.send(users);
});

router.get('/:id', function (req, res, next) {
  const { id } = req.params;

  const user = usersService.getById(id);
  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;

  const userToRemove = usersService.getById(id);
  if (!userToRemove) {
    res.sendStatus(404);
  }
  
  await usersService.remove(userToRemove.customerID);

  res.sendStatus(204);
});

router.post('/', async (req, res, next) => {
  const { body: newUser } = req;

  await usersService.create(newUser);

  res.sendStatus(201);
});

router.put('/:userId/permissions/:permissionId', async (req, res, next) => {
  const { userId, permissionId } = req.params;
  const { permissionStatus } = req.body;

  await usersService.updateUserPermission(userId, permissionId, permissionStatus);

  res.sendStatus(204);
});

module.exports = router;
