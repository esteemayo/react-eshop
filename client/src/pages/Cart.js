import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Add, Remove } from '@material-ui/icons';
import StripeCheckout from 'react-stripe-checkout';
import { useCallback, useEffect, useState } from 'react';

import { stripePayment } from 'services/stripeService';
import { laptop, mobile, small, smallest, tab } from 'responsive';

const Cart = () => {
  const { cart, total } = useSelector((state) => state.cart);
  const KEY = process.env.REACT_APP_STRIPE_KEY;

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  const makePayment = useCallback(async () => {
    try {
      const { data } = await stripePayment({
        tokenId: stripeToken.id,
        amount: total * 100,
      });

      navigate('/success', { state: data });
    } catch (err) {
      console.log(err);
    }
  }, [total, navigate, stripeToken]);

  useEffect(() => {
    stripeToken && total >= 1 && makePayment();
  }, [makePayment, stripeToken, total]);

  if (cart.length === 0) {
    return (
      <Container>
        <CartWrapper>
          <Title>Your cart is currently empty</Title>
        </CartWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Title>Your bag</Title>
        <Top>
          <TopButton>Continue shopping</TopButton>
          <TopTexts>
            <TopText>Shopping bag (2)</TopText>
            <TopText>Your wishlist (0)</TopText>
          </TopTexts>
          <TopButton type='filled'>Checkout now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.map((item) => {
              const { _id, img, size, price, color, title, quantity } = item;
              return (
                <>
                  <Product key={_id}>
                    <ProductDetail>
                      <Image src={img} alt={title} />
                      <Details>
                        <ProductName>
                          <strong>Product:</strong> {title}
                        </ProductName>
                        <ProductId>
                          <strong>Id:</strong> {_id}
                        </ProductId>
                        <ProductColor color={color} />
                        <ProductSize>
                          <strong>Size:</strong> {size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Add />
                        <ProductAmount>{quantity}</ProductAmount>
                        <Remove />
                      </ProductAmountContainer>
                      <ProductPrice>$ {price * quantity}</ProductPrice>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              );
            })}
          </Info>
          <Summary>
            <SummaryTitle>Order summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type='total'>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name='eShop'
              image='https://media.istockphoto.com/vectors/shopping-cart-line-icon-fast-buy-vector-logo-vector-id1184670036?k=20&m=1184670036&s=612x612&w=0&h=FpKQukhJ4X8WQkucHPbCqANJROKYB2v3k9ov3x-3vdI='
              billingAddress
              shippingAddress
              description={`Your total is $${total}`}
              amount={total * 100}
              currency='USD'
              stripeKey={KEY}
              token={onToken}
            >
              <Button>Checkout now</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 2rem;

  ${mobile({ padding: '1rem' })}
`;

const CartWrapper = styled.div`
  padding: 13rem;
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 3.2rem;
  text-align: center;
  text-transform: uppercase;

  ${mobile({ fontSize: '2.7rem' })}

  ${small({ fontSize: '2.5rem' })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;

  ${small({ padding: '0.8rem' })}
`;

const TopButton = styled.button`
  border: ${(props) =>
    props.type === 'filled' ? 'none' : '2px solid #008080'};
  background-color: ${(props) =>
    props.type === 'filled' ? '#000' : 'transparent'};
  color: ${(props) => (props.type === 'filled' ? '#fff' : '#008080')};
  display: inline-block;
  border-radius: 5px;
  padding: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s ease;

  ${mobile({
    border: css`
      ${(props) => props.type !== 'filled' && '1px solid currentColor'}
    `,
  })}

  ${small({
    fontWeight: 400,
    padding: '0.7rem',
  })}

  ${small({
    textTransform: 'capitalize',
  })}

  &:hover {
    background-color: ${(props) => props.type === 'filled' && '#333'};
    opacity: ${(props) => props.type === 'filled' && '0.8'};
  }

  &:focus {
    outline: none;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;

const TopText = styled.span`
  text-transform: capitalize;
  text-decoration: underline;
  font-size: 1.6rem;
  margin: 0 1rem;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 20rem;
  display: 'block';
  object-fit: cover;

  ${tab({ width: '15rem' })}

  ${mobile({ width: '10rem' })}

  ${smallest({
    width: '7rem',
    objectFit: 'contain',
  })}
`;

const Details = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 1.8rem;

  ${laptop({ fontSize: '1.7rem' })}

  ${mobile({ fontSize: '1.4rem' })}
`;

const ProductName = styled.span`
  text-transform: uppercase;

  b {
    text-transform: capitalize;
  }
`;

const ProductId = styled.span`
  b {
    text-transform: uppercase;
  }
`;

const ProductColor = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};

  ${mobile({
    width: '1.75rem',
    height: '1.75rem',
  })}
`;

const ProductSize = styled.span`
  text-transform: capitalize;
`;

const PriceDetail = styled.span`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProductAmount = styled.div`
  font-size: 2.4rem;
  margin: 0.5rem;

  ${laptop({ fontSize: '2.2rem' })}

  ${mobile({
    fontSize: '2rem',
    margin: '0.5rem 1.5rem',
  })}
`;

const ProductPrice = styled.div`
  font-size: 3rem;
  font-weight: 200;

  ${mobile({
    fontSize: '2.3rem',
    marginBottom: '2rem',
  })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 1rem;
  padding: 2rem;
  height: 50vh;

  @media only screen and (max-width: 68.75em) {
    height: 100%;
  }
`;

const SummaryTitle = styled.h1`
  text-transform: uppercase;
  font-size: 3.2rem;
  font-weight: 200;

  ${laptop({ fontSize: '2.5rem' })}

  ${tab({ fontSize: '2rem' })}

  ${mobile({
    fontSize: '2.5rem',
    textAlign: 'center',
  })}

  ${small({ fontSize: '2.3rem' })}
`;

const SummaryItem = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => (props.type === 'total' ? '2.4rem' : '1.6rem')};

  ${laptop({ margin: '2.5rem 0' })}

  ${tab({
    fontSize: css`
      ${(props) => (props.type === 'total' ? '2rem' : '1.48rem')}
    `,
  })}

  ${mobile({
    margin: '2.7rem 0',
    fontSize: css`
      ${(props) => (props.type === 'total' ? '2.2rem' : '1.45rem')}
    `,
  })}
`;

const SummaryItemText = styled.span`
  text-transform: capitalize;
`;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  border: none;
  width: 100%;
  padding: 1rem;
  display: block;
  border-radius: 5px;
  text-transform: uppercase;
  background-color: #000;
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: #333;
    letter-spacing: 2px;
  }

  &:focus {
    outline: none;
  }
`;

export default Cart;
