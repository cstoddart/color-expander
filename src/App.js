import React, { useState } from 'react';
import styled from 'styled-components';

import { expandColor } from './utilities';

const Input = styled.input``;

const Result = styled.div`
  width: 500px;
  height: 500px;
  background-color: #${({ color }) => color};
`;

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [colorSet, setColorSet] = useState([]);

  const handleChange = ({ target: { value } }) => setInputValue(value);
  const handleClick = () => {
    const { hashSymbol, ...hexCode } = inputValue;
    const colorHex = inputValue[0] === '#'
      ? hexCode
      : inputValue;
    if (colorHex.length === 3) {
      setColorSet(expandColor(`${colorHex[0]}${colorHex[0]}${colorHex[1]}${colorHex[1]}${colorHex[2]}${colorHex[2]}`));
    } else if (colorHex.length === 6) {
      setColorSet(expandColor(colorHex));
    }
    return;
  };

  return (
    <div>
      Color Expander
      <Input onChange={handleChange} value={inputValue} />
      <button onClick={handleClick}>Go</button>
      {colorSet.map((color) => <Result key={color} color={color} />)}
    </div>
  );
};
