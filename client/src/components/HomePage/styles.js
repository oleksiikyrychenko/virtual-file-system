import styled from 'styled-components';
import homepageBg from '../../assets/homepage_bg.jpg';

const Styles = styled.div`
width: 100%;
.wrapper{
background: url(${homepageBg}) no-repeat;
width: 100%;
background-size: 100% 100%;
padding-top: 80px;
height: 850px;
}
.text-block{
    background: #b8b8b8;
    font-family: "Blogger Sans";
    text-transform: uppercase;
    font-size: 48px;
    width: 420px;
    height: 340px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    margin-left: 40vh; 
    margin-top: 12vh;
    border-radius: 4px;
}
.description-block{
    text-transform: uppercase;
    width: 100%;
    height: 400px;
    background: #d7d7d7;
    display: flex;
    flex-direction: column;
    padding: 50px 0 0 0;
    align-items: center;
    .description{
        font-size: 24px;
        font-family: "Blogger Sans";
        width: 720px;
        text-align: center;
    }
    .indent{
        margin-bottom: 50px;
    }
}

.paragraphs-block{
    display: flex;
    .single-paragraph{
        background: #7b7b7b;
        width: 280px;
        height: 50px;
        font-size: 18px;
        margin-right: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        &:last-child {
            margin-right: 0;
        }
    }
}
`;

export default Styles;
