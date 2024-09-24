const Student  = require('../models/Student');


async function signup(req, res) {
    try{
        const response = new Student(req.body);
        console.log(req.body);
        await response.save();
        console.log('data added sucessfully');
        res.render('home');
    }catch(error){
        console.log(error,'error');
    }
}


async function login(req, res) {
    try{
         let userDetails = await Student.find({email:req.email,password:req.password});
         if(userDetails){
            console.log(userDetails);
         res.render('userdata');
         }
         else{
            console.log('invalid information');
         }
    }catch(error){
        console.log(error,'error');
    }
}


function signupPage(req, res){
    try{
         console.log('Signup Page rendered');
         res.render('signup');
    }catch(error){
        console.log(error,'error');
    }
}


function loginPage(req, res){
    try{
        res.render('login');
    }catch(error){
        console.log(error,'error');
    }
}

module.exports = {
    signup,
    login,
    signupPage,
    loginPage
}