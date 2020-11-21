const express=require('express');

// create express app
const app = express();
const bodyParser=require('body-parser');
const colors=require('colors');
const cors=require('cors');
const  morgan=require('morgan');

// DATABASE METHODS();
const connectMONGODB  = require('./config/MONGO_DB');
const connectMYSQL = require('./config/MYSQL_DB');



// Middlewares
app.use(express.json());
app.use(express.static(__dirname + '/public'));





// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.use(cors());
app.use(morgan('dev'));




// Connect to database
connectMYSQL();
connectMONGODB();





 



// Use Routes
app.use('/api/auth',require('./routes/auth.routes'));
// app.use('/api/admin',require('./routes/admin.routes'));
// app.use('/api/',require('./routes/index.routes'));



// Setup server port
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running at port ${port}`.brightYellow.underline);
})
