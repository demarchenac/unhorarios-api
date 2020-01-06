'use-strict'
import Lesson from './lesson';

/**
 * Course of a given subject.
 */
export class Course {
  /**
   * 
   * @param {String} name 
   * @param {Number} nrc 
   * @param {Number} taken 
   * @param {Number} size 
   * @param {Array<Lesson>} schedule 
   * @param {Array<String>} proffesors 
   */
  constructor(name, nrc, taken, size, schedule, proffesors) {
    this.name = name;
    this.nrc = nrc;
    this.taken = taken;
    this.size = size;
    this.schedule = schedule;
    this.proffesors = proffesors;
  }
}
/**
 * @swagger
 *  components:
 *    schemas:
 *      Course:
 *        type: object
 *        required:
 *          - name
 *          - nrc
 *          - taken
 *          - size
 *          - schedule
 *          - proffesors
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the course subject.
 *          nrc:
 *            type: number
 *            description: The course identification number.
 *          taken:
 *            type: number
 *            description: Specifies how many students are registered at this course.
 *          size:
 *            type: number
 *            description: Specifies the maximun number of possible students at this course.
 *          schedule:
 *            type: array
 *            items:
 *              oneOf:
 *                - $ref: '#/components/schemas/Lesson'
 *            description: An array of lessons covered by this course.
 *          proffesors:
 *            type: array
 *            items:
 *              type: string
 *            description: The list of proffesors of this course.
 *        example:
 *          name: ETICA
 *          nrc: 12263
 *          taken: 1
 *          size: 39
 *          schedule: [{ day: lunes, start: 1630, end: 1830}, { day: miercoles, start: 1330, end: 1430}]
 *          proffesors: [Andrade Alvarez - Jose, ASISTENTE GRADUADO - INGS]
 */