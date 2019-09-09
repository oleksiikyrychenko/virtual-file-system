import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import logo from '../../assets/icons/logo.png';

const Styles = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 80px;
background: transparent;
position: absolute;
top: 0;
width: 100%;
.logo {
    margin-left: 80px;
    .logo-img {
        width: 70px;
        height: 44px;
    }
}
.links{
    list-style: none;
    display: flex;
    margin-right: 80px;
    .signIn, .signUp, .home {
        p {
            color: #41413F;
            font-family: 'Blogger Sans';
            font-size: 17px;
            text-transform: uppercase;
            border-bottom: 2px solid transparent;
            transition: all .3s ease-in;
            &:hover {
                border-bottom: 2px solid #41413F;
            }
        }
    }
    .signIn, .signUp {
        margin-left: 32px;
    }
}
`;

class Header extends Component{
    render() {
        const links = [
            { src: '/', title: 'Home', class: "home"},
            { src: '/login', title: 'Sign In', class: "signIn"},
            { src: '/register', title: 'Sign Up', class: 'signUp'}
        ];

        return(
            <Styles>
                <div className={'logo'}>
                    <Link to={'/'}>
                        <img src={logo} className={'logo-img'} alt={'logo'}/>
                    </Link>
                </div>
                <ul className={'links'}>
                    {links.map((link, index) => (
                        <li className={link.class} key={index}>
                            <Link to={`${link.src}`}>
                                <p>{link.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Styles>
        )
    }
}

export default withRouter(Header);
