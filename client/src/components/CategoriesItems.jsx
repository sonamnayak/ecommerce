import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Category = styled.div`
    color: white;
    height: 70vh;
    position: relative;
    transition: transform 0.5s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
    }
`

const Title = styled.h3`
    font-size: 40px;
    margin-bottom: 8px;
`

const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    width: 100%;
    object-fit: fill;
    height: 100%;
    opacity: 0.9;
`

const Button = styled.button`
    color: white;
    padding: 4px 7px;
    font-size: 20px;
    font-weight: 600;
    background-color: transparent;
    border: 2.5px solid #f7d5cf;
    cursor: pointer;
    &:hover {
        background-color: #f7d5cf;
    }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const CategoriesItems = ({item}) => {
  return (
    <StyledLink to = {`/product/${item.cat}`}>
        <Category>
            <Image src={item.img} />
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
        </Category>
    </StyledLink>
  )
}

export default CategoriesItems