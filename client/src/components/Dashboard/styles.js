import styled from 'styled-components';

const Styles = styled.div`
height: 100vh;
padding-top: 80px;
background: #b8b8b8;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
.folders-block{
    background: #7b7b7b;
    width: 90%;
    height: 700px;
    position: relative;
}
.folder-header{
    height: 50px;
    border-bottom: 1px solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.folder-name{
    font-size: 24px;
    font-family: 'Blogger Sans Medium';
    color: #ffffff;
}
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
.add-folder-button, .add-file-button {
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
.icon-container{
    width: 24px;
    height: 24px;
}
.new-folder-form{
    display: flex;
    align-items: center;
}
.folders {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 10px;
    min-height: calc(100% - 50px);
    align-content: flex-start;
    &:focus {
        outline: none;
    }
}

.no-data-block{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    p {
        font-size: 32px;
        width: 400px;
        text-align: center;
        color: #ffffff;
    }
}
.drag-active{
    background: #dadadab8;
    height: calc(100% - 50px);
    width: 100%;
    position: absolute;
    top: 49px;
    right: 0;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed;
} 
.drag-inactive{
    display: none;
} 
 //***** ANT *****
.ant-upload-list {
    display: none;
}
`;

export default Styles;
