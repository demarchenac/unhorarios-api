'use-strict'
/**
 * A space in time where the lesson occurs.
 */
export class Lesson {
    /**
     * 
     * @param {String} day The weekday of the lesson.
     * @param {Number} start The start time of the lesson in a 0-24 hour clock.
     * @param {Number} end  The end time of the lesson in a 0-24 hour clock.
     */
    constructor(day, start, end) {
        this.day = day;
        this.start = start;
        this.end = end;
    }
}
/**
 * @swagger
 *  components:
 *    schemas:
 *      Lesson:
 *        type: object
 *        required:
 *          - day
 *          - start
 *          - end
 *        properties:
 *          day:
 *            type: string
 *            description: Weekday of the lesson.
 *          start:
 *            type: number
 *            description: The hour (in a 0-24 hour clock) in which begins this lesson.
 *          end:
 *            type: number
 *            description: The hour (in a 0-24 hour clock) in which ends this lesson.
 *        example:
 *           day: lunes
 *           start: 930
 *           end: 1130
 */