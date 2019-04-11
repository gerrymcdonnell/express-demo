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
const express = require('express');
const Joi = require('joi');

const app = express();

//uses middleware
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

//url path,call back function
app.get('/', (req, res) => {
    res.send('hello world');
});


/*app.get('/api/courses', (req, res) => {
    res.send([1, 2, 33]);
});*/


//post example vid 49-51
app.post('/api/courses', (req, res) => {

    //jio schema
    const schema = {
        name: Joi.strict().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    //validation
    /**if the name doest exist or the names length <3 chars then return a 400 status code
     * returning a 400 status code is REST convention i.e bad request
     */
    if (!req.body.name || req.body.name.length < 3) {
        //return bad request
        res.status(400).send('Name required and should be a minimum of 3 chars');
        return;
    }

    // create new course from data being posted
    // the id is made up oj just adding 1 to number of courses we have
    // the name propery/field should be in the request body.
    // note requires Json parse feature enaabled in expressJS
    // i.e see app.use(express.json()); above
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    //push new course to array
    courses.push(course);
    // by convention posting an new object should be returned din the body of the response
    res.send(course);
});


//parameter vid 47
app.get('/api/courses/:id', (req, res) => {

    //res.send(req.params.id);

    //note can also use let instead of const
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //not found 404 resource donest exist on server
    if (!course) res.status(404).send('The course wasnt found');
    res.send(course);
});


//PORT ENV variable
const port = process.env.PORT || 3000;
app.listen(port, () => { 
    console.log(`SERVER:Listening on port ${port}`);
    console.log(`API endpoint: http://localhost:${port}/api/courses`) 
})