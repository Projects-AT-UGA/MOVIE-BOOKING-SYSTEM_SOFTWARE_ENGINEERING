const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ShowDetail=require("./ShowDetailsModel")
const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    ratings: DataTypes.STRING,
    cast: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    rating: DataTypes.STRING,
    playing_now: DataTypes.BOOLEAN,
    trailer_picture: DataTypes.STRING,
    release_date: DataTypes.DATE,
    genre: DataTypes.STRING,
    trailer_video: DataTypes.STRING,
    director: DataTypes.STRING,
    producer: DataTypes.STRING,
    duration: DataTypes.STRING,
    visibility: DataTypes.STRING,
    certificate: DataTypes.STRING
});

ShowDetail.belongsTo(Movie);
Movie.hasMany(ShowDetail, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });


// const moviesData =[
//     {
//         "title": "Monster",
//         "ratings": "4.3",
//         "cast": "Jennifer Ehle  Jennifer Hudson  John David Washington  Kelvin Harrison Jr  Tim Blake Nelson  ASAP R",
//         "synopsis": "A single mother demands answers from a school teacher when her son begins acting strangely. A fight at school causes even more trouble.",
//         "rating": "4.3",
//         "playing_now": true,
//         "trailer_picture": "https://m.media-amazon.com/images/M/MV5BNDA3NTQ1YWItZDg4Ny00ZDYxLWJmZDYtODY4MTcwYWFlMDYwXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg",
//         "release_date": "2024-03-01",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=cOpWDxxiwoE",
//         "director": "Hirokazu Koreeda",
//         "producer": "Keiko Mitsumatsu, Hyeon-Seon Seo",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "M"
//     },
//     {
//         "title": "Napolean",
//         "ratings": "3.0",
//         "cast": "Joaquin Phoenix Napoleon Bonaparte  Vanessa Kirby Empress Joséphine  Edouard Philipponnat Tsar Alex",
//         "synopsis": "A look at the military commander's origins and his swift, ruthless climb to emperor, viewed through the prism of his addictive and often volatile relationship with his wife and one true love, Josephine.",
//         "rating": "3.0",
//         "playing_now": true,
//         "trailer_picture": "https://miro.medium.com/v2/resize:fit:470/1*ipM3eKi6MG1LmetLjI3p9g.jpeg",
//         "release_date": "2024-03-01",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=OAZWXUkrjPc",
//         "director": "Ridley Scott",
//         "producer": "Aline Leonello",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "inception",
//         "ratings": "3.5",
//         "cast": "Leonardo DiCaprio Cobb  Joseph Gordon-Levitt Arthur  Cillian Murphy Fischer  Tom Hardy Eames  Elliot",
//         "synopsis": "None",
//         "rating": "4.5",
//         "playing_now": false,
//         "trailer_picture": "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
//         "release_date": "2024-02-29",
//         "genre": "Action",
//         "trailer_video": "https://www.youtube.com/watch?v=YoHD9XEInc0",
//         "director": "Christopher Nolan",
//         "producer": "Christopher Nolan",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "Titanic",
//         "ratings": "5.0",
//         "cast": "Kate Winslet Rose DeWitt Bukater  Leonardo DiCaprio Jack Dawson  Billy Zane Caledon Hockley  Kathy",
//         "synopsis": "None",
//         "rating": "5",
//         "playing_now": false,
//         "trailer_picture": "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
//         "release_date": "2024-02-29",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=CHekzSiZjrY",
//         "director": "James Cameron",
//         "producer": "James Cameron",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "Killers of the Flower Moon",
//         "ratings": "4.6",
//         "cast": "Leonardo DiCaprio Ernest Burkhart  Lily Gladstone Mollie Burkhart  Martin Scorsese  Robert De Niro",
//         "synopsis": "Real love crosses paths with unspeakable betrayal as Mollie Burkhart, a member of the Osage Nation, tries to save her community from a spree of murders fueled by oil and greed.",
//         "rating": "4.6",
//         "playing_now": true,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/8/88/Killers_of_the_Flower_Moon_film_poster.jpg",
//         "release_date": "2024-03-01",
//         "genre": "Crime",
//         "trailer_video": "https://www.youtube.com/watch?v=7cx9nCHsemc",
//         "director": "Martin Scorsese",
//         "producer": "Paramount Pictures",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "The Irishman",
//         "ratings": "4.6",
//         "cast": "Robert De Niro Frank Sheeran  Martin Scorsese  Joe Pesci Russell Bufalino  Al Pacino Jimmy Hoffa  H",
//         "synopsis": "In the 1950s, truck driver Frank Sheeran gets involved with Russell Bufalino and his Pennsylvania crime family. As Sheeran climbs the ranks to become a top hit man, he also goes to work for Jimmy Hoffa -- a powerful Teamster tied to organized crime.",
//         "rating": "4.6",
//         "playing_now": true,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/8/80/The_Irishman_poster.jpg",
//         "release_date": "2024-03-02",
//         "genre": "Crime",
//         "trailer_video": "https://www.youtube.com/watch?v=WHXxVmeGQUc",
//         "director": "Martin Scorsese",
//         "producer": "Robbie Robertson",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "The Shift",
//         "ratings": "4.7",
//         "cast": "Peter Rob John",
//         "synopsis": "After a tense encounter with a mysterious stranger with otherworldly powers, a man finds himself banished to a parallel Earth, where he fights to get back to the woman he loves",
//         "rating": "4.7",
//         "playing_now": false,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/9/9a/The_Shift_%282023_film%29.jpg",
//         "release_date": "2024-03-04",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=Tl7rtMiOrvY",
//         "director": "Brock Heasley",
//         "producer": "Saltshaker Films",
//         "duration": "03H00M",
//         "visibility": "Coming Soon",
//         "certificate": "G"
//     },
//     {
//         "title": "Pain Hustlers",
//         "ratings": "4.0",
//         "cast": "Emily Blunt (Liza Drake) Emily Blunt Liza Drake Chris Evans (Pete Brenner) Chris Evans Pete Brenner",
//         "synopsis": "After losing her job, a woman who's struggling to raise her daughter takes a job out of desperation. She begins work at a failing pharmaceutical startup, but what she doesn't anticipate is the dangerous racketeering scheme she's suddenly entered.",
//         "rating": "4.0",
//         "playing_now": false,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/e/e8/Pain_hustlers_film_poster.jpg",
//         "release_date": "2024-04-10",
//         "genre": "Crime",
//         "trailer_video": "https://www.youtube.com/watch?v=4kK6Gw_Mdlo",
//         "director": "David Yates",
//         "producer": "Lawrence Grey.",
//         "duration": "03H00M",
//         "visibility": "Coming Soon",
//         "certificate": "G"
//     },
//     {
//         "title": "The Equalizer 3",
//         "ratings": "4.5",
//         "cast": "Denzel Washington Robert McCall  Dakota Fanning Emma Collins  Sonia Ammar Chiara Bonucci  Gaia Scod",
//         "synopsis": "Since giving up his life as a government assassin, Robert McCall finds solace in serving justice on behalf of the oppressed. Now living in Southern Italy, he soon discovers his new friends are under the control of local crime bosses. As events turn deadly, McCall becomes their protector by taking on the mafia.",
//         "rating": "4.5",
//         "playing_now": false,
//         "trailer_picture": "https://musicart.xboxlive.com/7/d1bb6700-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
//         "release_date": "2024-04-17",
//         "genre": "Action",
//         "trailer_video": "https://www.youtube.com/watch?v=19ikl8vy4zs",
//         "director": "Antoine Fuqua",
//         "producer": "Sony Pictures",
//         "duration": "03H00M",
//         "visibility": "Coming Soon",
//         "certificate": "M"
//     },
//     {
//         "title": "The Beekeper",
//         "ratings": "4.6",
//         "cast": "Jason Statham Mr. Clay  Josh Hutcherson Derek Danforth  Amber Sienna Server  Emmy Raver-Lampman",
//         "synopsis": "One man's brutal campaign for vengeance takes on national stakes after it's revealed he's a former operative of a powerful and clandestine organization known as Beekeepers.",
//         "rating": "4.6",
//         "playing_now": true,
//         "trailer_picture": "https://m.media-amazon.com/images/M/MV5BZDkwOTIyZGQtYWNkOS00YzAxLTkwZWUtMzU3YjU4ZDIyYzdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
//         "release_date": "2024-03-01",
//         "genre": "Action",
//         "trailer_video": "https://www.youtube.com/watch?v=CHKn-yDCE2w",
//         "director": "David Ayer",
//         "producer": "Amazon MGM Studios, Metro-Goldwyn-Mayer",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "Ferrari",
//         "ratings": "5.0",
//         "cast": "Penélope Cruz Laura Ferrari  Adam Driver Enzo Ferrari  Shailene Woodley Lina Lardi",
//         "synopsis": "During the summer of 1957, bankruptcy looms over the company that Enzo Ferrari and his wife had built 10 years earlier. He decides to roll the dice and wager it all on the iconic Mille Miglia, a treacherous 1000-mile race across Italy.",
//         "rating": "5.0",
//         "playing_now": true,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/f/f6/Ferrari_film_poster.jpg",
//         "release_date": "2024-03-01",
//         "genre": "Action",
//         "trailer_video": "https://www.youtube.com/watch?v=PBjKTN-aU0E",
//         "director": "Michael Mann",
//         "producer": "Enzo Ferrari: The Man, the Cars, the Races, the Machine; by Brock Yates",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "Reptile",
//         "ratings": "4.2",
//         "cast": "Benicio Del Toro Tom Nichols  Alicia Silverstone Judy Nichols  Justin Timberlake Will Grady  Michae",
//         "synopsis": "Following the brutal murder of a young real estate agent, a hardened detective attempts to uncover the truth in a case where nothing is as it seems, and, by doing so, dismantles the illusions in his own life.",
//         "rating": "4.2",
//         "playing_now": false,
//         "trailer_picture": "https://resizing.flixster.com/QJUikTM5PVkh8xv3kMycP_WcgdQ=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2ExN2NkZDkxLTY3MWEtNDVjZS1iYTdiLWVjZDgxOGJiODY5Yy5qcGc=",
//         "release_date": "2024-03-01",
//         "genre": "Crime",
//         "trailer_video": "https://www.youtube.com/watch?v=KS1cNkZ9o1U",
//         "director": "Grant Singer",
//         "producer": "John Peter",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     },
//     {
//         "title": "Unsung Hero",
//         "ratings": "4.0",
//         "cast": "Joel Smallbone  Rebecca St. James Flight Attendant  Candace Cameron Bure Kay Albright  Daisy Betts",
//         "synopsis": "David Smallbone, his pregnant wife and their seven children leave Australia to rebuild their lives in America. David and Helen realize the musical talent of their children, who become two of the most successful acts in Inspirational Music history.",
//         "rating": "4.0",
//         "playing_now": false,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/c/c4/Unsung_Hero_poster.jpg",
//         "release_date": "2024-05-15",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=_mYkDJ1vBg4",
//         "director": "Joel Smallbone, Richard Ramsey",
//         "producer": "Kevin Downes, Mike Curb, Jeffery Brooks, Ford Englerth",
//         "duration": "03H00M",
//         "visibility": "Coming Soon",
//         "certificate": "G"
//     },
//     {
//         "title": "Bonhoeffer",
//         "ratings": "3.0",
//         "cast": "Jonas Dassler Dietrich Bonhoeffer  David Jonsson Frank Fisher  Moritz Bleibtreu Karl Bonhoeffer  Fl",
//         "synopsis": "Bonhoeffer is an upcoming historical drama film, written, directed and produced by Todd Komarnicki. Wikipedia",
//         "rating": "3.0",
//         "playing_now": false,
//         "trailer_picture": "https://m.media-amazon.com/images/M/MV5BM2YyMjIzNDUtZjYxMy00MjNhLThmMTItMzFiMWExM2YwYzM0XkEyXkFqcGdeQXVyMTM5MjI4Mjc@._V1_FMjpg_UX1000_.jpg",
//         "release_date": "2024-04-10",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=UmJ9VU6JRuQ",
//         "director": "Todd Komarnicki",
//         "producer": "Mark O'Sullivan",
//         "duration": "03H00M",
//         "visibility": "Coming Soon",
//         "certificate": "G"
//     },
//     {
//         "title": "Dunki",
//         "ratings": "4.3",
//         "cast": "Sharukh Khan, Tapsee",
//         "synopsis": "gdhfgmjnb",
//         "rating": "4.3",
//         "playing_now": false,
//         "trailer_picture": "https://upload.wikimedia.org/wikipedia/en/4/4f/Dunki_poster.jpg",
//         "release_date": "2024-03-01",
//         "genre": "Drama",
//         "trailer_video": "https://www.youtube.com/watch?v=LOzucm1jbzs",
//         "director": "Raj Kumar",
//         "producer": "Netflix",
//         "duration": "03H00M",
//         "visibility": "Now Playing",
//         "certificate": "G"
//     }
// ]

