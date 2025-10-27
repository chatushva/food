import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const total = getTotalCartAmount();
  const delivery = total === 0 ? 0 : 2;
  const grandTotal = total + delivery;

  return (
    <div>
      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item) => (
            cartItems[item._id] > 0 && (
              <div key={item._id}>
                <div className="cart-items-title cart-items-cart">
                  <img src={`${url}/image/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)} className='cross'>X</button>
                </div>
                <hr />
              </div>
            )
          ))}
        </div>
      </div>

      <div className="cart-buttom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${total}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>${delivery}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${grandTotal}</b>
            </div>
            <hr />
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="promo-input">
              <input type="text" placeholder='Promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;


