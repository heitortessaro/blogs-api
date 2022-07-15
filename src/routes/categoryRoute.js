const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

require('express-async-errors');

const router = Router();

router.get('/', authController.validateToken, categoryController.getAllCategories);

module.exports = router;