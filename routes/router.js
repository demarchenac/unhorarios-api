/**
 * LOAD DEPENDENCIES
 */
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

console.log('Importing controller!');
/**
 * LOAD CONTROLLERS
 */
import { SEARCH_CONTROLLER } from './controllers/search'

/**
 * INITIALIZE ROUTER
 */
const router = express.Router();

/**
 * USE CONTROLLERS
 */
router.use('/search', SEARCH_CONTROLLER);

/**
 * STATUS ENDPOINT
 */
router.get('/status', (req, res) => { res.send('online'); });

/**
 * SWAGGER DOCUMENTATION
 */
import { options } from '../utils/swagger';
const specs = swaggerJsdoc(options);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs, { explorer: true }));

/**
 *  404 FALLBACK
 */
import { getErrorAt } from '../utils/error';
router.use((req, res, next) => {
    const error = new Error(getErrorAt(0));
    error.status = 404;
    next(error);
})

/**
 * ERROR HANDLING
 */
router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ errorMsg: error.message });
})

module.exports = router;