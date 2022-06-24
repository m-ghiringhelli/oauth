const { Router } = require('express');
const jwt = require('jsonwebtoken');

console.log(jwt);
module.exports = Router()
  .get('/', async (req, res) => {
    console.log('posts route', req.body, res.body);
  });