// async function insertMovies() {
//     try {
//         // Insert each movie from the moviesData array
//         for (const movieData of moviesData) {
//             await Movie.create({
//                 title: movieData.title,
//                 ratings: movieData.ratings,
//                 cast: movieData.cast,
//                 synopsis: movieData.synopsis,
//                 rating: movieData.rating,
//                 playing_now: movieData.playing_now,
//                 trailer_picture: movieData.trailer_picture,
//                 release_date: movieData.release_date,
//                 genre: movieData.genre,
//                 trailer_video: movieData.trailer_video,
//                 director: movieData.director,
//                 producer: movieData.producer,
//                 duration: movieData.duration,
//                 visibility: movieData.visibility,
//                 certificate: movieData.certificate
//             });
//         }
//         console.log('Movies inserted successfully.');
//     } catch (error) {
//         console.error('Error inserting movies:', error);
//     }
// }

// // Call the function to insert movies
// insertMovies();



// (async () => {
//     try {
//       await sequelize.sync({alter:"true"});
//       console.log('Table created successfully.');
//     } catch (error) {
//       console.error('Error creating table:', error);
//     } finally {
//       // Close the connection
//       sequelize.close();
//     }
//   })();
module.exports = Movie;


// Assuming you have already defined the Sequelize model for Movie





