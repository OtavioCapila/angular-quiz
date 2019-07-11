const express = require('express');
const router = express.Router();
const QuestionCtrl = require('./../controllers/questionController');
const UserCtrl = require('./../controllers/userController');
const AuthCtrl = require('./../controllers/authController');
const AdminCtrl = require('./../controllers/adminController');


/**
 * API Route for admin
 */
router.post('/admin/register',AdminCtrl.createUser);

/**
 * API Route for Login
 */
router.post('/login/:useraccess',AuthCtrl.loginUser);
router.post('/admin/login',AuthCtrl.adminLogin);

/**
 * API Routes for Questions
 */
router.get('/questions',QuestionCtrl.getAllQuestions);
router.post('/question',QuestionCtrl.createQuestion);
router.put('/question/:id',QuestionCtrl.updateQuestion);
router.delete('/question/:id',QuestionCtrl.deleteQuestion);
router.delete('/questions',QuestionCtrl.deleteAllQuestions);
/**
 * API Routes for Users
 */
router.get('/users',UserCtrl.getAllUsers)
router.get('/user/:id',UserCtrl.getUserById);
router.post('/user',UserCtrl.createUser);
router.put('/user/:id',UserCtrl.updateUser);
/* router.put('/users/newuser',UserCtrl.changeNewUserValue); */
router.put('/user/preferences/:id',UserCtrl.updateUserPreferences);
router.put('/user/score/:id',UserCtrl.updateUserScore);
router.put('/user/correctanwser/:id',UserCtrl.updateUserCorrectAnwserTotal);
router.put('/user/anwseredquestions/:id',UserCtrl.updateUserAnwseredQuestions);
router.delete('/user/:id',UserCtrl.deleteUser);

/**
 * Middleware to validate user access token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
            req.params.userId = decoded.data._id
            next();
        });
    }
}


module.exports = router;