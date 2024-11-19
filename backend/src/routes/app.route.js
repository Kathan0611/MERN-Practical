const express = require("express");
const AppController = require("../controllers/app.controller");
const {verifyToken}=require('../middleware/authmiddleware')
const validateSchema=require('../utils/validationSchema');
const validate=require('../middleware/validation');
const upload=require('./../utils/multer')

const Router = express.Router();


Router.post('/signup',validate(validateSchema.registerSchema),AppController.Register);
Router.post('/login',validate(validateSchema.loginSchema),AppController.Login);
Router.post("/home",verifyToken,AppController.Home);
Router.get('/userdetails',verifyToken,AppController.userDetails);
Router.get('/logout',verifyToken,AppController.logout);

module.exports = Router;