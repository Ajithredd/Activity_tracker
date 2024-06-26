import React from 'react';
//import '../../Stylesheets/Tailwind.css'
import './Button.css';

const Button = ({mode}) => {
  return (
   <div className='btn-cmp'>
    <button class="relative custom-button">
  <div class="circle circle-1"></div>
  <div class="circle circle-2"></div>
  <div class="circle circle-3"></div>
  <div class="circle circle-4"></div>
  <div class="circle circle-5"></div>
  <p class="button-text">{mode}</p>
</button>

   </div>


   
  )
}

export default Button
