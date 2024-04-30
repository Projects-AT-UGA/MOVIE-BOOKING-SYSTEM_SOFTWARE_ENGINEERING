const CardDetail = require("../models/cardDetailsModel");
const { Op } = require('sequelize');

const MAX_CARDS_PER_USER = 3;

const getCardDetails = async (req, res) => {
  try {
    // Fetch card details only for the authenticated user
    const cardDetails = await CardDetail.findAll({ where: { userId: req.user.id } });
    res.status(200).json(cardDetails);
  } catch (error) {
    res.status(500).json({ message: "please check input fields" });
  }
};

const postCardDetails = async (req, res) => {
  try {
    // Check if the user has reached the maximum number of cards allowed
    const existingCardsCount = await CardDetail.count({ where: { userId: req.user.id } });
    if (existingCardsCount >= MAX_CARDS_PER_USER) {
      return res.status(400).json({ message: `Maximum limit of ${MAX_CARDS_PER_USER} cards reached for the user` });
    }
   
    // If no card is set as default for the user, set the new card as default
    const userDefaultCard = await CardDetail.findOne({ where: { userId: req.user.id, isDefault: true } });
    const newCardDetail = await CardDetail.create({ ...req.body, userId: req.user.id });
    
    

    if (!userDefaultCard) {
      await newCardDetail.update({ isDefault: true });
      
    } else {
      userDefaultCard.isDefault=false;
      userDefaultCard.save()
      // Set the new card as default and unset other default cards
      await CardDetail.update({ isDefault: false }, { where: { userId: req.user.id, id: { [Op.not]: newCardDetail.id } } });
    }

    res.status(201).json(newCardDetail);
  } catch (error) {
    console.error("Error creating card detail:", error);
    res.status(500).json({ message: "please check the fields" });
  }
};

const updateCardDetails = async (req, res) => {
  const cardId = req.params.id;
  try {
    // Update card detail only if it belongs to the authenticated user
    const [updated] = await CardDetail.update(req.body, { where: { id: cardId, userId: req.user.id } });
    if (updated === 0) {
      return res.status(404).json({ message: "Card detail not found or you don't have permission to update it" });
    }
    
    // If isDefault is set to true, set it as the default card and unset other default cards
    if (req.body.isDefault) {
      await CardDetail.update({ isDefault: false }, { where: { userId: req.user.id, id: { [Op.not]: cardId } } });
    }

    res.status(200).json({ message: "Card detail updated successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "please check the fields" });
  }
};















const deleteCardDetails = async (req, res) => {
  const cardId = req.params.id;
  try {
    // Delete card detail only if it belongs to the authenticated user
    const deletedCardDetail = await CardDetail.destroy({ where: { id: cardId, userId: req.user.id } });
    if (deletedCardDetail === 0) {
      return res.status(404).json({ message: "Card detail not found or you don't have permission to delete it" });
    }
    res.status(200).json({ message: "Card detail deleted successfully" });
  } catch (error) {
   
    res.status(500).json({ message: "please check input fields" });
  }
};



module.exports = { getCardDetails, postCardDetails, deleteCardDetails, updateCardDetails };
