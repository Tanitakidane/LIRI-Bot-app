LIRI-bot (Language Interpretation and Recognition Interface) is a CLI (Command Line Interface) app built through the use of node.js which, not unlike it's SIRI namesake, accepts user input and facilitates an appropriate response. In the case of LIRI user input comes in the form of command line arguments which, that this context, are further defined as either a "command" or a "command argument". LIRI accepts these commands and responds with the appropriate predefined function.

In order to run LIRI-bot simply fork this repository and within the cloned directory install it's node dependencies with:

npm install Functionality LIRI currently accepts the following "commands":

concert-this node liri.js 'concert-this' 'artist name' The 'concert-this' command will return the next four upcoming events/concerts for a given artist (if there are any). This information is obtained by intefacing with the bandsintown API.

spotify-this node liri.js 'spotify-this' 'song name or search term' The 'spotify-this' command returns the Spotify information and link for a given song or search term.

movie-this node liri.js 'movie-this' 'movie name' The 'movie-this' command will accept a movie name and search for the corresponding movie's information through the omdb API.

do-what-it-says node liri.js 'do-what-it-says' The 'do-what-it-says' command will run the first command that is logged in the random.txt file.

liri hw