import React, { useState } from 'react'
import styled from 'styled-components'
import {MdOutlineArrowBackIos, MdOutlineArrowForwardIos} from 'react-icons/md'
import {sliderData} from '../data'

const Container =  styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
    position: relative;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: white;
    opacity: 0.5;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${(props) => props.direction === "left" && "25px"};    
    right: ${(props) => props.direction === "right" && "25px"};
    cursor: pointer;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);    
`

const Slide = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background-color: #${props=>props.bg};
`

const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
`

const Image = styled.img`
    width: 70%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 85px;
    letter-spacing: 4px;
    font-weight: 500;
`

const Desc = styled.div`
    padding-top: 45px;
    font-size: 25px;
    letter-spacing: 3px;
`

const Desc2 = styled.div`
    padding: 20px 0 50px 0;
    font-size: 25px;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 9px 12px;
    font-size: 18px;
    background-color: transparent;
    border: 1.8px solid #055063;
    cursor: pointer;
    &:hover {
        background-color: #055063;
        color: white;
    }
`

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0)
  const handleClick = (direction) => {
    if(direction === "left") {
        console.log(slideIndex);
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    }
    else{
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  }

  return (
    <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <MdOutlineArrowBackIos />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {
                sliderData.map((item) => {
                    return (
                        <Slide bg={item.bg} key={item.id}>
                            <ImgContainer>
                                <Image src={item.img} />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                                <Desc2>{item.desc2}</Desc2>
                                <Button>SHOP NOW</Button>
                            </InfoContainer> 
                        </Slide>
                    )
                })
            }
        </Wrapper>
        <Arrow direction="right" onClick = {() => handleClick("right")}>
            <MdOutlineArrowForwardIos />
        </Arrow>
    </Container>
  )
}

export default Slider