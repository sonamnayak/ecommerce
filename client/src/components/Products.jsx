import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { productsData } from '../data'
import ProductsItems from './ProductsItems'
import axios from 'axios'

// const Heading = styled.h1`
//     font-size: 5.5rem;
//     text-align: center;
//     font-weight: 500;
//     letter-spacing: 4px;
// `

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 50px;
    width: 100%;
    padding: 40px 40px;
`

const Products = ({cat, filters, sort}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
  
    useEffect(()=>{
      const getProducts = async () => {
          try {
              const res = await axios.get(cat? `http://localhost:2000/api/product?category=${cat}` : "http://localhost:2000/api/product")
              setProducts(res.data)
          } catch (error) {
              console.log(error)
          }
      }
      getProducts()
    }, [cat])    
  
    useEffect(() => {
      cat && setFilteredProducts(
          products.filter((item) => 
              Object.entries(filters).every(([key, value]) =>
                  item[key].includes(value)
          ))
      )
    }, [products, cat, filters])

    useEffect(() => {
        if (sort === "Newest") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
          );
        } else if (sort === "Low to high") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
          );
        } else {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
          );
        }
      }, [sort]);

    return (
        <>
            <Container>
                {cat
                    ? filteredProducts.map(item => <ProductsItems item={item} key={item.id} />)
                    : productsData
                        .slice(0, 8)
                        .map((item) => <ProductsItems item={item} key={item.id} />)
                }
            </Container>
        </>
    )
    }

export default Products
