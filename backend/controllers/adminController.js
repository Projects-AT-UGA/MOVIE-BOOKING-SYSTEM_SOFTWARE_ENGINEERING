const User = require('../models/userModel'); // Import the User model
const sequelize=require("sequelize")
const bcrypt = require('bcrypt');
const validator = require('validator');
const Promotions=require("../models/promotionsModel")
const Movie = require('../models/movieModel'); 
const ShowDetail = require("../models/ShowDetailsModel");
const nodemailer = require('nodemailer');
// Define the Facade interface
// Define the Facade class
class Facade {
  constructor() {
    this.users = new Users();
    this.movies = new Movies();
    this.promotions = new Promo();
    this.showTime = new ShowTime();
  }

  // Common interface methods
  async getUsers(req, res) {
    return await this.users.getusers(req, res);
  }

  async createUser(req, res) {
    return await this.users.postusers(req, res);
  }

  async deleteUser(req, res) {
    return await this.users.deleteusers(req, res);
  }

  async updateUser(req, res) {
    return await this.users.updateusers(req, res);
  }

  async getPromotions(req, res) {
    return await this.promotions.getpromotions(req, res);
  }

  async createPromotion(req, res) {
    return await this.promotions.postpromotions(req, res);
  }

  async deletePromotion(req, res) {
    return await this.promotions.deletepromotions(req, res);
  }

  async updatePromotion(req, res) {
    return await this.promotions.updatepromotions(req, res);
  }

  async getMovies(req, res) {
    return await this.movies.getmovies(req, res);
  }

  async createMovie(req, res) {
    return await this.movies.postmovies(req, res);
  }

  async deleteMovie(req, res) {
    return await this.movies.deletemovies(req, res);
  }

  async updateMovie(req, res) {
    return await this.movies.updatemovies(req, res);
  }

  async getShowDetails(req, res) {
    return await this.showTime.getShowDetails(req, res);
  }

  async createShowDetail(req, res) {
    return await this.showTime.postShowDetail(req, res);
  }

  async deleteShowDetail(req, res) {
    return await this.showTime.deleteShowDetail(req, res);
  }

  async updateShowDetail(req, res) {
    return await this.showTime.updateShowDetail(req, res);
  }
}
  
  // Implement the Facade interface in separate classes
