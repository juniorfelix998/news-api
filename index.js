const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const paginate = require('express-paginate');
const passport = require('passport');
const { connect } = require('mongoose');

require('dotenv').config();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(passport.initialize());

app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT));

const runApp = async () => {
    try {
        await connect(process.env.MONGO_DB_URL, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log(`Successfully connected to database ${process.env.MONGO_DB_URL}`);
        app.listen(process.env.PORT, () => {
            console.log(`Server started successfully on PORT ${process.env.PORT}`);
        })
    } catch(err) {
        console.log(err);
    }
};

runApp();