const Booking=require("../models/bookingModel")
const Ticket=require("../models/TicketModel")
const CardDetail=require("../models/cardDetailsModel")
const ShowDetail=require("../models/ShowDetailsModel")
const Promotions=require("../models/promotionsModel")
const Movie=require("../models/movieModel")
const nodemailer = require('nodemailer');

const postpromotions = async (req, res) => {
    try {
      // Extract promotion code from request body
      const { code } = req.body;
  
      // Find the promotion in the database
      const promotion = await Promotions.findOne({
        where: {
          code: code
        }
      });
      

      // Check if promotion exists
      if (!promotion) {
        return res.status(404).json({ message: "Promotion not found" });
      }
  
      // Check if promotion is active
      if (!promotion.isActive) {
        return res.status(400).json({ message: "Promotion is not active" });
      }
      const Promo = promotion.discountPercentage;
      // If promotion is active, return success response
      return res.status(200).json({ message: "Promotion is active",Promo: Promo });
    } catch (error) {
      console.error("Error checking promotion:", error);
      return res.status(500).json({ message: "please check input fields" });
    }
  };
  
  const sendEmail = async (to, subject, text) => {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'harshith.ylbf52@gmail.com',
            pass: 'cbij pteq kmqf qhrv'
        }
    });

    // Define email options
    let mailOptions = {
        from: 'harshith.ylbf52@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
};

const postPayment = async (req, res) => {
    try {
        // Extract userId from the authenticated user
        const userId = req.user.id;

        // Check if cardId belongs to userId
        const { cardId,Promo } = req.body;
        if(!cardId){
            res.status(500).json({ message: "please eneter a card" });
            return;
        }
        if(req.body.tickets && req.body.tickets.length===0){
            res.status(500).json({ message: "please select tickets" });
            return;
        }
        const cardDetail = await CardDetail.findOne({
            where: {
                id: cardId,
                userId: userId
            }
        });

        if (!cardDetail) {
            return res.status(400).json({ error: "Card does not belong to the user" });
        }

        // Payment processing logic...
        // Assuming you're processing payment and creating bookings and tickets

        // Sample logic to calculate total from ticket types
        const ticketsData = req.body.tickets;
        let total = 0;
        for (const ticketData of ticketsData) {
            switch (ticketData.type) {
                case 'Adult':
                    total += 50.00;
                    break;
                case 'Child':
                    total += 20.00;
                    break;
                case 'Senior':
                    total += 30.00;
                    break;
                default:
                    break; // Do nothing if type is not recognized
            }
        }

        // Sample logic to create a booking
        let booking,promotion;
        if(Promo){
            promotion  = await Promotions.findOne({
                where: {
                  code: Promo
                }
              });
        }
        

        if(promotion && promotion.discountPercentage){
            booking = await Booking.create({
                userId: userId,
                showId: req.body.showId,
                cardId: cardId,
                total: Math.floor(total-(total*promotion.discountPercentage/100))            });
        }
        else{
            booking = await Booking.create({
                userId: userId,
                showId: req.body.showId,
                cardId: cardId,
                total: total
            });
        }

        // Sample logic to create tickets for the booking
        const tickets = await Promise.all(ticketsData.map(async (ticketData) => {
            let price1=0;
            
             switch(ticketData.type){
                case 'Adult':
                    price1=50.00;
                    break;
                case 'Child':
                    price1=20.00;
                    break;
                case 'Senior':
                    price1=30.00;
                    break;
                default:
                    price1=0;
            }
            return await Ticket.create({
                bookingId: booking.id,
                seatNumber: ticketData.seatNumber,
                type: ticketData.type,
                price:price1,
                showId:req.body.showId
            });
        }));
        const userEmail = req.user.email;
        const showDetails = await ShowDetail.findOne({
            where: {
                id: req.body.showId
            },
            include: [Movie] // Assuming your Show model includes a relationship with Movie model
        });
        let emailContent = "Booking Confirmation\n\n";
        emailContent += "Thank you for your booking! Here are the details:\n\n";
        emailContent += `Booking ID: ${booking.id}\n`;
        emailContent += `Movie: ${showDetails.Movie.title}\n`;

        emailContent += `Show Time: ${showDetails.showDateTime}\n`; // Assuming your Show model has a time attribute
        emailContent += `screen : ${showDetails.screenid}\n`;
        emailContent += `Total: $${booking.total.toFixed(2)}\n`;
        emailContent += "Tickets:\n";
        req.body.tickets.forEach(ticket => {
            emailContent += `Type:${ticket.type}-------------: seat number ${ticket.seatNumber}\n`;
        });

        emailContent += "\nEnjoy your Movie!";

        await sendEmail(userEmail, 'Booking Confirmation',  emailContent);

        // Payment processing completed successfully, send response
        res.status(200).json({ message: "Payment successful", booking: booking, tickets: tickets });
    } catch (error) {
        // Handle errors
        console.error("Error processing payment:", error);
        res.status(500).json({ message: "check the inputs" });
    }
}



const getOrderHistory=async (req, res) => {
    try {
        // Extract user ID from request parameters
        const userId = req.user.id;
        // Query the database for bookings and associated tickets belonging to the user
        const bookings = await Booking.findAll({
            where: { userId: userId },
            include: [{ model: Ticket }, { model: CardDetail }]
           
        });

        // Send the bookings and associated tickets as a response
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'problem with handling your request' });
    }
}

module.exports = { postPayment,postpromotions,getOrderHistory };
