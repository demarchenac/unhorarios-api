/**
 * MODULES
 */
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import addRequestId from 'express-request-id';
/**
 * LOAD ENVIROMENT VARIABLES
 */
dotenv.config({ path: `.env.${process.env.NODE_ENV.trim()}` });
/**
 * LOAD CONTROLLERS
 */
// const SEARCH_CONTROLLER = require('./controllers/search');
/**
 * INITIALIZE APP
 */
const app = express();
const PORT = process.env.PORT || 3000;
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(addRequestId());

/**
 * MORGAN CONFIG
 */
morgan.token('id', function getId(req) {
    return req.id
});

var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode < 400
    },
    stream: process.stderr
}));

app.use(morgan(loggerFormat, {
    skip: function (req, res) {
        return res.statusCode >= 400
    },
    stream: process.stdout
}));

/**
 * ENABLE CORS
 */
app.use(cors());
/**
 * USE CONTROLLERS
 */
// app.use('/DETYRE/API/utils', SEARCH_CONTROLLER);

/**
 *  404 FALLBACK
 */
import { getErrorAt } from './helpers/error';
app.use((req, res, next) => {
    const error = new Error(getErrorAt(0));
    error.status = 400;
    next(error);
})

/**
 * ERROR HANDLING
 */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ errorMsg: error.message });
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});