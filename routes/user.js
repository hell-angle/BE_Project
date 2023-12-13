const express = require("express");
const loginAuth = require("../controller/user/loginAuth");
const addUser = require("../controller/user/signUp");
const chatCompletion = require("../controller/user/chatCompletion");
const userData = require("../controller/user/userData");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
/**
 * @api {post} /login User Login
 * @apiVersion 1.0.0
 * @apiName UserLogin
 * @apiGroup User
 *
 * @apiDescription Authenticate and log in a user.
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiExample Example usage:
 * curl -i -X POST -d "email=&password=secretpassword" http://localhost:8000/user/login
 *
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     }
 *
 * @apiError Unauthorized Invalid credentials.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized",
 *       "message": "Invalid credentials"
 *     }
 */
router.post("/login", loginAuth);
/**
 * @api {get} /data Get User Data
 * @apiVersion 1.0.0
 * @apiName GetUserData
 * @apiGroup User
 * @apiPermission User
 *
 * @apiDescription Get user-specific data.
 *
 * @apiExample Example usage:
 * curl -i -H "Authorization: Bearer YOUR_TOKEN" http://localhost:8000/user/data
 *
 * @apiSuccess {String} username User's username.
 * @apiSuccess {String} email User's email.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "johndoe",
 *       "email": "john@example.com"
 *     }
 *
 * @apiError Unauthorized User not authorized.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Forbidden",
 *       "message": "User not authorized"
 *     }
 */
router.get("/data", userData); 
/**
 * @api {post} /signup User Signup
 * @apiVersion 1.0.0
 * @apiName UserSignup
 * @apiGroup User
 *
 * @apiDescription Register a new user.
 *
 * @apiParam {String} username User's desired username.
 * @apiParam {String} password User's desired password.
 * @apiParam {String} email User's email address.
 *
 * @apiExample Example usage:
 * curl -i -X POST -d "username=newuser&password=newpassword&email=newuser@example.com" http://localhost:8000/user/signup
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User registered successfully."
 *     }
 *
 * @apiError Conflict Username or email already exists.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "Conflict",
 *       "message": "Username or email already exists"
 *     }
 */
router.post("/signup", addUser);
/**
 * @api {post} /chatbox Chat Completion
 * @apiVersion 1.0.0
 * @apiName ChatCompletion
 * @apiGroup User
 * @apiPermission User
 *
 * @apiDescription Complete a chat interaction.
 *
 * @apiParam {String} message User's chat message.
 *
 * @apiExample Example usage:
 * curl -i -H "Authorization: Bearer YOUR_TOKEN" -X POST -d "message=Hello, Chatbot!" http://localhost:8000/user/chatbox
 *
 * @apiSuccess {String} response Chatbot's response.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "Hi there! How can I assist you today?"
 *     }
 *
 * @apiError Unauthorized User not authorized.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Forbidden",
 *       "message": "User not authorized"
 *     }
 */
router.post("/chatbox", chatCompletion);
module.exports = router;

