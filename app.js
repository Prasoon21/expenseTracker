const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const cors = require('cors');
const rootDir = require('./util/path');

const expenseRoutes = require('./routes/expenseRouter');

const sequelize = require('./util/database');

const dB = require('./models/expSequelize');

//app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/expense', expenseRoutes);

//const server = http.createServer(app);

sequelize.sync()
    .then(() => {
        var port = 2000;
        app.listen(port, ()=>{
            console.log(`port ${port} started successfully`);
            app.get('/welcome', (req, res) => {
                res.sendFile(path.join(__dirname, "views", 'index.html'));
            })
        });
    })
    .catch((err) => console.log(err))