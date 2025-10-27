import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favorite food here</h2>
            <p>Our food ordering platform connects you to a wide range of restaurants and home chefs. Whether you're craving spicy biryani, cheesy pizza, or healthy salads, we deliver it fresh and fast to your doorstep.
           With a simple interface, real-time tracking, and secure payment options, satisfying your hunger has never been easier. Skip the line, avoid the wait — just order, sit back, and enjoy!</p>
          <button>View menu</button>
        </div>
    </div>
  )
}

export default Header