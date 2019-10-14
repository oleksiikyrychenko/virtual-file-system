import { createGlobalStyle } from "styled-components";

const Styles = createGlobalStyle`
.ant-modal-body{
    background: #b8b8b8;
}
.tree-wrapper {
border: 4px solid;
    border-radius: 8px;
}
.tree-folder{
    display: flex;
    align-items: flex-start;
    .logo-wrapper{
        width: 20px;
        height: 16px;
        margin-right: 16px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
.footer-block{
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    .button{
        width: 250px;
        height: 30px;
        border-radius: 4px;
        border: none;
        font-size: 15px;
        padding: 0 15px;
        color: #ffffff;
        font-family: 'Blogger Sans Medium';
        cursor: pointer;
        transition: all .3s ease-in;
        &:disabled {
            background-color: #f4f5f7;
            color: #c1c7d0;
            cursor: not-allowed;
            transform: none;
        }
        &:focus {
            outline: none;
        }
        &:hover {
            transform: translateY(-1px);
        }
    }
    .button-done{
        background: #57d9a3;
    }
    .button-root {
        background: #2684FF;
    }
}
`;

export default Styles
