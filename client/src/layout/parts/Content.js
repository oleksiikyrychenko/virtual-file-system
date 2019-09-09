import React, { Component } from 'react';
import styled from 'styled-components';

const StyledContent = styled.div`
.content-wrapper{
    width: 100%;        
    display: flex;
}
`;

class Content extends Component {
    render() {
        return (
            <StyledContent>
                <div className="content-wrapper">
                    { this.props.children }
                </div>
            </StyledContent>
        );
    }
}

export default Content;
