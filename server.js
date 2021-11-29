const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/global'))

app.get('/*', (req,res) =>{
    res.sendFile('./src/index.js', {root: "./dist/global/"})
})

app.listen(process.env.PORT , ()=>{
    console.log('server started on port', process.env.PORT)
})