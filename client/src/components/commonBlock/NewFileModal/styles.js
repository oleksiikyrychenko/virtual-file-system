import { createGlobalStyle } from "styled-components";

const Styles = createGlobalStyle`
.ant-modal-body{
    background: #b8b8b8;
}
.new-file-form{
    display: flex;
    padding: 20px 0;
    flex-direction: column;
}
.row{
    display: flex;
    margin-bottom: 10px;
}
.title-field {
    flex: 1;
    height: 32px;
    border: 1px solid #2684FF;
    color: #2684FF; 
    padding: 0 20px;
    font-family: 'Blogger Sans Medium';
    background: #ffffff;
    &::placeholder{ 
    color: #2684FF;
    font-size: 15px;
        font-family: 'Blogger Sans Medium';
    }
    &:focus, &:active{
        outline: none;
    }
}
.contents-field{
    margin-bottom: 10px;
    border: 1px solid #2684FF;
    min-height: 200px;
    max-height: 500px;
    resize: vertical;
    color: #2684FF; 
    padding: 0 20px;
    font-family: 'Blogger Sans Medium';
    background: #ffffff;
    &::placeholder{ 
    color: #2684FF;
    font-size: 15px;
        font-family: 'Blogger Sans Medium';
    }
    &:focus, &:active{
        outline: none;
    }
}
.create-file-button{
    height: 32px;;
    border: none;
    background: #2684FF;
    color: #ffffff;
    font-size: 15px;
    font-family: 'Blogger Sans Medium';
    &:hover {
        cursor: pointer;
    }
}
.ant-select{
    flex: 1;
}
`;

export default Styles
