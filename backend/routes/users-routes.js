const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post('/signup', [
    check('email').normalizeEmail().isEmail(),
    check('name').not().isEmpty(),
    check('password').isLength({ min: 6})
    ], 
    usersControllers.signUp);

router.post('/signin', usersControllers.signIn);

module.exports = router;