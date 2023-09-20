const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const clientRouter = require('./routes/client');
const salesRouter = require('./routes/sales');
const managementRouter = require('./routes/management');
const generalRouter = require('./routes/general');
const db_connect = require('./db/connect');

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/api/v1/client',clientRouter);
app.use('/api/v1/sales',salesRouter);
app.use('/api/v1/management',managementRouter);
app.use('/api/v1/general',generalRouter);

const port = process.env.port || 5000; 

const connect = async() =>{
    try
    {
        await db_connect(process.env.url);
        app.listen(port,console.log('Connected to database'));
    }
    catch(err){
        console.log(err);
    }
}

connect();