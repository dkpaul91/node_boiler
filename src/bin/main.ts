require('dotenv').config();
/**
 * include 'http' module
 */
import * as http from 'http';
/**
 * include 'debug' module
 */
import * as debug from 'debug';
/**
 * include 'app' from 'server' module
 */
import app from '../server';
/**
 * @static nodeport: Get port value from .env
 */
const nodePort: any = process.env.PORT || '5000';
/**
 * Normalize port
 */
const port: string | number | false = normalizePort(nodePort);
/**
 * Pass port to app server
 */
app.set('port', port);

/**
 * Pass the 'app' into the http server
 * @param {any} value from 'server'
 */
let server: http.Server = http.createServer(app);

/**
 * Normalize port value from .env
 * @param val {string}
 * @returns {string | number | false} normalized port
 */
function normalizePort(val: string): string | number | false {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Handle error during server creation
 * @param error {any}
 */

function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * On Listening
 */
function onListening() {
    let addr: any = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Server started on port', port);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);