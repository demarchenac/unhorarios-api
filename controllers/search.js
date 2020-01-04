/**
 * MODULES.
 */
import express from 'express';

/**
 * Import request-handler
 */
import * as RequestHandler from '../request-handlers/search'

/**
 * INITIALIZE CONTROLLER.
 */
const SEARCH_CONTROLLER = express.Router();

SEARCH_CONTROLLER.route('/getSubjectCourses').post(RequestHandler.obtainSubjectCourses);

module.exports = SEARCH_CONTROLLER;

