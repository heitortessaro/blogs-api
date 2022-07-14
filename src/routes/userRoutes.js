const { Router } = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

require('express-async-errors');

const router = Router();

router.post('/', userController.addUser);
router.get('/', authController.validateToken, userController.getAllUsers);

module.exports = router;