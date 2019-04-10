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

//url path,call back function
app.get('/', (req, res) => {
    res.send('hello world xxxx');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 33]);
});


//PORT ENV variable
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`SERVER:Listening on port ${port}`) })