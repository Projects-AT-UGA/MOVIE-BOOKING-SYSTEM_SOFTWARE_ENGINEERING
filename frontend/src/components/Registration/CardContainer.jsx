import React, { useState, useEffect } from 'react';
import useUser from '../../User/useUser';
import './CardContainer.css';
const CardContainer = () => {
  const { state } = useUser();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false); // New state for add card form loading
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false); // New state for update card form loading
  const [adderror,setAddError]=useState(null)
  const [updateerror,setUpdateError]=useState(null)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    cardType: '', // Added input for card type
    billingAddress: '', // Added input for billing address
    isDefault: false
  });

  const [formData1, setFormData1] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    cardType: '', // Added input for card type
    billingAddress: '', // Added input for billing address
    isDefault: false
  });
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    setIsLoadingAdd(true);
    setError(null)
    try {
      if (state) {
        const response = await fetch('/card', {
          headers: {
            authorization: `Bearer ${state.login.token}`
          }
        });
        const temp=await response.json();
        if (!response.ok) {
            setError(temp.message);
            return;
        }
       
        setCards(temp);
      }
    } catch (error) {
      setError("failed to fetch");
    } finally {
      setIsLoadingAdd(false);
    }
  };

  const addCard = async () => {
    setIsLoadingAdd(true);
    setAddError(null)
    try {
      const { id, ...formDataWithoutId } = formData1;
      if (state) {
        const response = await fetch('/card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${state.login.token}`
          },
          body: JSON.stringify(formDataWithoutId)
        });
        const temp=await response.json()
        if (!response.ok) {
            setAddError(temp.message);
            return;
        }
        
        setFormData1({
          cardNumber: '',
          cardHolderName: '',
          expirationDate: '',
          cvv: '',
          cardType: '',
          billingAddress: '',
          isDefault: false
        });
      }
    } catch (error) {
        setAddError("failed to add");
    } finally {
      setIsLoadingAdd(false);
    }
  };

  const updateCard = async () => {
    setIsLoadingUpdate(true);
    setUpdateError(null)
    try {
      if (state && selectedCardId) {
        const response = await fetch(`/card/${selectedCardId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${state.login.token}`
          },
          body: JSON.stringify(formData)
        });
        const updatedCard = await response.json();
        if (!response.ok) {
            setUpdateError(updatedCard.message);
        }
        
        setFormData({
            cardNumber: '',
            cardHolderName: '',
            expirationDate: '',
            cvv: '',
            cardType: '',
            billingAddress: '',
            isDefault: false
          });
        setSelectedCardId(null);
      }
    } catch (error) {
        setUpdateError("failed to update");
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const deleteCard = async (cardId) => {
    setError(null)
    try {
      if (state) {
        const response = await fetch(`/card/${cardId}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${state.login.token}`
          }
        });
        const temp=await response.json();
        if (!response.ok) {
            setError(temp.message);
        }
        else{
            getCards();
        }
      }
    } catch (error) {
      setError("failed to delete");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };
  const handleChange1 = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData1({ ...formData1, [name]: newValue });
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await addCard();
    getCards();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateCard();
    getCards();
  };

  const handleEdit = (cardId) => {
    const selectedCard = cards.find(card => card.id === cardId);
    if (selectedCard) {
      setSelectedCardId(cardId);
      setFormData(selectedCard);
    }
  };
  return (
    <div className="card-container">
      {/* <h1>Cards</h1> */}
      <div id="existing-card">
        <h2>Existing Cards</h2>
        {isLoadingAdd ? (
          <div>Loading...</div>
        ) : (
          <>
            {error && <div>{error}</div>}
            {cards.map((card) => (
              <div key={card.id} className="card-item">
                <div>Card Number: {card.cardNumber}</div>
                <div>Card Holder Name: {card.cardHolderName}</div>
                <div>Expiration Date: {card.expirationDate}</div>
                <div>CVV: {card.cvv}</div>
                <div>Card Type: {card.cardType}</div> {/* Display card type */}
                <div>Billing Address: {card.billingAddress}</div> {/* Display billing address */}
                <div>Default: {card.isDefault ? 'Yes' : 'No'}</div>
                <button onClick={() => handleEdit(card.id)}>Edit</button>
                <button onClick={() => deleteCard(card.id)}>Delete</button>
              </div>
            ))}
          </>
        )}
      </div>
  
      <div>
        <h2>Add New Card</h2>
        <form id='card-form' onSubmit={handleAddSubmit}>
        <input
          type="number"
          name="cardNumber"
          value={formData1.cardNumber}
          onChange={handleChange1}
          placeholder="Card Number"
          minLength={16} // Limit the input to 16 characters
          required
        />

          <input
            type="text"
            name="cardHolderName"
            value={formData1.cardHolderName}
            onChange={handleChange1}
            placeholder="Card Holder Name"
            required
          />
          <input
          type="date" // Change type to "date"
          name="expirationDate"
          value={formData1.expirationDate}
          onChange={handleChange1}
          placeholder="Expiration Date"
          required
          />

          <input
            type="password"
            name="cvv"
            value={formData1.cvv}
            onChange={handleChange1}
            placeholder="CVV"
            minLength={3}
            required
          />
          <select
            name="cardType"
            value={formData1.cardType}
            onChange={handleChange1}
            required
          >
            <option value="">Select Card Type</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="Discover">Discover</option>
            <option value="American Express">American Express</option>
          </select>

          <input
            type="text"
            name="billingAddress"
            value={formData1.billingAddress}
            onChange={handleChange1}
            placeholder="Billing Address"
            required
          />
          <label id="default">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData1.isDefault}
              onChange={handleChange1}
            />
            Default
          </label>
          {adderror ? <div className="error-message">{adderror}</div> : <></>}
          <button type="submit" disabled={isLoadingAdd}>Add Card</button>
        </form>
      </div>
  


      <div>
        <h2>Update Card</h2>
        <form id="update-card" onSubmit={handleUpdateSubmit}>
        <input
          type="number"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          maxLength={16} // Limit the input to 16 characters
          required
        />

          <input
            type="text"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleChange}
            placeholder="Card Holder Name"
            required
          />
          <input
          type="text" // Change type to "date"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          placeholder="Expiration Date"
          required
          />

          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            maxLength={3}
            required
          />
          <select
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            required
          >
          <option value="">Select Card Type</option>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
          <option value="Discover">Discover</option>
          <option value="American Express">American Express</option>
        </select>

          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            placeholder="Billing Address"
            required
          />
          <label id="default-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            Default
          </label>
          {updateerror ? <div className="error-message">{updateerror}</div> : <></>}
          <button type="submit" disabled={isLoadingUpdate}>Update Card</button>
        </form>
      </div>
  
    </div>
  );
  

}
export default CardContainer;