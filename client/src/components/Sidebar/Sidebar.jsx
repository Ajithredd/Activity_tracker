import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../Assets/logo.png';

const Sidebar = ({ name }) => {
  return (
    <div className='sb'>
      <body>
        <nav class="navbar">
          <div class="logo_item">
            <i class="bx bx-menu" id="sidebarOpen"></i>
            <img src={logo} alt="" className='sb-logo'></img>Be.productive
          </div>
          <div class="search_bar">
            <p>Welcome, {name}</p> {/* Displaying the name dynamically */}
          </div>
          <div class="navbar_content">
            <i class="bi bi-grid"></i>
            <i class='bx bx-sun' id="darkLight"></i>
            <i class='bx bx-bell' ></i>
            <img src="images/profile.jpg" alt="" class="profile" />
          </div>
        </nav>

        <nav class="sidebar">
          <div class="menu_content">
            <ul class="menu_items">
              <div class="menu_title menu_dahsboard"></div>

              <li class="item">
                <Link to='/Dashboard' className='linktag'>
                  <div href="/Dashboard" class="nav_link submenu_item">
                    <span class="navlink_icon">
                      <i class="bx bx-home-alt"></i>
                    </span>
                    <span class="navlink">Home</span>
                    <i class="bx bx-chevron-right arrow-left"></i>
                  </div>
                </Link>
               
              </li>

              

            </ul>
            <ul class="menu_items">
              <div class="menu_title menu_editor"></div>
              <li class="item">
                <Link to='/Analysis' className='linktag'>
                  <div href="/Analysis" class="nav_link submenu_item">
                    <span class="navlink_icon">
                      <i class="bx bx-grid-alt"></i>
                    </span>
                    <span class="navlink">Analysis</span>
                    <i class="bx bx-chevron-right arrow-left"></i>
                  </div>
                </Link>
               
              </li>
              <li class="item">
                <Link to='/Restrict' className='linktag'>
                  <a href="#" class="nav_link">
                    <span class="navlink_icon">
                      <i class="bx bxs-magic-wand"></i>
                    </span>
                    <span class="navlink">Restrict Sites</span>
                  </a>
                </Link>
              </li>


              <li class="item">
                <Link to='/Categorise' className='linktag'>
                  <a href="#" class="nav_link">
                    <span class="navlink_icon">
                      <i class="bx bx-filter"></i>
                    </span>
                    <span class="navlink">Categories Sites</span>
                  </a>
                </Link>
              </li>
              <li class="item">
                <Link to='/Limit' className='linktag'>
                  <a href="#" class="nav_link">
                    <span class="navlink_icon">
                      <i class="bx bx-cloud-upload"></i>
                    </span>
                    <span class="navlink">Set Time limits</span>
                  </a>
                </Link>
              </li>
              <li class="item">
              <Link to='/Report' className='linktag'>
                <a href="#" class="nav_link">
                  <span class="navlink_icon">
                    <i class="bx bx-medal"></i>
                  </span>
                  <span class="navlink">Generate Reports</span>
                </a>
                </Link>
              </li>
            </ul>
            <ul class="menu_items"> 
              <div class="menu_title menu_setting"></div>
              <li class="item">
                <a href="#" class="nav_link">
                  <span class="navlink_icon">
                    <i class="bx bx-flag"></i>
                  </span>
                  <span class="navlink">Feedback</span>
                </a>
              </li>
              
              <li class="item">
                <a href="#" class="nav_link">
                  <span class="navlink_icon">
                    <i class="bx bx-cog"></i>
                  </span>
                  <span class="navlink">Setting</span>
                </a>
              </li>
              <li class="item">
                <a href="#" class="nav_link">
                  <span class="navlink_icon">
                    <i class="bx bx-layer"></i>
                  </span>
                  <span class="navlink">Features</span>
                </a>
              </li>
            </ul>

            
          </div>
        </nav>

        <script src="script.js"></script>
      </body>
    </div>
  );
}

export default Sidebar;
