import React from 'react'
import styled from 'styled-components'
import { categoriesData } from '../data'
import CategoriesItems from './CategoriesItems'

const Conatiner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 70px;
  width: 100%;
  padding: 40px 40px;
`

const Categories = () => {
  return (
    <Conatiner>
      {  
        categoriesData.map((item) => (
            <CategoriesItems item={item} key={item.id} />
        ))
      }
    </Conatiner>
  )
}

export default Categories