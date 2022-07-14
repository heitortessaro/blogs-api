const { Router } = require('express');
const userController = require('../controllers/userController');
require('express-async-errors');

const router = Router();

router.post('/', userController.addUser);

module.exports = router;