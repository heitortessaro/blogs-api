const { Router } = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

require('express-async-errors');

const router = Router();

router.post('/', authController.validateToken, postController.addPost);
router.get('/', authController.validateToken, postController.getAllPosts);

module.exports = router;