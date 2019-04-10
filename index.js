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
const app = express();

//uses middleware
app.use(express.json());

const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
];

//url path,call back function
app.get('/', (req, res) => {
    res.send('hello world xxxx');
});


/*app.get('/api/courses', (req, res) => {
    res.send([1, 2, 33]);
});*/


//post example vid 49
app.post('/api/courses',(req,res)=>{
    const course={
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
});


//parameter vid 47
app.get('/api/courses/:id', (req, res) => {
    
    //res.send(req.params.id);
    
    //note can also use let instead of const
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    //not found 404 resource donest exist on server
    if(!course) res.status(404).send('The course wasnt found');
    res.send(course);
});


//PORT ENV variable
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`SERVER:Listening on port ${port}`) })