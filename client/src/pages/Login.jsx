import React, { useState } from 'react'
import styled from 'styled-components'
import { login } from "../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux"

const Container = styled.div`
  width: 100vw;
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center; 
  background-image: url('images/r3.jpg');
  background-size: cover;
  background-repeat: no-repeat;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 40px;
`

const Heading = styled.h1`
  font-size: 60px;
  font-weight: 400;
  margin-bottom: 30px;
  letter-spacing: 3px;
  color: #055063;
`

const Form = styled.form` 
  width: 60%;
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-size: 16px;
  margin: 20px 0 10px 0;
  color: #055063;
`

const Input = styled.input`
  font-size: 22px;
  border: none;
  outline: none;
  border-bottom: 1px solid #055063;
  background-color: transparent;
`

const Button = styled.button`
  margin: 40px auto 30px auto;
  background-color: #055063;
  color: white;
  width: 30%;
  padding: 15px 0px;
  font-size: 20px;
  border: 1px solid #055063;
  outline: none;
  cursor: pointer;
  transition: 0.4s all ease;
  &:hover {
    background-color: white;
    color: black;
  }
`

const Register = styled.div`
  font-size: 20px;
`

const Span = styled.span`
  color: blue;
  cursor: pointer;
`

const Error = styled.span`
  color: red;
`;

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
        <Wrapper>
          <Heading>WELCOME BACK! LOGIN</Heading>
          <Form>
              <Label>EMAIL</Label>
              <Input type='email' placeholder='Enter your email...' />
              <Label>PASSWORD</Label>
              <Input type='password' placeholder='Enter your password...' />
              <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
              {error && <Error>Something went wrong...</Error>}
          </Form>
          <Register>Not an existing user? <Span>Click here to Register</Span></Register>
        </Wrapper>
    </Container>
  )
}

export default Login