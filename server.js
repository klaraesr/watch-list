const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000


app.use(express.json() /*
        This is a middleware, provided by express, that parses the body of the request into a javascript object.
        It's basically just replacing the body property like this:
        req.body = JSON.parse(req.body)
    */);
app.use(express.urlencoded({
    extended: true
}));

// Bind REST controller to /api/*
const router = require('./rest.controller.js')
app.use('/api', router);

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')))

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    //
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client/build/index.html'));
    })
}

//build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
});