const {initExpress} = require("common");


function home(req, res) {
    const data = "welcome to service b";

    res.json({data});
}

const serviceDefinition = {
    routes: [
        (app) => { app.get('/', home)}
    ],
}

const server = initExpress(serviceDefinition);
