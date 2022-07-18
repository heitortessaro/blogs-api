const { Router } = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

require('express-async-errors');

const router = Router();

router.post('/', authController.validateToken, postController.addPost);
router.get('/', authController.validateToken, postController.getAllPosts);
router.get('/:id', authController.validateToken, postController.getPostById);
router.put('/:id', authController.validateToken, postController.updatePost);

module.exports = router;