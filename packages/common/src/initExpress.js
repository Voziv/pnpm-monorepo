const express = require('express');

const FORCE_EXIT_AFTER_MS= 10000;
const KILL_CONNECTION_AFTER_MS= 5000;
const LISTEN_ON_PORT = process.env.APP_PORT ?? 3000;


function initExpress({ routes }) {
    const app = express();


    routes.forEach(route => {
        route(app);
    });

    const server = app.listen(LISTEN_ON_PORT, () => {
        console.log(`Node.js function listening on port: ${LISTEN_ON_PORT}`);
    });

    process.on('SIGTERM', () => {
        console.log('Received SIGTERM signal, shutting down gracefully');
        shutDown();
    });

    process.on('SIGINT', () => {
        console.log('Received SIGINT signal, shutting down gracefully');
        shutDown();
    });

    let connections = [];

    server.on('connection', connection => {
        connections.push(connection);
        connection.on('close', () => connections = connections.filter(curr => curr !== connection));
    });

    return server;

    function shutDown() {
        server.close(() => {
            console.log('Shutdown complete.');
            process.exit(0);
        });

        setTimeout(() => {
            console.error(`Could not close connections within ${FORCE_EXIT_AFTER_MS}ms. Forcefully shutting down.`);
            process.exit(1);
        }, FORCE_EXIT_AFTER_MS);

        connections.forEach(curr => curr.end());
        setTimeout(() => connections.forEach(curr => {
            console.warn(`Forcibly killing a connection after ${KILL_CONNECTION_AFTER_MS}ms`);
            curr.destroy();
        }), KILL_CONNECTION_AFTER_MS);

    }
}

module.exports = initExpress;