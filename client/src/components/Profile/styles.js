import styled from 'styled-components';

const Styles = styled.div`
padding-top: 80px;
background: #b8b8b8;
width: 100%;
height: 100vh;
.form-wrapper {
    height: calc(100vh - 80px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
h1{
    width: 380px;
    span {
        font-family: "Blogger Sans Light";
    }
}
`;

export default Styles;
