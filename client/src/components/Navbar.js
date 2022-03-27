import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';

import { logout } from 'redux/user';
import { mobile, small } from '../responsive';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search' />
            <Search style={{ color: 'gray', fontSize: '1.6rem' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to='/' className='nav__link'>
            <Logo>eShop</Logo>
          </Link>
        </Center>
        <Right>
          {!user && (
            <MenuItem>
              <Link to='/register'>Register</Link>
            </MenuItem>
          )}
          {!user && (
            <MenuItem>
              <Link to='/login'>Login</Link>
            </MenuItem>
          )}
          <MenuItem>{user && <Link to='#'>{user.username}</Link>}</MenuItem>
          {user && (
            <MenuItem>
              <Link to='#' onClick={handleLogout}>
                Logout
              </Link>
            </MenuItem>
          )}
          <MenuItem>
            <Link to='/cart'>
              <Badge badgeContent={quantity} color='primary'>
                <ShoppingCartOutlined style={{ fontSize: 16 }} />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 8rem;

  ${mobile({ height: '5rem' })}
`;

const Wrapper = styled.div`
  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: '1rem 0' })}
`;

const Left = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 1.6rem;
  color: #ffb900;
  cursor: pointer;

  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 3px;

  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  padding: 0.5rem;
`;

const Input = styled.input`
  border: none;
  caret-color: #008080;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: #bbb;
  }

  ${mobile({ width: '5rem' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  font-family: 'Great Vibes', cursive;
  color: #008b8b;

  ${mobile({
    fontSize: '2.8rem',
    display: 'flex',
    justifyContent: 'flex-end',
  })}

  ${small({ fontSize: '2.4rem' })}
`;

const Right = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${mobile({
    flex: 2,
    justifyContent: 'center',
  })}
`;

const MenuItem = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
  margin-left: 2.5rem;
  text-transform: uppercase;

  ${mobile({
    fontSize: '1.2rem',
    marginLeft: '1rem',
  })}
`;

export default Navbar;
