const Booking=require("../models/bookingModel")
const Ticket=require("../models/TicketModel")
const CardDetail=require("../models/cardDetailsModel")
const postPayment = async (req, res) => {
    try {
        // Extract userId from the authenticated user
        const userId = req.user.id;

        // Check if cardId belongs to userId
        const { cardId } = req.body;
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
        const booking = await Booking.create({
            userId: userId,
            showId: req.body.showId,
            cardId: cardId,
            total: total
        });

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
        
        // Payment processing completed successfully, send response
        res.status(200).json({ message: "Payment successful", booking: booking, tickets: tickets });
    } catch (error) {
        // Handle errors
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = { postPayment };
