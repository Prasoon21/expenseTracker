const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const path = require('path');

const rootDir = require('./util/path');
const sequelize = require('./util/database');
const dB = require('./models/expSequelize');
const expenseRoutes = require('./routes/expenseRouter');

app.use(bodyParser.json());

app.use(cors());

app.use('/expense', expenseRoutes);

//const server = http.createServer(app);

sequelize.sync()
    .then((res) => {
        var port = 2000;
        app.listen(port, ()=>{
            console.log(`port ${port} started successfully`);
            app.get('/welcome', (req, res) => {
                res.sendFile(path.join(__dirname, "views", 'index.html'));
            })
        });
    })
    .catch((err) => console.log(err))