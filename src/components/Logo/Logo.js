import React from 'react';
import moneyLogo from '../../assets/images/logo.jpg';
import classes from './Logo.css';

const logo = () => {
  return  (
    <div className={classes.Logo}>
      <img src={moneyLogo} alt='My Money'/>
    </div>
  )
}

export default logo;