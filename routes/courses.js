const express = require('express');
const router=express.Router();


//array of course objects
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

/**working with the router object instead of the app object */

//get all courses
router.get('/', (req, res) => {
    res.send(courses);
});


//vid 52 put request which is an edit
router.put('/:id', (req, res) => {
    //look up course if doest exists 404 
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //not found 404 resource donest exist on server
    if (!course) return res.status(404).send('The course wasnt found');

    //validate if invale return 400 bad request
    const result = validateCourse(req.body);

    //object destructuring
    //const{error}=validateCourse(req.body);

    //return bad request
    if (result.error)
        return res.status(400).send(result.error.details[0].message);


    //update course and return the updated course
    course.name = req.body.name;
    res.send(course);
})



function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    };
    return result = Joi.validate(course, schema);
}



//post example vid 49-51
router.post('/', (req, res) => {

    //validate if invale return 400 bad request
    const result = validateCourse(req.body);

    //object destructuring
    //const{error}=validateCourse(req.body);

    //return bad request
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

    // create new course from data being posted
    // the id is made up oj just adding 1 to number of courses we have
    // the name propery/field should be in the request body.
    // note requires Json parse feature enaabled in expressJS
    // i.e see router.use(express.json()); above
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
router.get('/:id', (req, res) => {

    //res.send(req.params.id);

    //note can also use let instead of const
    const course = courses.find(c => c.id === parseInt(req.params.id));
    //not found 404 resource donest exist on server
    if (!course) res.status(404).send('The course wasnt found');
    res.send(course);
});

//delte course id
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

//export router object
module.exports=router;