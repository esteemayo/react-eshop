import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import { registerUserAsync } from 'redux/user';
import { mobile, smallest, tabLand } from 'responsive';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { error, isFetching } = useSelector((state) => state.user);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const { username, email, password, passwordConfirm } = values;

          if (username && email && password && passwordConfirm) {
            const newUser = {
              ...values,
              img: downloadURL,
            };

            dispatch(registerUserAsync({ ...newUser }));
            navigate('/', { replace: true });
          }
        });
      }
    );
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form onSubmit={handleSubmit}>
          <FormContainer>
            <FormInput
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              required
              autoFocus
              value={values.name}
              onChange={handleChange}
            />
            <FormLabel htmlFor='username'>Name</FormLabel>
          </FormContainer>
          <FormContainer>
            <FormInput
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
              value={values.username}
              onChange={handleChange}
            />
            <FormLabel htmlFor='username'>Username</FormLabel>
          </FormContainer>
          <FormContainer>
            <FormInput
              type='email'
              id='email'
              name='email'
              placeholder='you@user.com'
              required
              value={values.email}
              onChange={handleChange}
            />
            <FormLabel htmlFor='email'>Email</FormLabel>
          </FormContainer>
          <FormContainer>
            <FormInput
              type='password'
              id='password'
              name='password'
              placeholder='********'
              required
              value={values.password}
              onChange={handleChange}
            />
            <FormLabel htmlFor='password'>Password</FormLabel>
          </FormContainer>
          <FormContainer>
            <FormInput
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              placeholder='********'
              required
              value={values.passwordConfirm}
              onChange={handleChange}
            />
            <FormLabel htmlFor='passwordConfirm'>Confirm password</FormLabel>
          </FormContainer>
          <FormContainer>
            <FormInput
              type='file'
              id='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <FormLabel htmlFor='file'>Image</FormLabel>
          </FormContainer>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button disabled={isFetching}>Create</Button>
          {error && <Error>Something went wrong...</Error>}
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
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;
  padding-top: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 64em) {
    height: 100%;
  }

  ${tabLand({ height: '110vh' })}

  @media only screen and (max-width: 57.19em) {
    height: 100%;
    padding: 3rem;
  }

  ${mobile({ height: '100vh' })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: 5px;
  -webkit-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);
  box-shadow: 0 2.5rem 8rem 2rem rgba(0, 0, 0, 0.06);

  ${tabLand({
    width: '65%',
    padding: '3rem',
  })}

  ${mobile({
    width: '85%',
    padding: '2rem',
  })}

  ${smallest({ width: '100%' })}
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 1rem;

  @media only screen and (max-width: 57.19em) {
    font-size: 1.7rem;
  }

  ${mobile({
    fontSize: '2rem',
    fontWeight: 400,
    marginBottom: '0.5rem',
    backgroundImage: 'linear-gradient(to right, #06dddd, #008080)',
    WebkitBackgroundClip: 'text !important',
    backgroundClip: 'text !important',
  })}

  ${smallest({ fontSize: '1.3rem' })}

  &::after {
    display: block;
    content: '';
    width: 25%;
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

    @media only screen and (max-width: 57.19em) {
      margin-bottom: 0.7rem;
    }

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

  @media only screen and (max-width: 57.19em) {
    font-size: 1rem;
  }

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

  @media only screen and (max-width: 57.19em) {
    padding: 1rem 2rem;
  }

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

const Agreement = styled.span`
  font-size: 1.4rem;

  ${mobile({
    fontSize: '1.25rem',
    letterSpacing: '1px',
    textAlign: 'left',
  })}

  ${smallest({
    fontSize: '1rem',
    letterSpacing: 0,
  })}
`;

const Button = styled.button`
  display: block;
  border: none;
  border-radius: 5px;
  width: 40%;
  font-size: 1.6rem;
  text-transform: uppercase;
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  background-color: #008080;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.5s ease;

  @media only screen and (max-width: 57.19em) {
    padding: 1rem 2rem;
  }

  ${mobile({
    width: '100%',
    fontSize: '1.3rem',
    padding: '1rem 2rem',
    marginTop: '1.5rem',
  })}

  ${smallest({
    width: '100%',
    fontSize: '1rem',
  })}

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

const Error = styled.span`
  color: #f00;
  font-size: 1.4rem;
  text-align: center;
  padding: 0.5rem;
`;

export default Register;
