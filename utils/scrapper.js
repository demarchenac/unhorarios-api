'use-strict';

import puppeteer from 'puppeteer';

class Scrapper {
    constructor() {
        this.url = process.env.SCRAPPER_URL;
    }

    async ObtainCourses(TEXT, NUMERIC) {
        console.log('Start scrapping method!');
        let response = {
            courses: []
        };

        try {
            const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
            const page = await browser.newPage();
            page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36');
            await page.goto(this.url);
            let secondOption = await page.$eval('#periodo > option:nth-child(2)', option => option.value);
            await page.select('#periodo', secondOption);
            await page.focus('form[name="frmcurso"] > input[type=text].required');
            await page.keyboard.type(TEXT);
            await page.focus('form[name="frmcurso"] > input[type=text].required.number');
            await page.keyboard.type(NUMERIC);
            await page.click('form[name="frmcurso"] > #buscar_curso');
            let coursesLength = (await page.$$('div.div')).length;
            let courses = [];
            for (let currentCourse = 0; currentCourse < coursesLength; currentCourse++) {
                let courseName = await page.$eval(`div.div${currentCourse} > p.msg1`, p => p.innerText);
                let courseNRC = await page.$eval(`div.div${currentCourse} > p:nth-child(3)`, p => p.innerText.split(' ')[5]);
                let taken = await page.$eval(`div.div${currentCourse} > p:nth-child(6)`, p => p.innerText.split(' ')[1]);
                let size = await page.$eval(`div.div${currentCourse} > p:nth-child(6)`, p => p.innerText.split(' ')[4]);
                courseNRC = parseInt(courseNRC);
                taken = parseInt(taken);
                size = parseInt(size);
                let schedule = [];
                let proffesors = [];
                let lessonsLength = (await page.$$(`div.div${currentCourse} tbody > tr`)).length;
                for (let currentLesson = 2; currentLesson <= lessonsLength; currentLesson++) {
                    let day = await page.$eval(`div.div0 tbody > tr:nth-child(${currentLesson}) > td:nth-child(3)`, td => td.innerText);
                    if (day === 'M') day = 'lunes';
                    if (day === 'T') day = 'martes';
                    if (day === 'W') day = 'miercoles';
                    if (day === 'R') day = 'jueves';
                    if (day === 'F') day = 'viernes';
                    if (day === 'S') day = 'sabado';
                    let duration = await page.$eval(`div.div0 tbody > tr:nth-child(${currentLesson}) > td:nth-child(4)`, td => td.innerText);
                    let start = parseInt(duration.split(' - ')[0].trim());
                    let end = parseInt(duration.split(' - ')[1].trim());
                    let delta = 30 - parseInt(duration.split(' - ')[1].trim().slice(2));
                    end += delta;
                    schedule.push({ day: day, start: start, end: end });
                    let proffesor = await page.$eval(`div.div0 tbody > tr:nth-child(${currentLesson}) > td:nth-child(6)`, td => td.innerText);
                    proffesors.push(proffesor);
                }
                courses.push({
                    name: courseName,
                    nrc: courseNRC,
                    taken: taken,
                    size: size,
                    days: days,
                    starts: starts,
                    ends: ends,
                    proffesors: proffesors
                });
            }
            response.courses = courses;
            await browser.close();
            return Promise.resolve(response);
        } catch (err) {
            console.error(err);
            Promise.reject(err);
        }
    }
}

export { Scrapper };