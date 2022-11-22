import React from 'react'
import styled from 'styled-components'
import {IoMdSend} from 'react-icons/io'

const Container = styled.div`
    height: 30vh;
    width: 100%;
    margin: 20px 0;
`

const Heading = styled.h1`
    text-align: center;
    font-size: 60px;
    font-weight: 500;
    letter-spacing: 4px;
    margin-bottom: 50px;
`

const Subscribe = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    width: 25vw;
    height: 6vh;
    font-size: 20px;
    padding: 2px 10px;
    color: #055063;
    outline: none;
    border: 1.5px solid #055063;
    margin: 0 20px;
`

const Button = styled.button`
    color: white;
    background-color: #055063;
    border: none;
    padding: 13px;
    padding-left: 16px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const Newsletter = () => {
  return (
    <Container>
        <Heading>Subscribe to our NEWSLETTER :)</Heading>
        <Subscribe>
            <Input placeholder='Your Email' />
            <Button>
                <IoMdSend size={22} />
            </Button>
        </Subscribe>
    </Container>
  )
}

export default Newsletter