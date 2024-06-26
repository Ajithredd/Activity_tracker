import React, { useState } from 'react';
import '../Stylesheets/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import axios from '../utils/axios';


const Login = ({ setIsAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', {
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      setIsAuth(true);
      setMessage('Logged in successfully');
      navigate('/dashboard'); // Redirect to the dashboard on success
    } catch (err) {
      console.error(err.response.data);
      setMessage('Failed to login - wrong credentials');
    }
  };

  return (
    <div>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
          <title>Sign in & Sign up Form</title>
        </head>
        <body>
          <div className="ln-container">
            <div className="ln-forms-container">
              <div className="ln-signin-signup">
                <form className="ln-sign-in-form" onSubmit={onSubmit}>
                  <h2 className="ln-title">Sign in</h2>
                  <div className="ln-input-field">
                    <i className="fas fa-user"></i>
                    <input
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="ln-input-field">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
                  </div>
				  <Button mode="Login"/>
                  <p className="ln-social-text">
                    <Link to='/'>Sign up</Link>
                  </p>
                </form>
                <p className="message">{message}</p>
              </div>
            </div>
            <div className="ln-panels-container">
              <div className="ln-panel ln-left-panel">
                <div className="ln-content">
                  <h3>Wanna be productive in life?</h3>
                  <p>
                    Discover a world of possibilities! Join us and explore a vibrant
                    community where ideas flourish and connections thrive.
                  </p>
				  <button className="ln-btn transparent" id="ln-sign-up-btn">
                                    <Link to='/Signup' className='ln-link'>
                                        <div className='ln-snbtn'>Sign Up</div>
                                    </Link>
                                </button>
                   
                 
                </div>
                <img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="ln-image" alt="" />
              </div>
              <div className="ln-panel ln-right-panel"></div>
            </div>
          </div>
        </body>
      </html>
    </div>
  );
}

export default Login;
