import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'

const KEY = process.env.STRIPE_PK;

const Container = styled.div`
  width: 100%;
  padding-left: 40px;
  padding-right: 50px;
`

const Heading = styled.h1`
  padding-top: 10vh;
  font-size: 60px;
  font-weight: 500;
  letter-spacing: 3px;
  margin-bottom: 30px;
`

const Options = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  padding: 12px 20px;
  font-size: 18px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  transition: 0.3s all ease;
  border: 1px solid black;
  &:hover {
    color: black;
    background-color: transparent;
    border: 1px solid black;
  }
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const Products = styled.div`
  flex: 1.25; 
`

const Order = styled.div`
  flex: 0.75;
`

const Product = styled.div`
  display: flex;
  height: 50vh;
  margin-bottom: 30px;
  justify-content: space-evenly;
`

const Image = styled.img`
  width: 30%;
`

const Desc = styled.div`
  
`

const Name = styled.div`
  font-size: 26px;
  font-weight: 500;
  padding-bottom: 30px;
`

const Detail = styled.div`
  font-size: 22px;
  padding-bottom: 15px;
`

const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid black;
  margin-bottom: 15px;
`

const Summary = styled.div`
  border: 1px solid black;
  width: 70%;
  padding: 10px 20px;
`

const Title = styled.div`
  font-size: 26px;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 400;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <>
      <Navbar />
      <Container>
        <Heading>CART</Heading>
        <Options>
          <Button>Continue Shopping</Button>
          <Button>Check Wishlist</Button>
        </Options>
        <Wrapper>
          <Products>
          {cart.products.map((product) => (
            <Product>
              <Image src={product.img} />
              <Desc>
                <Name>{product.title}</Name>
                <Detail><b>Size:</b> {product.size}</Detail>
                <Color color={product.color} />
                <Detail><b>Quantity:</b> {product.quantity}</Detail>
                <Detail><b>$ {product.price}</b></Detail>
              </Desc>
            </Product>
          ))}
          </Products>
          <Order>
            <Summary>
              <Title>Order Summary</Title>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Lama Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Order>
        </Wrapper>
      </Container>
      <Footer />
    </>
    
  )
}

export default Cart