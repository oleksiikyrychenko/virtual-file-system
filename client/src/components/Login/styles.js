import styled from 'styled-components';
import bg from '../../assets/register_bg.jpg'
import userIcon from '../../assets/icons/user.png'
import passwordIcon from '../../assets/icons/password.png'

const Styles = styled.div`
padding-top: 80px;
background: url(${bg}) no-repeat;
width: 100%;
background-size: cover;
height: calc(100vh - 80px);
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
        font-family: "Blogger Sans Medium"
        color: #000000;
        opacity: 0.7;
        text-transform: uppercase;
        text-align: center
        margin-bottom: 50px;
        letter-spacing: 1.5px;
    }
}
.login-form{
    display: flex;
    flex-direction: column;
    .field{
        width: 380px;
        height: 68px;
        border: none;
        background: #c4c4c4;
        border-radius: 10px;
        text-align: center;
        font-family: "Blogger Sans Medium";
        font-size: 18px;
        padding: 0 60px;
        &::placeholder {
            color: #000000;
            font-size: 18px;
            font-family: "Blogger Sans Medium";
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: center;
        }
        &:focus, &:active {
          outline: none;
        }
    }
    .submit-button{
        width: 380px;
        height: 68px;
        border-radius: 10px;
        border: none;
        background: #000000;
        color: #ffffff;
        font-size: 24px;
        font-family: "Blogger Sans Medium";
        text-transform: uppercase;
        transition: all .3s ease-in;
        cursor: pointer;
        &:hover {
          transform: translateY(-3px);
        }
    }
    .field-email, .field-pass{
        background-image: url(${userIcon});
        background-repeat: no-repeat;
        background-position-x: 30px;
        background-position-y: center;
        box-sizing: border-box;
    }    
    .field-pass{
        background-image: url(${passwordIcon});
        margin-bottom: 50px;
    }    
    .field-email{
        background-image: url(${userIcon});
        margin-bottom: 17px;
    }
}
.form-wrapper{
    display: flex;
    flex-direction: column;
    width: 380px;
    margin: 15vh 20vh 0 auto;
}
.field-wrapper{
  
}
}
`;

export default Styles;
