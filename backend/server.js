const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./app/routes/routes');
const dotenv = require('dotenv');
dotenv.config();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , OPTIONS , PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(
    `${process.env.MONGO_URI}`, {
        useNewUrlParser: true
    }).then(() => {        
        console.log('MONGO -> OK')
    }).catch((err) => {
        console.log('MONGO -> ERROR',err)
    })


app.use('/api', routes);

app.listen(port, () => {
    console.log('SERVER -> OK')
})