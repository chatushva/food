// import React from 'react'
// import './Navbar.css'
// import {assets} from '../../assets/assets'
// const navbar = () => {
//   return (
//     <div className='navbar'>
//       <img className='logo'src={assets.logo} alt="" />
//       <img className='profile' src={assets.profile_image} alt="" />
//     </div>
//   )
// }

// export default navbar

import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt='Logo' />
      <img className='profile' src={assets.profile}  alt='Profile' />
    </div>
  );
};

export default Navbar;
