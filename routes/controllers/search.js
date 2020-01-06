/**
 * MODULES.
 */
import express from 'express';

console.log('Importing request handler!');
/**
 * Import request-handler
 */
import * as RequestHandler from '../request-handlers/search'

/**
 * INITIALIZE CONTROLLER.
 */
const SEARCH_CONTROLLER = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Search
 *    description: Search engine
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      SubjectRequest:
 *        type: object
 *        required:
 *          - subjectCode
 *        properties:
 *          subjectCode:
 *            type: string
 *            description: The code of the course (in CAPS).
 *        example:
 *          subjectCode: ETI8070
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      SubjectCourses:
 *        type: object
 *        required:
 *          - courses
 *        properties:
 *          courses:
 *            type: array
 *            items:
 *              oneOf:
 *                - $ref: '#/components/schemas/Course'
 *            description: List of courses for this subject.
 *        example:
 *           courses: [{"name":"ETICA","nrc":12663,"taken":1,"size":39,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12664,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12665,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12666,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12667,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12668,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12669,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]},{"name":"ETICA","nrc":12670,"taken":0,"size":40,"schedule":[{"day":"lunes","start":1630,"end":1830},{"day":"miercoles","start":1330,"end":1430}],"proffesors":["Andrade Alvarez - Jose","ASISTENTE GRADUADO - INGS"]}]
 */

/**
 * @swagger
 * path:
 *  /search/getSubjectCourses:
 *    post:
 *      summary: Obtain the courses of a given subject.
 *      tags: [Search]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubjectRequest'
 *      responses:
 *        "200":
 *          description: List of courses for a given subject
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SubjectCourses'
 */
SEARCH_CONTROLLER.route('/getSubjectCourses').post(RequestHandler.obtainSubjectCourses);

export { SEARCH_CONTROLLER };

