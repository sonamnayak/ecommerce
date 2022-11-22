import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import {GrAdd, GrSubtract} from 'react-icons/gr'
import {IoMdHeartEmpty} from 'react-icons/io'
import { useLocation } from "react-router-dom"
import { publicRequest } from "../requestMethods"
import { addProduct } from "../redux/cartRedux"
import { useDispatch } from "react-redux"

const Container = styled.div`
    padding-top: 10vh;
    display: flex;
`

const ImgContainer = styled.div`
    height: 86vh;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Image = styled.img`
    height: 100%;
`

const DescContainer = styled.div`
    flex: 1;
`

const Heading = styled.h1`
    font-size: 60px;
    font-weight: 400;
    margin-bottom: 30px;
    margin-top: 40px;
` 

const Price = styled.div`
    font-size: 30px;
    margin-bottom: 30px;
`

const Desc = styled.div`
    font-size: 24px;
    width: 70%;
    line-height: 40px;
    margin-bottom: 25px;
`

const Options = styled.div`
    display: flex;
    width: 60%;
    justify-content: space-between;
    font-size: 25px;
    margin-bottom: 30px;
`

const ColorContainer = styled.div`
    display: flex;
` 

const Color = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid black;
    margin-left: 10px;
    cursor: pointer;
`

const SizeContainer = styled.div`

`

const Select = styled.select`
    font-size: 18px;
    margin-left: 10px;
    padding: 6px 10px;
    cursor: pointer;
    outline: none;
`

const Option = styled.option`
    font-size: 18px;
    cursor: pointer;
`

const Quantity = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`

const Icon = styled.div`
    padding: 10px 15px;
    border: 1px solid #055063;
    cursor: pointer;
`

const Value = styled.div`
    margin: 0 20px;
    font-size: 22px;
`

const Buy = styled.div`
    display: flex;
    align-items: center;
`

const CartButton = styled.button`
    border: 1px solid #055063;
    padding: 10px 15px;
    font-size: 22px;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: 0.3s all ease;
    &:hover {
        background-color: #055063;
        color: white;
    }
`

const BuyNow = styled.button`
    border: 1px solid #055063;
    padding: 10px 15px;
    margin: 0 25px;
    font-size: 22px;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: 0.3s all ease;
    &:hover {
        background-color: #055063;
        color: white;
    }
`

const Wishlist = styled.button`
    font-size: 22px;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    transition: 0.3s all ease;
`

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
        try {
            const res = await publicRequest.get("/products/find/" + id);
            setProduct(res.data);
        } catch {}
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
        } else {
        setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        dispatch(
        addProduct({ ...product, quantity, color, size })
        );
    };
    return (
    <>
        <Navbar />
        <Container>
            <ImgContainer>
                <Image src={product.img} />
            </ImgContainer>
            <DescContainer>
                <Heading>{product.title}</Heading>
                <Price>{product.price}</Price>
                <Desc>{product.desc}</Desc>
                <Options>
                    <ColorContainer>
                        Color: 
                        {product.color?.map((c) => (
                            <Color color={c} key={c} onClick={() => setColor(c)} />
                        ))}
                    </ColorContainer>
                    <SizeContainer>
                        Size:
                        <Select onChange={(e) => setSize(e.target.value)}>
                            {product.size?.map((s) => (
                                <Option key={s}>{s}</Option>
                            ))}
                        </Select>
                    </SizeContainer>
                </Options>
                <Quantity>
                    <Icon><GrSubtract onClick={() => handleQuantity("dec")} /></Icon>
                    <Value>{quantity}</Value>
                    <Icon><GrAdd onClick={() => handleQuantity("inc")} /></Icon>
                </Quantity>
                <Buy>
                    <CartButton onClick={handleClick}>Add To Cart</CartButton>
                    <BuyNow>Buy Now</BuyNow>
                    <Wishlist>
                        <IoMdHeartEmpty size={40} />
                    </Wishlist>
                </Buy>
            </DescContainer>
        </Container>
        <Footer />
    </>
  )
}

export default Product