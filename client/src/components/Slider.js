import { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';

import { sliderItems } from 'data';
import { mobile, tabLand } from '../responsive';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction='left' onClick={() => handleClick('left')}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => {
          const { id, img, desc, title } = item;
          return (
            <Slide bg='f5fafd' key={id}>
              <ImgContainer>
                <Image src={img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{title}</Title>
                <Description>{desc}</Description>
                <Button>Shop now</Button>
              </InfoContainer>
            </Slide>
          );
        })}
      </Wrapper>
      <Arrow direction='right' onClick={() => handleClick('right')}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

  @media only screen and (max-width: 41.69em) {
    height: 100%;
  }

  ${mobile({ display: 'none' })}
`;

const Arrow = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #fff7f7;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 10;
`;

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-ietms: center;
  background-color: #${(props) => props.bg};
  z-index: 2000;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 5rem;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: 7rem;

  ${tabLand({ fontSize: '3.5rem' })}
`;

const Description = styled.p`
  margin: 5rem 0;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 3px;

  ${tabLand({
    fontSize: '1.5rem',
    margin: '2.5rem 0',
  })}
`;

const Button = styled.button`
  display: block;
  padding: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  border: 1px solid #777;
  background-color: transparent;
  color: #777;
  border-radius: 3px;
  cursor: pointer;

  ${tabLand({ fontSize: '1.5rem' })}

  &:focus {
    outline: none;
  }
`;

export default Slider;
