import styled from 'styled-components';

const Styles = styled.div`
.folder-field{
    border: 2px solid #2684FF;
    border-radius: 25px;
    height: 30px;
    color: #2684FF; 
    width: 400px;
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
.folder-field-error{
    border: 2px solid red;
}
.add-folder-button, .add-file-button, .add-new-file {
    height: 30px;
    margin-left: 10px;
    border-radius: 4px;
    border: none;
    background: #2684FF;
    color: #ffffff;
    font-size: 15px;
    padding: 0 15px;
    font-family: 'Blogger Sans Medium';
    display: flex;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
}
.new-folder-form{
    display: flex;
    align-items: center;
}

.error{
    border:2px solid red;
    &::placeholder {
        color: red;
    }
}

 //***** ANT *****
.ant-upload-list {
    display: none;
}
`;

export default Styles;
