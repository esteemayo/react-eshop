import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { smallest } from 'responsive';

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <Container>
      <Wrapper>
        <Title>404</Title>
        <Title>error</Title>
        <Heading>page not found</Heading>
        <SubHeading>
          the requested URL <ErrorText>"{pathname}"</ErrorText> was not found
        </SubHeading>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 85vh;

  ${smallest({ height: '50vh' })}
`;

const Wrapper = styled.div`
  text-align: center;
  text-transform: uppercase;
`;

const Title = styled.h1`
  display: black;
  font-weight: 300;
  font-size: 6.4rem;
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
  background-image: linear-gradient(to right, #08e4e4, #008080);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  @media only screen and (max-width: 43.75em) {
    font-size: 4.5rem;
    margin-bottom: 3px;
  }

  ${smallest({ fontSize: '4rem' })}
`;

const Heading = styled.h2`
  font-weight: 200;
  font-size: 3.2rem;
  letter-spacing: 3px;

  @media only screen and (max-width: 43.75em) {
    font-size: 2.5rem;
  }

  ${smallest({ fontSize: '2rem' })}
`;

const SubHeading = styled.h3`
  font-weight: 400;
  font-size: 1.6rem;
  letter-spacing: 3px;

  @media only screen and (max-width: 43.75em) {
    font-size: 1.3rem;
    letter-spacing: 1.5px;
  }

  ${smallest({ fontSize: '1rem' })}
`;

const ErrorText = styled.span`
  color: #ff0000;
  font-weight: 600;
`;

export default NotFound;
