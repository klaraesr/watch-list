const model = require("./backendModel.js");
const express = require('express');
const router = express.Router();

router.get('/getLatestAddedMovie/:userid', async function (req, res){
    const userId = req.params.userid
    const movieId = await model.getLatestMovie(userId)
    res.json({
        movieId
    })
})

router.get('/checkMovieInLists/:movieid/:userid', async function (req, res){
    const movieId = req.params.movieid
    const userId = req.params.userid

    const inWatchedList = await model.checkMovieInList(movieId, userId, 'watchedList')
    const inToWatchList = await model.checkMovieInList(movieId, userId, 'toWatchList')

    res.json({
        inWatchedList,
        inToWatchList
    })
})

router.get('/getMoviesFromToWatchList/:userid', async function (req, res){
    const userId = req.params.userid
    const toWatchList = await model.getToWatchList(userId)
    const movies = await model.getAllMoviesFromToWatchList(toWatchList[0].dataValues.id)

    res.json({
        movies
    })
})

router.get('/getMoviesFromWatchedList/:userid', async function (req, res){
    const userId = req.params.userid
    const watchedList = await model.getWatchedList(userId)
    const movies = await model.getAllMoviesFromWatchedList(watchedList[0].dataValues.id)

    res.json({
        movies
    })
})


router.get('/getLatestMoviesFromList/:userid', async function (req, res){
    const userId = req.params.userid
    const toWatchMovies = await model.getMoviesFromList(userId, 'watchlist_id', 0, 5)
    const watchedMovies = await model.getMoviesFromList(userId, 'watchedlist_id', 0, 5)

    res.json({
        toWatchMovies,
        watchedMovies
    })
})

router.get('/getMoviesFromList/:userid/:list/:offset/:limit', async function (req, res){
    const userId = req.params.userid
    const list = req.params.list
    const offset = req.params.offset
    const limit = req.params.limit

    const movies = await model.getMoviesFromList(userId, list, offset, limit)
    res.json({
        movies
    })
})

router.get('/getUser/:userid', async function (req, res){
    const userId = req.params.userid
    let user = await model.getUser(userId)
    let toWatchCount = await model.getListLength(userId, true)
    let watchedCount = await model.getListLength(userId, false)
    res.json({
        username: user.dataValues.username,
        userImg: user.dataValues.image,
        toWatchCount,
        watchedCount
    })
})

router.post('/addToWatch', async function (req, res) {
    const { userId, movieId, movieTitle, moviePoster } = req.body
    const list = await model.getToWatchList(userId)
    const movie = await model.addMovieToWatchList(list.dataValues.id, movieId, movieTitle, moviePoster)
    res.json({
        data: movie
    })
})

router.post('/addWatched', async function (req, res) {
    const { userId, movieId, movieTitle, moviePoster } = req.body
    const list = await model.getWatchedList(userId)
    const movie = await model.addMovieToWatchedList(list.dataValues.id, movieId, movieTitle, moviePoster)
    res.json({
        data: movie
    })
})

router.post('/deleteFromToWatch', async function (req, res) {
    const { userId, movieId } = req.body
    const list = await model.getToWatchList(userId)
    const deletedMovie = await model.deleteMovieFromToWatchList(movieId, list.dataValues.id)
    res.json({
        data: deletedMovie
    })
})

router.post('/deleteFromWatched', async function (req, res) {
    const { userId, movieId } = req.body
    const list = await model.getWatchedList(userId)
    const deletedMovie = await model.deleteMovieFromWatchedList(movieId, list.dataValues.id)
    res.json({
        data: deletedMovie
    })
})

router.post('/createuser', async function (req, res){
    const user = await model.createUser(req.body.username.toLowerCase(), req.body.password, req.body.link, req.body.deletehash)
    if(!user){
        res.json({success: false})
    } else {
        res.json({success: true})
    }
})

router.post('/validateuser', async function (req, res) {
    var users = await model.getAllUsers() //Gets all the users from the db
    var validUser = await model.validateUser(users, req.body.username.toLowerCase(), req.body.password) //Function that returns the user if its valid
    if(validUser !== null){
        res.json({
            userId : validUser.id // send the user id
        })
    }
    else res.json({
        userId : null
    })
})

module.exports = router;
