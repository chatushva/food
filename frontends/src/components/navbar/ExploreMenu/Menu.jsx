import React from 'react';
import './Menu.css';
import { menu_list } from '../../../assets/assets';

const Menu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">
        Explore our delicious menu and choose the items that make your mouth water.
        Whether you're in the mood for a quick snack, a hearty meal, or a sweet treat,
        we’ve got something for every craving. Simply scroll through the list, tap on your
        favorites, and build your perfect order. It’s fast, easy, and made to satisfy your taste buds!
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className='explore-item'
              onClick={() =>
                setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
              }
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
};

export default Menu;
