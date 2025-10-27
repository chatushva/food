import React from 'react'
import './Fotter.css'
import { assets } from '../../assets/assets'

const Fotter = () => {
  return (
    <div className='fotter' id='fotter'>
        <div className="fotter-content">
        <div className="fotter-content-left">
            <img src={assets.logo} className="img"alt="" />
            <p>"Savor the flavors of every bite—where freshness meets perfection liciously crafted dishes to satisfy your every craving."</p>
             <div className="fotter-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
             </div>
        </div>
        <div className="fotter-content-center">
           <h2>COMPANY</h2>
           <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
           </ul>
        </div>
        <div className="fotter-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-22-432-543</li>
                <li>yummi@gmail.com</li>
            </ul>
        </div>
        </div>
        <hr/><p className='fotter-copy-rights'>copyrights 2025 @ Yummi.com -All Right Reserved</p>
        
    </div>
  )
}

export default Fotter