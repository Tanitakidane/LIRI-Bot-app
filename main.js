
const axios=require("axios");
const readline = require('readline');
const moment =require("moment");
console.log(process.env.SPOTIFY_API_ID)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var Spotify = require('node-spotify-api');
 
require('dotenv').config();
var spotify = new Spotify({
    id: process.env.SPOTIFY_API_ID,
    secret: process.env.SPOTIFY_CLIENT_SECRET,
});


function askUser()
{
    rl.question('Please enter 1 -To search For Song Name 2-To Search For Band Name 3- To Search For Movie Name? ', (answer) => {
        // TODO: Log the answer in a database
      
        if(!isNaN(answer))
        {
              // Continue with the option

              if(Number(answer)==1)
              {
                function songName()
                {

                    // Search In spotify api for the song and display the data
                    rl.question('Please Enter the Song Name here ?', (songname) => {
                        // TODO: Log the answer in a database
                       
                        spotify.search({ type: 'track', query: songname }, function(err, data) {
                            if ( err ) {
                                console.log('Please input Correct Query ');
                                songName();
                            }
                         
                            const tracks = data.tracks.items;


                            for (let  i =  0; i < tracks.length; i++) {
                                console.log("#######################################");
                                var artistArr = tracks[i].artists;
                                var artists = [];
                                for (var j = 0; j < artistArr.length; j++){
                                    artists.push(artistArr[j].name);
                                    
                                }
                                console.log('Artist: ' + artists.join(", "));
                                console.log('Song: ' + tracks[i].name);
                                console.log('Album: ' + tracks[i].album.name);
                
                                if (tracks[i].preview_url == null) {
                                    console.log ('Preview Not Available');
                                }
                                else{
                                    console.log('Preview: ' + tracks[i].preview_url);
                                }
                                console.log("#######################################");
                            }

                          
                            askUser();
                        });
                       
                      });

                    
  
                }

                songName()
              }
            else if(Number(answer)==2)
              {
                function bandName()
                {
   // Search In spotify api for the song and display the data
   rl.question('Please Enter the Band Name here ?', async(bandname) => {
    // TODO: Log the answer in a database
   

    
    try {

       let url="https://rest.bandsintown.com/artists/" + bandname + "/events?app_id=" + process.env.BANDSINTOW_KEY;
        let _data= await axios.get(url)
        


         let result = _data.data;
         for (var i = 0; i < result.length; i++) {
          console.log("##################################")
          console.log("Band Venue: " + result[i].venue.name);
          console.log("Band Location: " + result[i].venue.city + ", " + (result[i].venue.region || result[i].venue.country));
          console.log("Event Date: " + moment(result[i].datetime).format("MM/DD/YYYY"));
          console.log("#######################################")
      }
        
         askUser();
      
       } catch (error) {
      console.error("Some error Occurred Please try again",error);
      bandName()
            }

    
   
  });
                     

                }
                bandName();
              }

              if(Number(answer)==3)
              {
                function MovieName()
                {
  

                    // Search In spotify api for the song and display the data
                    rl.question('Please Enter the Movie Name here ?', async(moviename) => {


                   
                try {
                 let _data= await axios.get(`http://www.omdbapi.com/?apikey=4fa7e375&type=movie&t=${moviename}`)
                 


                  let result = _data.data;
                 
                  console.log("Movie Title: " + result["Title"]);
                  console.log("Year Of Release: " + result["Year"]);
                  console.log("IMDB Rating: " + result["imdbRating"]);
                  if ( result.Ratings[1]) {
                      console.log("Rotten Tomatoes Rating: " + result.Ratings[1].Value);
                  }
                  
                  console.log("Releasing Country: " + result["Country"]);
                  console.log("Movie Language: " + result["Language"]);
                  console.log("Movie Plot: " + result["Plot"]);
                  console.log("Movie Actors: " + result["Actors"]);
                  console.log("Rotten Tomatoes URL: " + result["tomatoURL"])
                 
                  askUser();
               
                } catch (error) {
               console.error("Some error Occurred Please try again");
               MovieName();
                     }

                        
                       
                      });
                }

                MovieName();
              }


              
        }

        else if(answer=="")
        {
            askUser();
        }
      
        else{
            console.log("Please enter only Numerical input")
            askUser();
        }
     
      });
}

askUser();
