import styled from 'styled-components';
import { Send } from '@material-ui/icons';

import { mobile, tabLand } from 'responsive';

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input type='email' placeholder='Your email' />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 57.19em) {
    height: 90vh;
  }

  ${tabLand({ height: '80vh' })}

  @media only screen and (max-width: 41.69em) {
    height: 75vh;
  }

  ${mobile({ height: '50vh' })}
`;

const Title = styled.h1`
  font-size: 7rem;
  margin: 2rem;

  ${mobile({
    fontSize: '5rem',
    fontWeight: 400,
    margin: '1rem',
  })}
`;

const Description = styled.div`
  font-size: 2.4rem;
  font-weight: 300;
  margin-bottom: 2rem;

  ${mobile({
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '1.2rem',
  })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 4rem;
  background-color: var(--color-white);
  border: 1px solid lightgray;

  display: flex;
  align-items: stretch;
  justify-content: space-between;

  ${mobile({ width: '80%' })}
`;

const Input = styled.input`
  flex: 8;
  font-family: inherit;
  border: none;
  padding-left: 2rem;
  caret-color: #008080;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #008080;
  color: var(--color-white);
  cursor: pointer;

  ${mobile({ flex: 2 })}
`;

export default Newsletter;
