import React, { Component } from 'react';
import styled from "styled-components";
import copyrightIcon from '../../assets/icons/copyright.png'

const Styles = styled.div`
width: 100%;
height: 70px;
background: #3b3b3b;
display: flex;
justify-content: center;
.copyright {
    font-size: 14px;
    display: flex;
    align-items: center;
    .copyright-icon{
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
}
`;

class Footer extends Component{
    render() {
        return(
            <Styles>
                <div className={'copyright'}>
                    <img src={copyrightIcon} className={'copyright-icon'} alt={'copyright'}/>
                    2019
                </div>
            </Styles>
        )
    }
}

export default Footer
