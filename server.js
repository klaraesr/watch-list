const express = require('express')
const http = require('http');
const seq = require('./sequelize.js')
const {sequelize} = seq()

const expressSession = require('express-session')
const sharedSession = require('express-socket.io-session')
const app = express()

const httpServer = http.Server(app); // Express usually does this for us, but socket.io needs the httpServer directly
const io = require('socket.io').listen(httpServer); // Creates socket.io app

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


// Setup session
const session = expressSession({
    secret: `
        `,
    resave: true,
    saveUninitialized: true,
});
app.use(session);
io.use(sharedSession(session));

// Bind REST controller to /api/*
const router = require('./rest.controller.js')
app.use('/api', router);

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')))

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    //
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'client/build/index.html'))
    })
}

//build mode
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'))
})

sequelize.sync().then(function() {
    app.listen(port, (req, res) => {
        console.log(`server listening on port: ${port}`)
    })
})