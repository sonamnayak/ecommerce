import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {AiOutlineHeart, AiOutlineSearch} from 'react-icons/ai'
import {BsCart2} from 'react-icons/bs'

const Product = styled.div`
    height: 40vh;
    /* background-color: #e9f8f4; */
    background-color: #f2e6d2;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 15px;
`

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80%;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

// const CirContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     position: absolute;
// `

// const Circle = styled.div`
//     background-color: white;
//     border-radius: 50%;
//     z-index: 2;
//     width: 80%;
//     height: 80%;
// `

const Icons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0,0,0,0.2);
    opacity: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 15px;
    transition: all 0.5s ease;
    &:hover {
        opacity: 1;
    }
`

const IconItems = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    transition: all 0.5s ease;
    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const ProductsItems = ({item}) => {
  return (
    <Product>
        <ImgContainer>
            <Image src={item.img} />
        </ImgContainer>
        {/* <CirContainer>
            <Circle />
        </CirContainer> */}
        <Icons>
            <IconItems><BsCart2 size={24}/></IconItems>
            <StyledLink to = {`/product/${item._id}`}>
                <IconItems><AiOutlineSearch size={24}/></IconItems>
            </StyledLink>
            <IconItems><AiOutlineHeart size={24}/></IconItems>
        </Icons>
    </Product>
  )
}

export default ProductsItems