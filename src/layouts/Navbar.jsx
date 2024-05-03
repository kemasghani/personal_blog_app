import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import logo from '../assets/images/logo.svg';
import axios from 'axios'; // Import Axios
import '../App.css';

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const password = formData.get('password');
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
                email,
                password
            });
            console.log(response.data);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('isLoggedIn', true);
            handleCloseLogin();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const username = formData.get('username');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            // Check if passwords match
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Make a POST request to register endpoint
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
                username,
                email,
                password
            });

            // Handle the response data as needed
            console.log(response.data);
            handleCloseRegister();
        } catch (error) {
            console.error('Error registering:', error.message);
            // You can display an error message to the user or handle the error in other ways
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        window.location.reload()
    };
    return (
        <header className="header" data-header>
            <div className="container">
                <Link to="/" className="logo">
                    <img src={logo} width="119" height="37" alt="logo" />
                </Link>
                <nav className="navbar" data-navbar>
                    <div className="navbar-top">
                        <Link to="#" className="logo">
                            <img src={logo} width="119" height="37" alt="logo" />
                        </Link>
                        <button className="nav-close-btn" aria-label="close menu" data-nav-toggler>
                            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
                        </button>
                    </div>
                    <ul className="navbar-list">
                        {localStorage.getItem('userId') ? ( // Check if userId is not null
                            <>
                                <li>
                                    <Link to="/" className="navbar-link hover-1" data-nav-toggler>See all post</Link>
                                </li>
                                <li>
                                    <Link to="/organize" className="navbar-link hover-1" data-nav-toggler>Organize your post</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/" className="navbar-link hover-1" data-nav-toggler>See all post</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <p className="copyright-text">
                        Copyright 2022 © - Personal Blog Template.
                        Developed by codewithsadee
                    </p>
                </nav>
                <div className='buttonNav'>
                    {localStorage.getItem('userId') ? ( // Check if userId is not null
                        <Button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Link to="#" className="">
                                <Button variant="primary" onClick={handleShowLogin}>
                                    Login
                                </Button>
                            </Link>
                            <Link to="#" className="btn btn-primary" onClick={handleShowRegister}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <button className="nav-open-btn" aria-label="open menu" data-nav-toggler>
                    <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
                </button>
                {/* Login Modal */}
                <Modal show={showLogin} onHide={handleCloseLogin}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleLoginSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email' size='lg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='password' size='lg' />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="primary" type='submit' >
                                    Login
                                </Button>
                                <Button variant="secondary" onClick={handleCloseLogin}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Register Modal */}
                <Modal show={showRegister} onHide={handleCloseRegister}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleRegisterSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name='username' size='lg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email' size='lg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name='password' size='lg' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" name='confirmPassword' size='lg' />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseRegister}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" >
                                    Register
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </header>
    )
}

export default Navbar;
