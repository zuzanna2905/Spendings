import React from 'react';
import classes from './Footer.css'

const footer = () => {
  return (
    <div className={classes.Footer}>
        <p>Copyright: &#169;Zuzanna Pusiewicz</p>
        <ul>
            <li><a href="github.com">Github</a></li>
            <li><a href="facebook.com">Facebook</a></li>
            <li><a href="instagram.com">Instagram</a></li>
        </ul>
    </div>
  )
}

export default footer
