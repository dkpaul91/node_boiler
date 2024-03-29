// import * as path from 'path';
import DemoModule from '../modules/DemoModule';

const calcTime = (offset: any) => {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));

    // return time as a string
    return nd.toLocaleString();
}

module.exports = function (app: any) {
    // const assetPath = path.join(__dirname, '../../assets');
    const demoModule = new DemoModule();

    app.globals = {};

    app.globals.calcTime = calcTime;
    app.globals.demoModule = demoModule;
   
}