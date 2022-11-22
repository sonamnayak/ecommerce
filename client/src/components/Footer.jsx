import React from 'react'
import styled from 'styled-components'
import {AiOutlineMail, AiOutlineFacebook, AiOutlineInstagram} from 'react-icons/ai'
import {ImPinterest2} from 'react-icons/im'
import {IoLocationOutline, IoCallOutline, IoMailOutline} from 'react-icons/io5'

const Container = styled.div`
    display: flex;
    padding: 40px;
    background-color: #e9f9f5;
    margin-top: 40px;
`

const Left = styled.div`
    flex: 1;
    padding-left: 30px;
`

const Heading = styled.h1`
    width: 60%;
    margin-bottom: 25px;
    font-weight: 500;
`

const Desc = styled.div`
    width: 75%;
    font-size: 18px;
    margin: 40px 3px;

`

const Icons = styled.div`
    margin-top: 30px;
    cursor: pointer;
`

const Center = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    font-size: 18px;
`

const ListItem = styled.li`
    width: 50%;
    margin: 10px 0px;
    padding: 0px 20px 0 0;
    cursor: pointer;
`

const Right = styled.div`
    flex: 1;
    padding-left: 50px;
`

const Contact = styled.div`
    display: flex;
    margin: 30px 0;
`

const Link = styled.a`
    text-decoration: none;
    color: black;
    margin-left: 20px;
    font-size: 18px;
`

const Footer = () => {
  return (
    <Container>
        <Left>
            <Heading>
                SHOPSPREE
            </Heading>
            <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </Desc>
            <Icons>
                <AiOutlineMail size={30} style={{marginRight: 20}} />
                <AiOutlineFacebook size={30} style={{marginRight: 20}} />
                <AiOutlineInstagram size={30} style={{marginRight: 20}} />
                <ImPinterest2 size={27} style={{marginRight: 20}} />
            </Icons>
        </Left>
        <Center>
            <Heading>
                LINKS
            </Heading>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Orders</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Heading>CONTACT US</Heading>
            <Contact>
                <IoLocationOutline size={24} />
                <Link href='#'>210, New Dell Port, Portman</Link>
            </Contact>
            <Contact>
                <IoCallOutline size={24} />
                <Link href='mailto:shopspree@gmail.com'>shopspree@gmail.com</Link>
            </Contact>
            <Contact>
                <IoMailOutline size={24} />
                <Link href='call:9876543210'>9876543210</Link>
            </Contact>
        </Right>
    </Container>
  )
}

export default Footer