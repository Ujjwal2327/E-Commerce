import React from 'react'
import playstore from '../../assets/playstore.png'
import appstore from '../../assets/appstore.png'
import { NavLink } from 'react-router-dom'
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai'
import {FaLink} from 'react-icons/fa'
import logo from '../../assets/logo.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer id='footer'>

      <div className='left'>
        <h4>Download Our App</h4>
        <p>Download App for Android and ios mobile phone.</p>
        <img src={playstore} alt='playstore' />
        <img src={appstore} alt='appstore' />
      </div>

      <div className='mid'>
        <img src={logo} alt='CartXpress' />
        <p>Copyrights 2023 &copy; Ujjwal2327</p>
      </div>
      
      <div className='right'>
        <h4>Follow Us</h4>
        <NavLink to='https://www.linkedin.com/in/ujjwal-maheshwari-164886202/' target='_blank'>
          <AiFillLinkedin/>
        </NavLink>
        <NavLink to='https://github.com/ujjwal2327/' target='_blank'>
          <AiFillGithub/>
        </NavLink>
        <NavLink to='https://ujjwal-portfolio.onrender.com/' target='_blank'>
          <FaLink/>
        </NavLink>
      </div>

    </footer>
  )
}

export default Footer