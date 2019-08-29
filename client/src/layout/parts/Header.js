import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 80px;
padding: 0 50px;
background: #000;
.logo {
    p{
        color: #fff;
        font-size: 45px;
    }
}
.links{
    list-style: none;
    display: flex;
    .signIn {
        margin-right: 30px;
        padding: 10px 0;
    }
    .signUp {
        background-color: #FFF;
        padding: 10px 30px;
        border-radius: 24px;
    }
}
`;

class Header extends Component{
    render() {
        const links = [
            { src: '/login', title: 'Sign In', class: "signIn"},
            { src: '/register', title: 'Sign Up', class: 'signUp'}
        ];

        return(
            <Styles>
                <div className={'logo'}>
                    <Link to={'/'}>
                        <p>VFS</p>
                    </Link>
                </div>
                <ul className={'links'}>
                    {links.map(link => (
                        <li className={link.class}>
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
