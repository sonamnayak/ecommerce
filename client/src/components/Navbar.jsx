import React from 'react'
import styled from 'styled-components'
import Badge from '@material-ui/core/Badge'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

import {HiShoppingCart} from 'react-icons/hi'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsCart2} from 'react-icons/bs'

const Nav = styled.div`
  height: 7vh;
  background-color: #055063;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
`

const Left = styled.div`
  color: white;
  padding-left: 25px; 
  margin: auto 0;
  flex: 1;
  display: flex;
  align-items: center;
`

const Center = styled.div`
  color: white;
  flex: 1;
  font-size: 18px;
  display: flex;
  align-items: center;
  align-content: center;
`

const Right = styled.div`
  color: white;
  padding-right: 10px;
  margin: auto 0;
  flex: 1;
  font-size: 18px;
  display: flex;
  justify-content: end;
`

const Logo = styled.div`
  color: white;
  text-decoration: none;
  font-size: 22px;
  padding-left: 7px;
  font-weight: 500;
`

const Search = styled.div`
  margin: auto;
  cursor: pointer;
`

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
  color: white;
  margin-right: 8px;
  background-color: transparent;
  border-bottom: 1.5px solid white;
  padding: 4px 8px;
  ::placeholder { 
  color: white;
  opacity: 1;
}
`

const MenuItem = styled.div`
  margin-right: 30px;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity)

  return (
    <Nav>
      <Left>
        <HiShoppingCart size={22} />
        <StyledLink to='/'>
          <Logo>SHOPSPREE</Logo>
        </StyledLink>
      </Left>
      <Center>
        <Search>
          <Input size={35} placeholder='Search here' />
          <AiOutlineSearch size={22} />
        </Search>
      </Center>
      <Right>
        <StyledLink to ='/register'>
          <MenuItem>
            REGISTER
          </MenuItem>
        </StyledLink>
        <StyledLink to ='/login'>
          <MenuItem>
            LOGIN
          </MenuItem>
        </StyledLink>
        <StyledLink to ='/cart'>
          <MenuItem>
            <Badge badgeContent={quantity} color='secondary' >
              <BsCart2 />
            </Badge>
          </MenuItem>
        </StyledLink>
      </Right>
    </Nav>
  )
}

export default Navbar