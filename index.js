const express = require('express');
const path = require('path');
const app = express();
const connection = require('./connection')
const router = require('./routes/router')
connection();
app.use(router);
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.listen(3000,(error)=>{
    if(error){
        console.log(error,'error occurd');
    }
    else{
        console.log('server is running on port 3000');
    }
})