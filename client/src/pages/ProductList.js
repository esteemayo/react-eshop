import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Products from 'components/Products';
import { mobile, tabLand } from 'responsive';
import Newsletter from 'components/Newsletter';

const ProductList = () => {
  const { pathname } = useLocation();
  const category = pathname.split('/')[2];

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({ ...filters, [e.target.name]: value });
  };

  return (
    <Container>
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products:</FilterText>
          <Select name='color' onChange={handleFilters}>
            <Option disabled defaultValue>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name='size' onChange={handleFilters}>
            <Option disabled defaultValue>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value='newest' defaultValue>
              Newest
            </Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} filters={filters} sort={sort} />
      <Newsletter />
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h1`
  text-transform: capitalize;
  font-size: 3.2rem;
  margin: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 2rem;

  ${tabLand({ margin: '0 1rem' })}

  ${mobile({
    margin: '0 2rem',
    display: 'flex',
    flexDirection: 'column',
  })}
`;

const FilterText = styled.span`
  font-size: 2rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-right: 2rem;

  ${tabLand({ marginRight: '1rem' })}

  ${mobile({ marginRight: 0 })}
`;

const Select = styled.select`
  padding: 1rem;
  margin-right: 2rem;
  color: currentColor;
  border: 1px solid currentColor;

  ${mobile({ margin: '1rem 0' })}

  &:focus {
    outline: none;
  }
`;

const Option = styled.option``;

export default ProductList;
