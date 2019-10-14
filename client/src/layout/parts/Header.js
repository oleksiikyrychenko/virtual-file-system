import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../../assets/icons/logo.png';
import {connect} from "react-redux";

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
    li{
        margin-left:  32px;
    }
    .link {
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
`;

class Header extends Component{

    getLinks = () => {
        const { isAuthenticated } = this.props;
        let defaultLinks = [
            { src: '/', title: 'Home', class: "home"},
            { src: '/login', title: 'Sign In', class: "signIn"},
            { src: '/register', title: 'Sign Up', class: 'signUp'}
        ];

        if(isAuthenticated){
            defaultLinks = [
                { src: '/', title: 'Home', class: "home"},
                { src: '/profile', title: 'Profile', class: "profile"},
                { src: '/dashboard', title: 'Dashboard', class: "dashboard"},
                { src: '/signOut', title: 'Sign Out', class: 'signOut', handler: () => console.log('work')}
            ];
        }

        return defaultLinks;
    };

    render() {
        return(
            <Styles>
                <div className={'logo'}>
                    <Link to={'/'}>
                        <img src={logo} className={'logo-img'} alt={'logo'}/>
                    </Link>
                </div>
                <ul className={'links'}>
                    {this.getLinks().map((link, index) => (
                        <li key={index}>
                            <Link to={`${link.src}`}>
                                <p className={`link ${link.class}`}>{link.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Styles>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, null)(Header);
