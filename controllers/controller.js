const Student  = require('../models/Student');
const Admin = require('../models/Admin');
const Book = require('../models/Book')


async function signup(req, res) {
    try{
        if(req.body.password==req.body.confirmPassword){
            const response = new Student(req.body);
            response.studentType=2;
            console.log(req.body);
            await response.save();
            console.log('data added sucessfully');
            res.render('home');
        }
        else{
            console.log('Password and confirmPassword mustt be same '); 
            
        }
        
    }catch(error){
        console.log(error,'error');
    }
}


async function login(req, res) {
    try{ 
         const email = req.query.email;
         const password = req.query.password;
         const student = await Student.findOne({ email: email,
            password: password });
         
            if (student) {
                console.log(student);
                res.render('userdashboard');
            }
            else{
                   console.log("user doesnt exist");
                   res.end('user doesnt exist invalid');
            }
        }catch(error){
            console.log(error,'error');
        }
}



async function admin(req, res){
    try{
        let adminPassword = req.query.adminPassword;
        let adminEmail = req.query.adminEmail;
        let adminSecretKey = req.query.secretKey;
        const admin = await Admin.findOne({email: adminEmail , password: adminPassword , secretKey: adminSecretKey});
        console.log(admin);
        if(admin){
            console.log('admin verifieed');
            res.render('admindashboard');
        }
        else{
            console.log('admin not verified');
            res.end('admin not verified');
        }
    }catch(error){
        console.log(error,'error');
    }
}



async function getuser(req, res){
    try{
        const users = await  Student.find({})
        if(users){
           res.render('userslist',{users:users})
        }
        else{
            console.log('no users');
        }
    }catch(error){
        console.log(error,'error');
    }
}

async function adminpage(req, res){
    try{
         res.render('admin');
    }catch(error){
        console.log(error,'error');
    }
}



async function getStudentForEdit(req, res) {
    try{
         const id = req.params.id;
         const user = await Student.findOne({_id:id});
         if(user){
            console.log(user);
            res.render('userforupdate',{user:user});
         }
         else{
            console.log('no user found');
         }
    }catch(error){
        console.log(error,'error');
    }
}


async function updateuser(req, res) {
    try{
        const id = req.params.id;
        let user = await Student.findOne({_id:id})
        if(user){
            user.firstName=req.body.firstName;
            user.lastName=req.body.lastName;
            user.country=req.body.country;
            user.email=req.body.email;
            user.mobileNo=req.body.mobileNo;
            user.password=req.body.password;
            user.confirmPassword=req.body.confirmPassword;
            await user.save();
            console.log('user updated');
            const users = await Student.find({});
            res.render('userslist',{users:users})
        }
    }catch(error){
        console.log(error,'error')
    }
}


async function deleteuser(req, res){
    try{
        const id = req.params.id;
        const user = await Student.deleteOne({_id:id});
        if(user){
            const users = await Student.find({});
            res.render('userslist',{users:users})
        }else{
            console.log('No more users')
        }
    }catch(error){
        console.log(error,'error')
    }
    
}

async function bookform(req, res){
    try{
        res.render('bookform');   
    }catch(error){
        console.log(error,'error')
    }
}

async function addnewbook(req, res){
    try{
        const newbook = new Book(req.body)
        await newbook.save();
        console.log('book added sucessfully');
        const book = await Book.find({})
        res.render('updatedbooklist',{book:book});
         
    }catch(error){
        console.log(error,'error')
    }
}


async function getallbooks(req, res){
    try{
         const book = await Book.find({});
         res.render('updatedbooklist',{book:book});
    }
    catch(error){
        console.log(error,'error')
    }
}

async function getadmindashboard(req, res){
    try{
         res.render('admindashboard');
    }catch(error){
        console.log(error,'error')
    }
    
}



async function getbookforEdit(req, res){
    try{
        let id = req.params.id;
        let book = await Book.find({_id:id});
        res.render('editbook',{book:book});
    }catch(error){
        console.log(error,'error')
    }    
}


module.exports = {
    signup,
    login,
    adminpage,
    admin,
    getuser,
    getStudentForEdit,
    updateuser,
    deleteuser,
    bookform,
    addnewbook,
    getallbooks,
    getadmindashboard
}