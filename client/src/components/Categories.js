import styled from 'styled-components';

import { categories } from 'data';
import { mobile } from 'responsive';
import CategoryItem from './CategoryItem';

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => {
        const { id } = item;
        return <CategoryItem key={id} {...item} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  ${mobile({
    flexDirection: 'column',
    padding: 0,
  })}
`;

export default Categories;
