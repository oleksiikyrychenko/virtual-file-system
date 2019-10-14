import styled from "styled-components";

const Styles = styled.div`
.edit-input{
    width: 80px;
    border: 1px solid;
    padding-left: 5px;
    border-radius: 2px;
    &:focus{
        outline: none;
    }
}
.edit-enabled{
    background: #ffffff;
    border-radius: 8px;
    transition: all 0.3s ease-in;
    .control-block {
        display: flex;
    }
}
.folder, .file {
    display: flex;
    flex-direction: column;
    width: 100px;
    align-items: center;
    height: 120px;
    justify-content: center;
    border-radius: 8px;
    position: relative;
    &:hover{
        cursor: pointer;
        background: #ffffff;
        border-radius: 8px;
        transition: all 0.3s ease-in;
        .control-block {
            display: flex;
        }
    }
}
.control-block{
    display: none;
    position: absolute;
    top: 4px;
    width: 100%;
    justify-content: space-around;
}
.delete-icon, .rename-icon, .copy-icon, .cut-icon{
    width: 16px;
    height: 16px;
    img{
        width: 100%;
        height: 100%;
    }
}

.file-icon {
    width: 50px;
    margin-top: 10px;
}
`;

export default Styles
