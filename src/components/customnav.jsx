import React from 'react';
import { getAuth, onAuthStateChanged  } from "firebase/auth";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {NavLink, Redirect } from "react-router-dom";

const auth = getAuth();


class CustomNav extends React.Component{
    constructor(props){
        
        super(props);
        this.state = {
            // user: auth.currentUser
            user: null
        }

    }
    componentDidMount(){
        
        onAuthStateChanged(auth, (user) => {
            if(user){
                this.setState({
                    user: user
                })
            } else {
                // window.location.assign('/login/');
            }
        })
        
        //get the user information and redirect if not signed in

        if (this.state.user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = this.state.user.displayName;
            const email = this.state.user.email;
            const photoURL = this.state.user.photoURL;
            const emailVerified = this.state.user.emailVerified;
          
            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            const uid = this.state.user.uid;
            alert("Signed in as", displayName)
        } else {
            // alert("not signed in");
            // <Redirect to={'/signin'}/>
        }
    }
    render(){
        return <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Carl Maxey Center for Learning</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/aboutus">About us</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {this.state.user?<NavDropdown title={this.state.user.displayName}>
                                <NavDropdown.Item href='#profile'>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#logout">Log out</NavDropdown.Item>
                            </NavDropdown>:<>Login</>}
                            
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    }
}

export default CustomNav;