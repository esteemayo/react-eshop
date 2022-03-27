import {
  Facebook,
  Instagram,
  LinkedIn,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from '@material-ui/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { laptop, mobile, small, smallest, tab } from 'responsive';

const Footer = () => {
  const copyRightYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container>
        <Left>
          <Link to='/' className='footer__link'>
            <Logo>eShop</Logo>
          </Link>
          <Description>
            There are many variations of passages of lorem Ipsum available, but
            the majority have suffered alternation in some form, by injected
            humour, or randomised words which don't look even slightly
            believable.
          </Description>
          <SocialContainer>
            <SocialIcon color='3B5999'>
              <Facebook style={{ fontSize: '2rem' }} />
            </SocialIcon>
            <SocialIcon color='E4405F'>
              <Instagram style={{ fontSize: '2rem' }} />
            </SocialIcon>
            <SocialIcon color='55ACEE'>
              <Twitter style={{ fontSize: '2rem' }} />
            </SocialIcon>
            <SocialIcon color='E60023'>
              <Pinterest style={{ fontSize: '2rem' }} />
            </SocialIcon>
            <SocialIcon color='0A66C2'>
              <LinkedIn style={{ fontSize: '2rem' }} />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Woman Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>WishList</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ fontSize: '2rem', marginRight: '1rem' }} /> 622 Dixie
            path, south tobinchester 98336
          </ContactItem>
          <ContactItem>
            <Phone style={{ fontSize: '2rem', marginRight: '1rem' }} /> +1 234
            56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ fontSize: '2rem', marginRight: '1rem' }} />{' '}
            contact@esteemdesigns.dev
          </ContactItem>
          <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
        </Right>
      </Container>
      <CopyRight>
        <CopyRightText>
          © {copyRightYear} eShop. All Rights Reserved. Design by Emmanuel
          Adebayo&trade;
        </CopyRightText>
      </CopyRight>
    </FooterContainer>
  );
};

const FooterContainer = styled.div``;

const Container = styled.div`
  display: flex;

  ${tab({
    flexDirection: 'column',
  })}
`;

const Left = styled.div`
  flex: 1;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ${tab({
    padding: '0 8rem',
  })}

  ${mobile({ padding: '2rem' })}
`;

const Logo = styled.h1`
  font-size: 4.5rem;
  font-family: 'Great Vibes', cursive;
  color: #008b8b;

  ${mobile({ fontSize: '2.8rem' })}

  ${small({ fontSize: '2.4rem' })}
`;

const Description = styled.p`
  font-size: 1.5rem;
  margin: 2rem 0;

  ${mobile({
    fontSize: '1.35rem',
    margin: '1.5rem 0',
    letterSpacing: '1px',
  })}
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  color: var(--color-white);

  display: flex;
  justify-content: center;
  align-items: center;

  ${laptop({
    width: '3.5rem',
    height: '3.5rem',
  })}

  ${mobile({
    width: '3rem',
    height: '3rem',
  })}

  &:not(:last-of-type) {
    margin-right: 2rem;

    ${mobile({ marginRight: '1rem' })}
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 2rem;

  ${tab({
    padding: '3rem 7rem',
    margin: '0 auto',
  })}

  ${mobile({ display: 'none' })}
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 2rem;
  margin-bottom: 3rem;

  ${mobile({
    fontSize: '1.8rem',
    fontWeight: 400,
  })}
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  font-size: 1.5rem;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 2rem;

  ${tab({
    padding: '2rem 8rem',
  })}

  ${mobile({
    padding: '2rem',
    backgroundColor: '#fff8f8',
  })}
`;

const ContactItem = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  display: flex;
  align-items: center;

  ${mobile({ fontSize: '1.35rem' })}
`;

const Payment = styled.img`
  width: 50%;
`;

const CopyRight = styled.div``;

const CopyRightText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 2rem 0;

  ${tab({
    padding: '0 8rem',
  })}

  ${mobile({
    fontSize: '1.25rem',
    margin: '1.5rem 0',
  })}

  ${smallest({ fontSize: '1rem' })}
`;

export default Footer;
