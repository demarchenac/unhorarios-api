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
console.log('.env loaded!')
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

console.log('Importing router!');
/**
 * LOAD ROUTER
 */
const router = require('./routes/router');
app.use('/UNHORARIOS/API', router)

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});