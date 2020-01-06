'use-strict';
import { Scrapper } from '../../utils/scrapper';
import { getErrorAt } from '../../utils/error';
console.log('Loading request handler!')
let scrapper = new Scrapper();

const obtainSubjectCourses = async (req, res, next) => {
    try {
        console.log('[Obtain Subject Courses] shmu!');
        validateBody(req);
        validateSearchParam(req);
        let text = req.body.subjectCode.slice(0, 3);
        let numeric = req.body.subjectCode.slice(3);
        let r = await scrapper.ObtainCourses(text, numeric);
        res.json(r);
    } catch (error) {
        next(error);
    }
}

/**
 * VALIDATIONS
 */
const isEmpty = (map) => {
    for (const key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

const validateBody = (req) => {
    const { body } = req;
    if (isEmpty(body)) {
        let error = new Error(getErrorAt(1));
        error.status = 400;
        throw error;
    }
}

const validateSearchParam = (req) => {
    const { body } = req;
    console.log(body);
    if (body.hasOwnProperty('courseCode')) {
        if (body.courseCode.length < 7) {
            let error = new Error(getErrorAt(3));
            error.status = 400;
            throw error;
        }
    } else {
        let error = new Error(getErrorAt(2));
        error.status = 400;
        throw error;
    }
}


export { obtainSubjectCourses }