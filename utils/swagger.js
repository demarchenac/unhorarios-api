const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "UN Horarios",
            version: "1.0.0",
            description:
                "API built for searching and grouping subject courses to see their schedule",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            },
            // contact: {
            //     name: "Swagger",
            //     url: "https://swagger.io",
            //     email: "Info@SmartBear.com"
            // }
        },
        servers: [
            /*{
                url: "http://localhost:4936/UNHORARIOS/API"
            },*/ {
                url: "https://unhorarios-api.herokuapp.com/UNHORARIOS/API"
            },
        ]
    },
    apis: ['./models/course.js', './models/lesson.js', './routes/controllers/search.js']
};
export { options };