const model = require("./backendModel.js");
const express = require('express');
const router = express.Router();

async function getCurrentUserToWatchList() {
    const userId = req.session.userId
    const list = await model.getToWatchList(userId)
    return list
}

async function getCurrentUserWatchedList() {
    const userId = req.session.userId
    const list = await model.getWatchedList(userId)
    return list
}

router.get('/test', async function (req, res){
   //var users = await model.addMovieToWatchList(1, 1, 'Hitta nemo', 'http://www.clker.com/cliparts/e/d/7/b/13426765571224390078nemo-md.png');
    var watchList = await model.getToWatchList(1);
    var watchListId = watchList[0].dataValues.id;
    var movies = await model.getAllMoviesFromToWatchList(watchList[0].dataValues.id);
    //var movie = await model.getLatestMovie(1);
    res.json({
        res: movies
    })
})


router.get('/getCurrentUser', async function (req, res){
    if(req.session.loggedIn) { //If user is logged in
        const userId = req.session.userId;
        const user = await model.getUser(userId);
        res.json({
            userId: user.id
        })
    }
    else {
        res.json({
            userId: ''
        })
    }
})


router.post('/getLatestAddedMovie', async function (req, res){
    const userId = req.body.id
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

    console.log('backend checkMovieInList')
    console.log('inWatched: ', inWatchedList)


    res.json({
        inWatchedList,
        inToWatchList
    })
})

router.get('/getLatestMoviesFromList/:userid', async function (req, res){
    const userId = req.params.userid
    const toWatchMovies = await model.getMoviesFromList(userId, 'watchlist_id')
    const watchedMovies = await model.getMoviesFromList(userId, 'watchedlist_id')
    res.json({
        toWatchMovies,
        watchedMovies
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
    console.log('doing add to watch')
    const { userId, movieId, movieTitle, moviePoster } = req.body
    const list = await model.getToWatchList(userId)
    const movie = await model.addMovieToWatchList(list.dataValues.id, movieId, movieTitle, moviePoster)
    res.json({
        data: movie
    })
})

router.post('/addWatched', async function (req, res) {
    console.log('doing add watched')
    const { userId, movieId, movieTitle, moviePoster } = req.body
    const list = await model.getWatchedList(userId)
    const movie = await model.addMovieToWatchedList(list.dataValues.id, movieId, movieTitle, moviePoster)
    res.json({
        data: movie
    })
})

router.post('/deleteFromToWatch', async function (req, res) {
  console.log('doing delete to watch')
    const { userId, movieId } = req.body
    const list = await model.getToWatchList(userId)
    const deletedMovie = await model.deleteMovieFromToWatchList(movieId, list.dataValues.id)
    res.json({
        data: deletedMovie
    })
})

router.post('/deleteFromWatched', async function (req, res) {
    console.log('doing delete watched')
    const { userId, movieId } = req.body
    const list = await model.getWatchedList(userId)
    const deletedMovie = await model.deleteMovieFromWatchedList(movieId, list.dataValues.id)
    res.json({
        data: deletedMovie
    })
})

router.post('/logOut', async function (req, res) {
    req.session.destroy();
    return res.json({data: "loggedOut"});
});

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
        req.session.loggedIn = true;
        req.session.userId = validUser.dataValues.id;
        res.json({
            userId : validUser.id // send the user id
        })
    }
    else res.json({
        userId : null
    })
})

router.post('/logOut', async function (req, res) {
    req.session.destroy();
    return res.json({data: "loggedOut"});
})

module.exports = router;