class Users{
    getusers = async (req, res) => {
        try {
          const users = await User.findAll();
          
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: "Error getting users" });
        }
      };
  
      postusers = async (req, res) => {
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
          
          res.status(500).json({ message: "please check input fields" });
        }
    };
    
      
  
     deleteusers = async (req, res) => {
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
      
      
      
  
       updateusers = async (req, res) => {
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
      
  }
  
  class Promo{
    getpromotions = async (req, res) => {
        try {
          console.log("harshith");
          const promotions = await Promotions.findAll();
          res.status(200).json(promotions);
        } catch (error) {
          res.status(500).json({ error: "Error getting promotions" });
        }
      };

      postpromotions = async (req, res) => {
        try {
            const { code, discountPercentage, isActive } = req.body;
    
            // Create a new promotion
            const newPromotion = await Promotions.create({
                code: code,
                discountPercentage: discountPercentage,
                isActive: isActive
            });
    
            // Fetch all users who are subscribed for promotions
            const subscribedUsers = await User.findAll({
                where: { subscribeForPromotions: true }
            });
    
            // If there are subscribed users, send them emails
            if (subscribedUsers.length > 0) {
                // Create transporter
                const transporter = nodemailer.createTransport({
                    service: 'gmail', // Use Gmail as the email service
                    auth: {
                        user: 'harshith.ylbf52@gmail.com', // Your Gmail email address
                        pass: 'cbij pteq kmqf qhrv' // Your Gmail password or app password
                    }
                });
    
                // Iterate over each subscribed user and send email
                for (const user of subscribedUsers) {
                    // Email content
                    const mailOptions = {
                        from: 'harshith.ylbf52@gmail.com',
                        to: user.email, // Receiver email
                        subject: 'New Promotion!', // Subject line
                        text: `A new Promotion code as been activated and is applicable for you , the code is ${code} and discount percentage is ${discountPercentage}` // Plain text body
                    };
    
                    // Send email
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent to ' + user.email + ': ' + info.response);
                        }
                    });
                }
            }
    
            // Respond with the newly created promotion
            res.status(200).json(newPromotion);
        } catch (error) {
            res.status(500).json({ message: "please check input fields" });
        }
    };
    
  
    deletepromotions = async (req, res) => {
        const promotionId = req.params.id;
        try {
          const promotion = await Promotions.findByPk(promotionId);
          if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
          }
          await promotion.destroy();
          res.status(200).json({ message: "Promotion deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: "Error deleting promotion" });
        }
      };
      
  
      updatepromotions = async (req, res) => {
  
        try {
          const promotionId = req.params.id;
        const updatedData = req.body;
          let promotion = await Promotions.findByPk(promotionId);
          if (!promotion) {
            return res.status(404).json({ message: "Promotion not found" });
          }
          promotion = await promotion.update(updatedData);
          res.status(200).json(promotion);
        } catch (error) {
          res.status(400).json({ message: "Error updating promotion" });
        }
      };
      
      
  }
  
  class Movies{
     getmovies = async (req, res) => {
        try {
          const movies = await Movie.findAll();
          res.status(200).json(movies);
        } catch (error) {
          res.status(500).json({ error: "Error getting movies" });
        }
      };
  
      postmovies = async (req, res) => {
        try {
          const { title, ratings, cast, synopsis, rating, playing_now, trailer_picture, release_date, genre, trailer_video, director, producer, duration, visibility, certificate } = req.body;
            
          // Validate fields (if needed)
          console.log(req.body)
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
          res.status(500).json({ message: "please check input fields" });
        }
    };
    
  
    deletemovies = async (req, res) => {
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
  
      updatemovies = async (req, res) => {
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
}
  class ShowTime{
    getShowDetails = async (req, res) => {
        try {
          const showDetails = await ShowDetail.findAll({ include: Movie });
          res.status(200).json(showDetails);
        } catch (error) {
          console.log(error)
          res.status(500).json({ error: "Error getting show details" });
        }
      };
  
      postShowDetail = async (req, res) => {
        try {
          const { MovieId, screenid, showDateTime } = req.body;
      
          // Validate fields if needed
          // Create a new show detail associated with the movie
          
          const newShowDetail = await ShowDetail.create({
            MovieId: MovieId,
            screenid: screenid,
            showDateTime: new Date(showDateTime)
          });
      
          // Respond with the newly created show detail
          res.status(200).json(newShowDetail);
        } catch (error) {
          try{
            if(error.message==="Validation error"){
              res.status(500).json({ message: "already a show exists" });
            }
          }
          catch(error){
            res.status(500).json({ message: "please check the inputs" });
          }
        }
      };
      
      deleteShowDetail = async (req, res) => {
        const showDetailId = req.params.id;
        try {
          const showDetail = await ShowDetail.findByPk(showDetailId);
          if (!showDetail) {
            return res.status(404).json({ message: "Show detail not found" });
          }
          await showDetail.destroy();
          res.status(200).json({ message: "Show detail deleted successfully" });
        } catch (error) {
          res.status(500).json({ message: "Error deleting show detail" });
        }
    };
    updateShowDetail = async (req, res) => {
        const showDetailId = req.params.id;
        const { screenid, showDateTime } = req.body;
        try {
          let showDetail = await ShowDetail.findByPk(showDetailId);
          if (!showDetail) {
            return res.status(404).json({ message: "Show detail not found" });
          }
          // Update only screenid and showDateTime
          showDetail.screenid = screenid;
          showDetail.showDateTime = showDateTime;
          await showDetail.save();
          res.status(200).json(showDetail);
        } catch (error) {
          res.status(400).json({ message: "Error updating show detail" });
        }
      };
      
}
  
  // Export functions directly
  module.exports = Facade;