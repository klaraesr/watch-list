# SETUP

Clone the project. 
- Run _npm install_
- Run _npm client-install_

To be able to run your developer database, insert information () about your database for Sequelize in sequelize.js.

To run the database and the react development environment:
- _npm run dev_


# Watch list

The pages you can go to directly are:

/ (the login page, will not work due to database not integrated yet)

/landing (the first page after login)

Then you can click around to the different paths and explore the application! :) 


### Description:
Watch List is an application for finding and saving movies, either to a watched list or to a want-to-watch list. The users can search for different movies and when they click on a movie they find information about it. For example, the IMDB-rating of the movie will be displayed, together with a description of the movie. The user can add, move and remove movies from their lists. The users can also get recommendations on movies based on their lists.

### What we have done so far:
We have set up our layout and we are showing data from different API-calls. We have started implementing different methods for the application, like the search function and showing information about the movies.

### What we still plan to do:
Keep track of which user that is logged in. Right now, when a user tries to log in, we only check if it exists an user with the password + usernamne. If it exists we direct them to the landing page/start page, whitout keeping track of which user that actually logged in (by userId). But we plan to use express-sessions to keep track of the userID:s of every new session when someone logs in. Right now we use mock-data in the profile, but with sessions we can get the real user-data from the database. We still have some changes to do in our structure, like rerouting the users if they aren't logged in, and fix some of our components that should be stateless. There are also some methods regarding the different lists that needs to be implemented.

### The project file structure:
The frameworks we are using are React (frontend), and Node js + Express for the backend. In the frontend we have a structure based on Pages and Components. The pages are statefull components, and the files in the Component-folder are stateless components. For example, our LoginPage contains the Login-component. The LoginPage does all the logic, for example handles different updates and validates the users. We then pass the states and the different methods from the page to the Login-components as props, so that the stateless components can use them. So the Login-components job is only to display the values from the input, without setting any states or using methods. We use this kind of structure on all the files in the Pages + Component folders. We have a frontend model which makes the API-calls, and a backendModel that manage the database (example: the logic when adding a new user, adding a movie to a list etc).
