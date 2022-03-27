import styled from 'styled-components';

import Slider from 'components/Slider';
import Products from 'components/Products';
import Categories from 'components/Categories';
import Newsletter from 'components/Newsletter';

const Home = () => {
  return (
    <Container>
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
    </Container>
  );
};

const Container = styled.div``;

export default Home;
