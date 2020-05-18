import React, { useState } from 'react';
import styled from 'styled-components';

import { expandColor, formatHex } from './utilities';
import { GlobalStyles } from './globalStyles';

const Input = styled.input``;

const Results = styled.div`
  display: flex;
  align-items: center;
  box-shadow : 0 0 1px 1px rgba(0,0,0,0.1);
`;
  
  const Result = styled.div`
  width: 100px;
  height: 100px;
  background-color: #${({ color }) => color};
  position: relative;
  margin: ${({ active }) => active && '10px'};

  &:hover:after {
    content: '#${({ color }) => formatHex(color)}';
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 10px;
    padding: 5px;
    box-shadow : 0 0 1px 1px rgba(0,0,0,0.1);
  }
`;

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [colorHex, setColorHex] = useState(null);
  const [colorSet, setColorSet] = useState([]);

  const handleChange = ({ target: { value } }) => setInputValue(value);
  const handleClick = () => {
    /* eslint-disable no-unused-vars */
    const [_, ...hexCode] = inputValue;
    const colorHex = inputValue[0] === '#'
      ? hexCode
      : inputValue;
    if (colorHex.length === 3) {
      const hexValue = `${colorHex[0]}${colorHex[0]}${colorHex[1]}${colorHex[1]}${colorHex[2]}${colorHex[2]}`;
      setColorSet(expandColor(hexValue));
      setColorHex(hexValue);
    } else if (colorHex.length === 6) {
      setColorSet(expandColor(colorHex));
      setColorHex(colorHex);
    }
    return;
  };

  return (
    <div>
      <GlobalStyles />
      Color Expander
      <Input onChange={handleChange} value={inputValue} />
      <button onClick={handleClick}>Go</button>
      {!!colorSet.length && (
        <Results>
          {colorSet.map((color) => <Result key={color} color={color} active={color === colorHex} />)}
        </Results>
      )}
    </div>
  );
};
