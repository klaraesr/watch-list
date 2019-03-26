const express = require('express');
const router = express.Router();

router.get('/test', async function (req, res){
   //var users = await model.addMovieToWatchList(1, 1, 'Hitta nemo', 'http://www.clker.com/cliparts/e/d/7/b/13426765571224390078nemo-md.png');
    var watchList = await model.getToWatchList(1);
    var movies = await model.getAllMoviesFromToWatchList(watchList[0].dataValues.id);
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

router.get('/getUser/:id', async function (req, res){
    if(req.session.loggedIn){ //If user is logged in
        const userId = req.params.id;
        var user = await model.getUser(userId);
        res.json({
            username: user.username,
            userImg: user.image
        })
    }
    else{
        res.json({
            userInfo: "Not logged in"
        })
    }
})

router.post('/logOut', async function (req, res) {
    req.session.destroy();
    return res.json({data: "loggedOut"});
});

router.post('/createuser', async function (req, res){
    const user = await model.createUser(req.body.username, req.body.password, req.body.link, req.body.deletehash)
    if(!user){
        res.json({success: false})
    } else {
        res.json({success: true})
    }
});

router.post('/validateuser', async function (req, res) {
    var users = await model.getAllUsers() //Gets all the users from the db
    var validUser = await model.validateUser(users, req.body.username, req.body.password) //Function that returns the user if its valid
    if(validUser != null){
        req.session.loggedIn = true;
        req.session.userId = validUser.dataValues.id;
        res.json({
            user : validUser
        })
    }
    else res.json({
        user : "Invalid"
    })
});

router.post('/logOut', async function (req, res) {
    req.session.destroy();
    return res.json({data: "loggedOut"});
});

module.exports = router;