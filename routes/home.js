const express = require('express');
const router=express.Router();

//url path,call back function
router.get('/', (req, res) => {
    res.render('index', { title: 'My express app', message: 'hello' });
});

module.exports=router;