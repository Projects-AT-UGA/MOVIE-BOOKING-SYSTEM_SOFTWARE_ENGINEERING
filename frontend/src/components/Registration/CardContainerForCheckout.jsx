import React, { useState, useEffect } from 'react';
import useUser from '../../User/useUser';
import './CardContainerForCheckout.css'
import useBooking from '../../booking/useBooking';
const CardContainerForCheckout = ({showPayment}) => {
  const { state } = useUser();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false); // New state for add card form loading
  const [adderror,setAddError]=useState(null)
  
  const [selectedCardId, setSelectedCardId] = useState(null);
  const {dispatch}=useBooking()
  
 
    useEffect(()=>{
        // console.log(cards)
    const selectedCard = cards.find(card => card.isDefault);
    if (selectedCard) {
      dispatch({type:"SET_CURRENT_CARD",payload:selectedCard})
      setSelectedCardId(selectedCard);
    }
    },[cards])

  const [formData1, setFormData1] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    cardType: '', // Added input for card type
    billingAddress: '', // Added input for billing address
    isDefault: false
  });

  useEffect(() => {
    getCards();
  }, [state]);

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
        setError(null)
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
        getCards()
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

 

  const handleSelect = (cardId) => {
    const selectedCard = cards.find(card => card.id === cardId);
    console.log(selectedCard)
    if (selectedCard) {
      dispatch({type:"SET_CURRENT_CARD",payload:selectedCard})
      setSelectedCardId(selectedCard);
    }
  };
  
  return (
    <div className="card-container" style={{display:"flex"}}>
      <div id="existing-card">
        <h2>Existing Cards</h2>
        {isLoadingAdd ? (
          <div>Loading...</div>
        ) : (
          <>
            {error && <div>{error}</div>}
            {cards.map((card) => (
              <div key={card.id} className={selectedCardId && parseInt(selectedCardId.id)===parseInt(card.id) ?  "card-item selected"  : "card-item" }  >
                <div>Card Number: {card.cardNumber}</div>
                <div>Card Holder Name: {card.cardHolderName}</div>
                <div>Expiration Date: {card.expirationDate}</div>
                <div>CVV: {card.cvv}</div>
                <div>Card Type: {card.cardType}</div> {/* Display card type */}
                <div>Billing Address: {card.billingAddress}</div> {/* Display billing address */}
                <button onClick={() => handleSelect(card.id)}>SELECT</button>
              </div>
            ))}
          </>
        )}
      </div>
      {showPayment && (
        <div>
            <h2>Add New Card</h2>
        <form id='card-form' onSubmit={handleAddSubmit}>
        <input
          type="number"
          name="cardNumber"
          value={formData1.cardNumber}
          onChange={handleChange1}
          placeholder="Card Number"
          maxLength={16} // Limit the input to 16 characters
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
            maxLength={3}
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
          {adderror ? <div className="error-messsage">{adderror}</div> : <></>}
          <button type="submit" disabled={isLoadingAdd}>Add Card</button>
        </form>
      </div>
  )}    

    </div>
  );
  

}
export default CardContainerForCheckout;