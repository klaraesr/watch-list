const seq = require("./sequelize.js")
const {User, ToWatchList, WatchedList, Movie, sequelize} = seq()


exports.createUser = (username, password, image, deletehash) => {
    return User.create({
        username: username,
        password: password,
        image: image,
        deletehash: deletehash
    }).then(data => {
        return data
    }).catch(e => console.log(e))
}

exports.getAllUsers = () => {
    return User.findAll()
        .then(data => {
            return data
        })
        .catch(error => {console.log(error)})
}

exports.getUser = (userID) => {
    return User.findByPk(userID)
        .then(user => {
            return user
        })
        .catch(error => {console.log(error)})
}

exports.validateUser = (users, username, password) => {
    var userToReturn;
    users.forEach(function (user) {
        if (user.dataValues.username === username && user.dataValues.password === password) {
            userToReturn = user;
        }
    })
    if(userToReturn === undefined){
        return null;
    }
    else return userToReturn;
}


exports.getToWatchList = (userId) => { //Returnerar en användares to-watch-list baserat på användarens id
    return ToWatchList.findAll({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
        .error(e => console.log(e))
}

exports.getWatchedList = (userId) => { //Returnerar en användares watched-list baserat på användarens id
    return WatchedList.findAll({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
        .error(e => console.log(e))
}

// skulle det gå att ta in userId här istället, och  möjligtvis en sträng/bool
// som indikerar vilken lista det är? (istället för olika metoder)
exports.addMovieToWatchList = (listId, movieId, movieName, imgSrc) => {
  console.log('adding ', movieName, ' to watch')
    return Movie.create({
        id: movieId,
        name: movieName,
        image: imgSrc,
        watchlist_id: listId
    }).then(movie => { //Returns a movie that is connected to an watchlist
        return movie
    })
}

exports.addMovieToWatchedList = (listId, movieId, movieName, imgSrc) => {
    return Movie.create({
        id: movieId,
        name: movieName,
        image: imgSrc,
        watchedlist_id: listId
    }).then(movie => { //Returns a movie that is connected to an watchedlist
        return movie
    })
}

exports.deleteMovieFromToWatchList = (movieId, listId) => {
    return Movie.destroy({
        where:{
            id: movieId,
            watchlist_id: listId
        }
    })
}

exports.deleteMovieFromWatchedList = (movieId, listId) => {
    return Movie.destroy({
        where:{
            id: movieId,
            watchedlist_id: listId
        }
    })
}

exports.getAllMoviesFromToWatchList = (id) => {
    return ToWatchList.findByPk(id)
        .then( list => {
            return list.getMovies()
                .then(movies => {
                    return movies
                })
        })
        .catch(error => {console.log(error)})
}

exports.getAllMoviesFromWatchedList = (id) => {
    return WatchedList.findByPk(id)
        .then(list => {
            return list.getMovies()
        })
        .catch(error => {console.log(error)})
}

//Tar ut dom 5 senaste filmerna från to watch listan
exports.getMoviesFromToWatchList = (id) => {
    return Movie.findAll({where:{watchlist_id: id}, limit: 5, order: [['created_at', 'DESC']]})
        .then(movies => {
            return movies
        })
        .catch(error => {console.log(error)})
}

//Tar ut dom 5 senaste filmerna från watched listan
exports.getMoviesFromWatchedList = (id) => {
    return Movie.findAll({where:{watchedlist_id: id}, limit: 5, order: [['created_at', 'DESC']]})
        .then(movies => {
            return movies
        })
        .catch(error => {console.log(error)})
}
