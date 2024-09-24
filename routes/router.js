const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')
router.use(express.urlencoded({extended: false}));



router.get('/',(req, res)=>{
    res.render('home')
})

router.get('/signupPage',(req, res)=>{
     Controller.signupPage(req, res);
})

router.get('/loginPage',(req, res)=>{
    Controller.loginPage(req, res);
})


router.post('/signup',(req, res)=>{
    Controller.signup(req, res);
})

router.get('/login',(req, res)=>{
    Controller.login(req, res);
})

module.exports =router