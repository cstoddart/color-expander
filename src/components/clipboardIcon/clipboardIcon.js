import styled from 'styled-components';

export const ClipboardIcon = styled.div.attrs(({ backgroundColor }) => ({
  style: {
    color: `${backgroundColor}`,
  },
}))`
  position: relative;
  opacity: 0;
  transition: opacity 0.2s linear 0.1s;
  visibility: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    height: 8px;
    width: 6px;
    border: 1.5px solid ${({ color }) => color};
    border-radius: 1px;
  }

  &:before {
    top: 0px;
    right: 0px;
  }
  
  &:after {
    top: 3px;
    right: 3px;
    background-color: currentColor;
    outline: 0.5px solid currentColor;
  }
`;