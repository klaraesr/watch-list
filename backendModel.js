const seq = require("./sequelize.js")
const {User, ToWatchList, WatchedList, Movie, sequelize} = seq()


exports.createUser = (username, password, image, deletehash) => {
    return User.create({
        username: username,
        password: password,
        image: image,
        deletehash: deletehash
    }).then(async (user) => {
        const toWatch = await ToWatchList.create()
        const watched = await WatchedList.create()
        user.setToWatchList(toWatch)
        user.setWatchedList(watched)
        return user
    }).catch(e => console.log(e))
}

exports.getAllUsers = () => {
    return User.findAll()
        .then(data => {
            return data
        })
        .catch(error => {console.log(error)})
}

exports.getUser = (userId) => {
    return User.findByPk(userId)
        .then(user => {
            return user
        })
        .catch(error => {console.log(error)})
}

exports.getListLength = (userId, toWatch) => {
    return User.findByPk(userId)
        .then(user => {
            if(toWatch) {
                return user.getToWatchList()
                    .then(watchlist => {
                        return watchlist.getMovies()
                            .then(movies => {
                                return movies.length
                            })
                    })
                    .catch(e => console.log(e))
            } else {
                return user.getWatchedList()
                    .then(watchlist => {
                        return watchlist.getMovies()
                            .then(movies => {
                                return movies.length
                            })
                    })
                    .catch(e => console.log(e))
            }
        })
        .catch(e => console.log(e))
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
    return ToWatchList.findOne({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
        .error(e => console.log(e))
}

exports.getWatchedList = (userId) => { //Returnerar en användares watched-list baserat på användarens id
    return WatchedList.findOne({
        where:{
            user_id : userId
        }
    }).then(data => {return data})
        .error(e => console.log(e))
}

exports.addMovieToWatchList = async (listId, userId, movieId, movieName, imgSrc) => {
    let inWatchedList = await this.checkMovieInList(movieId, userId, 'watchedList')
    let watchedList = await this.getWatchedList(userId)
    if(inWatchedList) {
        return updateMovieWithList(true, listId, watchedList.dataValues.id, movieId)
    } else {
        return addMovieToList(true, listId, movieId, movieName, imgSrc)
    }
}

exports.addMovieToWatchedList = async (listId, userId, movieId, movieName, imgSrc) => {
  let inToWatchList = await this.checkMovieInList(movieId, userId, 'toWatchList')
  let watchList = await this.getToWatchList(userId)
  if(inToWatchList) {
    return updateMovieWithList(false, listId, watchList.dataValues.id, movieId)
  } else {
    return addMovieToList(false, listId, movieId, movieName, imgSrc)
  }
}

function addMovieToList (toWatch, listId, movieId, movieName, imgSrc) {
  let WATCHID, WATCHEDID
  if(toWatch) {
    WATCHID = listId
    WATCHEDID = null
  } else {
    WATCHID = null
    WATCHEDID = listId
  }

  return Movie.create({
      movie_id: movieId,
      name: movieName,
      image: imgSrc,
      watchlist_id: WATCHID,
      watchedlist_id: WATCHEDID
  }).then(movie => { //Returns a movie that is connected to a watchedlist
      return movie
  })
      .catch(error => {
          if(error.name === 'SequelizeUniqueConstraintError') {
              console.log('contraint error')
              return error.errors[0]
          } else {
              //console.log(error)
          }
      })
}

function updateMovieWithList(toWatch, listId, otherListId, movieId) {
    let ListNameId
    let OtherListNameId
    if(toWatch) {
      ListNameId = 'watchlist_id'
      OtherListNameId = 'watchedlist_id'
    } else {
      ListNameId = 'watchedlist_id'
      OtherListNameId = 'watchlist_id'
    }

    return Movie.findOne({
        where: {movie_id: movieId, [OtherListNameId]: otherListId}
    })
      .then(movie => {
          movie.update({
            [ListNameId]: listId
          }).then(() => {
            })
      })
}

exports.deleteMovieFromToWatchList = (movieId, listId) => {
    return Movie.destroy({
        where:{
            movie_id: movieId,
            watchlist_id: listId
        }
    })
}

exports.deleteMovieFromWatchedList = (movieId, listId) => {
    return Movie.destroy({
        where:{
            movie_id: movieId,
            watchedlist_id: listId
        }
    })
}

exports.checkMovieInList = (movieId, userId, list) => {
    return User.findByPk(userId)
        .then(user => {
            if(list === 'toWatchList') {
                return user.getToWatchList()
                    .then(toWatchList => {
                        return Movie.count({where: {movie_id: movieId, watchlist_id: toWatchList.dataValues.id}})
                            .then(count => {
                                return count !== 0; // return true if not 0
                            })
                    })
            } else if(list === 'watchedList') {
                return user.getWatchedList()
                    .then(watchedList => {
                        return Movie.count({where: {movie_id: movieId, watchedlist_id: watchedList.dataValues.id}})
                            .then(count => {
                                return count !== 0; // return true if not 0
                            })
                    })
            }
        })
}

exports.getAllMoviesFromToWatchList = (id) => {
    return WatchedListMovie.findAll({
        where: {movie_id: id}
    })
        .then( list => {
            return list.getMovies()
                .then(movies => {
                    return movies
                })
        })
        .catch(error => {console.log(error)})
}

exports.getAllMoviesFromWatchedList = (id) => {
    return WatchedListMovie.findAll({
        where: {movie_id: id}
    })
        .then(list => {
            return list.getMovies()
        })
        .catch(error => {console.log(error)})
}

//Tar ut dom limit senaste med en offset på offset, från användare med id och där listnameid = watchlist_id eller watchlisted_id beroende på vilken man ska ha
exports.getMoviesFromList = (id, ListNameId, offset, limit) => {
    return User.findByPk(id)
        .then(async (user) => {
            let listId = null
            if(ListNameId === 'watchedlist_id'){
                listId = await user.getWatchedList()
            } else {
                listId = await user.getToWatchList()
            }
            return Movie.findAll({where:{[ListNameId]: listId.dataValues.id}, limit: parseInt(limit), offset: parseInt(offset), order: [['created_at', 'DESC']]})
                .then(movies => {
                    return movies
                })
                .catch(e => {console.log(e)})
        })
        .catch(e => console.log(e))
}

//Returnerar id till användarens senast tillagda film
exports.getLatestMovie  = async (userId) => {
    const watchedList = await this.getWatchedList(userId)
    const toWatchList = await this.getToWatchList(userId)
    return Movie.findAll({
        where: {watchedlist_id: watchedList.dataValues.id},
        limit: 1,
        order: [['created_at', 'DESC']]
    })
        .then(movie => {
            if(movie.length !== 0){
                return movie[0].dataValues.movie_id
            } else { //Om det inte finns något i watchedList, rekommendera baserat på to-watch istället
                return Movie.findAll({
                    where: {watchlist_id: toWatchList.dataValues.id},
                    limit: 1,
                    order: [['created_at', 'DESC']]
                })
                    .then(movie => {
                        if(movie.length !== 0){
                            return movie[0].dataValues.movie_id
                        } else {
                            return null
                        }
                    })
            }
        })
}
