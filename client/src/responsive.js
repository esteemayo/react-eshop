import { css } from 'styled-components';

export const smallest = (props) => {
  return css`
    @media only screen and (max-width: 17.5em) {
      ${props}
    }
  `;
};

export const small = (props) => {
  return css`
    @media only screen and (max-width: 22.5em) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 37.5em) {
      ${props}
    }
  `;
};

export const tabLand = (props) => {
  return css`
    @media only screen and (max-width: 56.25em) {
      ${props}
    }
  `;
};

export const tab = (props) => {
  return css`
    @media only screen and (max-width: 53.13em) {
      ${props}
    }
  `;
};

export const laptop = (props) => {
  return css`
    @media only screen and (min-width: 68.75em) {
      ${props}
    }
  `;
};
