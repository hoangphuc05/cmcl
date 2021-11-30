import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'

import { ButtonIcon, Button, ComparisonIcon, ApplicationsIcon, NumberedListIcon, UserIcon } from 'evergreen-ui';
import {FaUserGraduate} from 'react-icons/fa';
import {NavLink, Redirect, Link } from "react-router-dom";

import {Card, Divider, Space} from 'antd';
import 'antd/dist/antd.css';

import timeImage from '../img/time-vector.jpg';
import modules from '../img/modules.png';



import './home.css';
const {Meta} = Card;

class Home extends React.Component{

    render(){
        return (<>
        <div className="text-center">
            <h1>Hi</h1>
            <h4>What do you want to do?</h4>    
        </div>

        <Container>
            <Divider orientation="left">Learning content area</Divider>
            <Space size="middle">
                <Link to="/time-periods"><Button iconBefore={ComparisonIcon} size="large">Manage time periods</Button></Link>
                <Link to="/grades"><Button iconBefore={FaUserGraduate} size="large">Manage grades</Button></Link>
                <Link to="/modules"><Button iconBefore={ApplicationsIcon} size="large">Manage modules</Button></Link>
                <Link to="/questions"><Button iconBefore={NumberedListIcon} size="large">Manage questions</Button></Link>
            </Space>
        </Container>

        <Container>
            <Divider orientation="left">User area</Divider>
            <Space size="middle">
                <Button iconBefore={UserIcon} size="large">Student profile</Button>
            </Space>
        </Container>
            
        </>)
    }
}

export default Home;

