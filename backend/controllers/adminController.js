const User = require('../models/userModel'); // Import the User model
const sequelize=require("sequelize")
const bcrypt = require('bcrypt');
const validator = require('validator');
const Promotions=require("../models/promotionsModel")
const Movie = require('../models/movieModel'); 
// Get all users
const getusers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

// Create a new user
const postusers = async (req, res) => {
    try {
      const { country, username, email, dob, phoneNumber, password, address, subscribeForPromotions,issuspended } = req.body;
        
      // Validate fields using validator package
      if (!validator.matches(country, /^[A-Za-z\s]+$/)) {
        return res.status(400).json({ message: "Invalid country format" });
      }
  
      if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ message: "Username must be alphanumeric" });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
  
      if (!validator.isDate(new Date(dob))) {
        return res.status(400).json({ message: "Invalid date of birth format" });
      }
  
      if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
        return res.status(400).json({ message: "Invalid phone number format" });
      }
  
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Password is not strong enough" });
      }
  
      
      
      
      const existingUser = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { username: username },
            { email: email }
          ]
        }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "Username or email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = await User.create({
        country: country,
        username: username,
        email: email,
        dob: dob,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        address: address,
        subscribeForPromotions: subscribeForPromotions,
        issuspended:issuspended
      });
  
     
     
  
      // Respond with the newly created user's email and token
      res.status(200).json({ email: email });
    } catch (error) {
      
      res.status(500).json({ message: "Internal server error" });
    }
};

  

// Delete a user by ID
const deleteusers = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Error deleting user" });
  }
};



// Update a user by ID
const updateusers = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await user.update(updatedData);
    res.status(200).json(user);
  } catch (error) {
    
    res.status(400).json({ message: "Error updating user" });
  }
};






// Get all movies
const getmovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
};

// Create a new movie
const postmovies = async (req, res) => {
    try {
      const { title, ratings, cast, synopsis, rating, playing_now, trailer_picture, release_date, genre, trailer_video, director, producer, duration, visibility, certificate } = req.body;
        
      // Validate fields (if needed)
  
      // Create a new movie
      const newMovie = await Movie.create({
        title: title,
        ratings: ratings,
        cast: cast,
        synopsis: synopsis,
        rating: rating,
        playing_now: playing_now,
        trailer_picture: trailer_picture,
        release_date: release_date,
        genre: genre,
        trailer_video: trailer_video,
        director: director,
        producer: producer,
        duration: duration,
        visibility: visibility,
        certificate: certificate
      });
  
      // Respond with the newly created movie
      res.status(200).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a movie by ID
const deletemovies = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    await movie.destroy();
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie" });
  }
};

// Update a movie by ID
const updatemovies = async (req, res) => {
  const movieId = req.params.id;
  const updatedData = req.body;
  try {
    let movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movie = await movie.update(updatedData);
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error updating movie" });
  }
};



module.exports = { getusers, postusers, deleteusers, updateusers,getmovies, postmovies, deletemovies, updatemovies };
