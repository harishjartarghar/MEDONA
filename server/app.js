const express=require('express');
const app=express();
const colors=require('colors');
const cors=require('cors');
const  morgan=require('morgan');
const connectDB = require('./config/database');



//Middlewares
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Config dotev
require('dotenv').config({
    path: './config/config.env'
});


// Connect to database
//connectDB();





// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors())
    app.use(morgan('dev'))
}

app.get("/",(req,res)=>{
	return res.json({"message":"Hello Wordl!"});
})

// Use Routes
// app.use('/api/auth',require('./routes/auth.routes'));
// app.use('/api/admin',require('./routes/admin.routes'));
// app.use('/api/',require('./routes/index.routes'));




//starting the server at specified port
const port=3000;
app.listen(port,()=>{
    console.log(`Server running at port ${port}`.brightYellow.underline);
})
