/**1)
 * commands to get started with a nodeJS expressproject (check vid 43)
 * npm init --yes 
 * npm i express
 */

/**2) to run this app:
 * node index.js
 */

//   3) nodemon
//   =======
//   install nodemon
//   npm i -g nodemon

//   runapp with nodemon
//   nodemon index.js


// coding with mosh nodeJS vid 44 on REST API and expressJS
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const config = require('config');
const Joi = require('joi');

//import courses module
const courses=require('./routes/courses');
const home=require('./routes/home');
const genres=require('./routes/genres');

const app = express();

//config module
/**set env variable by
 * export app_password=test1234
 */
console.log('App Name', config.get('name'));
console.log('Mail Password', config.get('mail.password', 'default'));

//environments
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log('app.get(env):', app.get('env'));

//pug template engine vid64
app.set('view engine', 'pug');
//app.set('views','./views'); //default value

//uses middleware to parse json objects
app.use(express.json());
//helmet middleware
app.use(helmet());

//any route using this url, use the courses module
app.use('/api/courses',courses);

app.use('/api/genres',genres);

//any path that starts with / use the home router
app.use('/',home);

//morgan middleware logs http requests. only use it development mode
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Middleware: morgan enabled: Logging Http requests');
}








//PORT ENV variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`SERVER:Listening on port ${port}`);
    console.log(`API endpoint: http://localhost:${port}/api/courses`)
})