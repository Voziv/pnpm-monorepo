const {initExpress} = require("common");
const {serviceACommon} = require("service-a-only");


function home(req, res) {
    const data = serviceACommon();

    res.json({data});
}

const serviceDefinition = {
    routes: [
        (app) => { app.get('/', home)}
    ],
}

const server = initExpress(serviceDefinition);
