import React, { useState } from 'react'
import Navbar from './../components/Navbar'
import Footer from './../components/Footer'
import Products from './../components/Products'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const  Heading= styled.div`
  padding-top: 10vh;
  padding-left: 30px;
  font-size: 50px;
  font-weight: 400;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  padding: 20px 30px;
`

const Filter = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
`

const FilterText = styled.div`
  margin-right: 15px;
`

const Select = styled.select`
  font-size: 16px;
  margin-right: 12px;
  padding: 8px;
  outline: none;
  cursor: pointer;
`

const Option = styled.option`
  font-size: 16px;
  cursor: pointer;
`

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("Newest")

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value, 
    })
  }

  return (
    <>
        <Navbar />
        <Heading>{cat}</Heading>
        <FilterContainer>
          <Filter>
            <FilterText>Product Filter: </FilterText>
            <Select name='color' onChange ={handleFilters}>
              <Option selected disabled>Color</Option>
              <Option>Black</Option>
              <Option>White</Option>
              <Option>Yellow</Option>
              <Option>Blue</Option>
              <Option>Grey</Option>
              <Option>Red</Option>
            </Select>
            <Select name='size' onChange={handleFilters}>
              <Option selected disabled>Size</Option>
              <Option>XXS</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort: </FilterText>
            <Select onChange={e => setSort(e.target.value)}>
              <Option selected disabled>Newest</Option>
              <Option>Low to high</Option>
              <Option>High to low</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} />
        <Footer />
    </>
  )
}

export default ProductList