import styled from "styled-components";
import userIcon from '../../../assets/icons/user.png'
import passwordIcon from '../../../assets/icons/password.png'

const Styles =styled.div`
.form{
    display: flex;
    flex-direction: column;
.field{
        max-width: 380px;
        height: 68px;
        border: none;
        background: #c4c4c4;
        border-radius: 10px;
        text-align: center;
        font-family: "Blogger Sans Medium";
        font-size: 18px;
        padding: 0 60px;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 20px;
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
    .input-wrapper{
        position: relative;
    }
    .error{      
        position: absolute;
        bottom: 0;
        font-size: 12px;
        margin-left: 32px;
        color: red;
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
        margin-top: 30px;
    &:hover {
            transform: translateY(-3px);
        }
        &:focus {
            outline: none;
        }
    }
.field-email, .field-pass, .user-icon{
        background-image: url(${userIcon});
        background-repeat: no-repeat;
        background-position-x: 30px;
        background-position-y: center;
        box-sizing: border-box;
    }
.field-pass{
        background-image: url(${passwordIcon});
    }
.field-email, .user-icon{
        background-image: url(${userIcon});
    }
}
.not-valid{
    input {
       border: 1px solid red !important;
    }
}
`;

export default Styles
