import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { loginUserAsync } from 'redux/user';
import { mobile, smallest, tabLand } from 'responsive';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, isFetching } = useSelector((state) => state.user);

  useEffect(() => {
    usernameRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const userData = {
      username,
      password,
    };

    if (username && password) {
      dispatch(loginUserAsync({ ...userData }));

      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
      // navigate('/', { replace: true });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <FormInput
              type='text'
              id='username'
              placeholder='Username'
              required
              ref={usernameRef}
            />
            <FormLabel htmlFor='username'>Username</FormLabel>
          </FormContainer>
          <FormContainer>
            <FormInput
              type='password'
              id='password'
              placeholder='********'
              required
              ref={passwordRef}
            />
            <FormLabel htmlFor='password'>Password</FormLabel>
          </FormContainer>
          <Button disabled={isFetching}>Login</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>Do not you remember the password?</Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  ${tabLand({ height: '110vh' })}

  @media only screen and (max-width: 57.19em) {
    height: 100%;
    padding: 3rem;
  }

  ${mobile({ height: '100vh' })}
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: 5px;
  -webkit-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
  box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);

  @media only screen and (max-width: 57.19em) {
    width: 80%;
  }

  ${tabLand({
    width: '65%',
    padding: '3rem',
  })}

  ${mobile({ width: '75%' })}

  ${smallest({ width: '100%' })}
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;

  ${mobile({
    fontSize: '2rem',
    fontWeight: 400,
    marginBottom: '0.5rem',
    backgroundImage: 'linear-gradient(to right, #06dddd, #008080)',
    WebkitBackgroundClip: 'text !important',
    backgroundClip: 'text !important',
  })}

  &::after {
    display: block;
    content: '';
    width: 15%;
    height: 3px;
    background-color: #008080;
    margin: 0 auto;

    ${mobile({ display: 'none' })}
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FormContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;

    ${mobile({ marginBottom: '0.5rem' })}
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #999;
  margin-left: 2rem;
  margin-top: 0.7rem;
  transition: all 0.5s ease;

  ${mobile({ fontWeight: 500 })}

  ${smallest({ fontSize: '1rem' })}
`;

const FormInput = styled.input`
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  color: #999;
  padding: 1.5rem 2rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  border-bottom: 3px solid transparent;
  background-color: #f9f9f9;
  caret-color: #008080;
  transition: all 0.5s ease;

  ${mobile({
    fontSize: '1.3rem',
    padding: '1.2rem 2rem',
  })}

  ${smallest({
    fontSize: '1rem',
    padding: '1rem',
  })}

  &:focus {
    outline: none;
    border-bottom: 3px solid #008080;
    -webkit-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    -moz-box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
    box-shadow: 0 1rem 2rem rgba(00, 00, 00, 0.1);
  }

  &:focus:invalid {
    border-bottom: 3px solid #ff7730;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  &:placeholder-shown + ${FormLabel} {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

const Button = styled.button`
  display: block;
  border: none;
  border-radius: 5px;
  width: 100%;
  font-size: 1.6rem;
  text-transform: uppercase;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  background-color: #008080;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.5s ease;

  ${mobile({
    fontSize: '1.3rem',
    padding: '1rem 2rem',
  })}

  ${smallest({ fontSize: '1rem' })}

  &:hover {
    -webkit-box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    -moz-box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    box-shadow: 0 1rem 2rem rgba($color-black, 0.25);
    letter-spacing: 2px;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 0.5rem 0;
  font-size: 1.4rem;
  text-decoration: none;

  ${mobile({ fontSize: '1.25rem' })}
`;

const Error = styled.span`
  color: #f00;
  font-size: 1.3rem;
`;

export default Login;
