const { Router } = require('express');
const loginController = require('../controllers/loginController');
require('express-async-errors');

const router = Router();

router.post('/', loginController.login);

module.exports = router;