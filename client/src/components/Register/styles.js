import styled from 'styled-components';
import bg from '../../assets/register_bg.jpg'

const Styles = styled.div`
padding-top: 80px;
background: url(${bg}) no-repeat;
width: 100%;
background-size: cover;
height: 100vh;
.title-block{
    h1 {
        text-transform: uppercase;
        font-size: 50px;
        letter-spacing: 3px;
        color: #000000;
        text-align: center;
        margin-bottom: 24px;
    }
    p {
        font-size: 30px;
        font-family: "Blogger Sans Medium";
        color: #000000;
        opacity: 0.7;
        text-transform: uppercase;
        text-align: center
        margin-bottom: 50px;
        letter-spacing: 1.5px;
    }
}
.form-wrapper{
    display: flex;
    flex-direction: column;
    width: 380px;
    margin: 15vh 20vh 0 auto;
}
}
`;

export default Styles;
