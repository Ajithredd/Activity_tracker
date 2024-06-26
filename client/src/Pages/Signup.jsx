import React, { useEffect, useState } from 'react';
import '../Stylesheets/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import axios from '../utils/axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/register', {
                name,
                email,
                password
            });
            setMessage('Registered successfully');
            navigate('/dashboard'); // Navigate to the dashboard on success
        } catch (err) {
            console.error(err.response.data);
            setMessage('Failed to register, User already exists');
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
                                <h2 className="ln-title">Sign Up</h2>
                                <div className="ln-input-field">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
                                </div>
                                <div className="ln-input-field">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" placeholder="Email ID" name="email" value={email} onChange={onChange} required />
                                </div>
                                <div className="ln-input-field">
                                    <i className="fas fa-lock"></i>
                                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                                </div>
                                <Button mode="Sign Up"/>
                                <p className="ln-social-text">
                                    <Link to='/login'>Already a user? Login</Link>
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
                                    <Link to='/login' className='ln-link'>
                                        <div className='ln-snbtn'>Login</div>
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

export default Signup;
