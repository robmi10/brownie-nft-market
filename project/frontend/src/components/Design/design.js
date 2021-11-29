import styled from 'styled-components'
export const HomeContainer = styled.div`
    background: #0c0c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30x;
    height: 800;
    position: relative;
    z-index: 1;
`

export const HomeBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    --o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

export const TextH1 = styled.h1`
    color: #ffffff;
    font-size: 48;
    text-align: center;
    @media screen and (max-width: 768px){
        font-size: 40px;
    }

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`

export const TextP = styled.p`
    margin-top: 24px;
    color: #ffffff;
    font-size: 24;
    text-align: center;
    max-width: 600px;
    @media screen and (max-width: 768px){
        font-size: 24px;
    }

    @media screen and (max-width: 480px){
        font-size: 18px;
    }
`
export const ButtonWrapper = styled.div`
    background: #9765F4;
    margin-top: 32px;
    width: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
`
