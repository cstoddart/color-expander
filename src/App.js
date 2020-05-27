import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { expandColor, formatHex } from './utilities';
import { GlobalStyles } from './globalStyles';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input``;

const Results = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ResultTooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  padding: 5px;
  box-shadow : 0 0 1px 1px rgba(0,0,0,0.1);
  z-index: 1;
  background-color: white;
  display: none;
`;
  
const StyledResult = styled.div.attrs(({ color }) => ({
  style: { background: `#${color}` },
}))`
  width: 100px;
  height: 100px;
  position: relative;

  &:hover ${ResultTooltip} {
    display: initial;
  }
`;

const Result = ({ color }) => (
  <StyledResult color={color}>
    <ResultTooltip>#{formatHex(color)}</ResultTooltip>
  </StyledResult>
);

function validateInput(input) {
  if (input.length !== 3 && input.length !== 6) return false;
  for (let i = 0; i < input.length; i++) {
    if (isNaN(parseInt(input[i], 16))) return false;
  }
  return true;
}

export const App = () => {
  const [inputValue, setInputValue] = useState('123456');
  const [primaryColorSetA, setPrimaryColorSetA] = useState([]);
  const [primaryColorSetB, setPrimaryColorSetB] = useState([]);
  const [primaryColorSetC, setPrimaryColorSetC] = useState([]);
  const [secondaryColorSetA, setSecondaryColorSetA] = useState([]);
  const [secondaryColorSetB, setSecondaryColorSetB] = useState([]);
  const [secondaryColorSetC, setSecondaryColorSetC] = useState([]);
  const [tertiaryColorSetA, setTertiaryColorSetA] = useState([]);
  const [tertiaryColorSetB, setTertiaryColorSetB] = useState([]);
  const [tertiaryColorSetC, setTertiaryColorSetC] = useState([]);
  const [tertiaryColorSetD, setTertiaryColorSetD] = useState([]);
  const [tertiaryColorSetE, setTertiaryColorSetE] = useState([]);
  const [tertiaryColorSetF, setTertiaryColorSetF] = useState([]);

  useEffect(() => {
    const [
      newPrimaryColorSetA,
      newPrimaryColorSetB,
      newPrimaryColorSetC,
      newSecondaryColorSetA,
      newSecondaryColorSetB,
      newSecondaryColorSetC,
      newTertiaryColorSetA,
      newTertiaryColorSetB,
      newTertiaryColorSetC,
      newTertiaryColorSetD,
      newTertiaryColorSetE,
      newTertiaryColorSetF,
    ] = expandColor('123456');
    setPrimaryColorSetA(newPrimaryColorSetA);
    setPrimaryColorSetB(newPrimaryColorSetB);
    setPrimaryColorSetC(newPrimaryColorSetC);
    setSecondaryColorSetA(newSecondaryColorSetA);
    setSecondaryColorSetB(newSecondaryColorSetB);
    setSecondaryColorSetC(newSecondaryColorSetC);
    setTertiaryColorSetA(newTertiaryColorSetA);
    setTertiaryColorSetB(newTertiaryColorSetB);
    setTertiaryColorSetC(newTertiaryColorSetC);
    setTertiaryColorSetD(newTertiaryColorSetD);
    setTertiaryColorSetE(newTertiaryColorSetE);
    setTertiaryColorSetF(newTertiaryColorSetF);
  }, []);

  const handleChange = ({ target: { value } }) => inputValue[0] === '#'
    ? setInputValue(value.substring(1))
    : setInputValue(value);

  const handleClick = () => {
    if (!validateInput(inputValue)) return;
    const colorHex = inputValue.length === 3
      ? `${inputValue[0]}${inputValue[0]}${inputValue[1]}${inputValue[1]}${inputValue[2]}${inputValue[2]}`
      : inputValue;
    const [
      newPrimaryColorSetA,
      newPrimaryColorSetB,
      newPrimaryColorSetC,
      newSecondaryColorSetA,
      newSecondaryColorSetB,
      newSecondaryColorSetC,
      newTertiaryColorSetA,
      newTertiaryColorSetB,
      newTertiaryColorSetC,
      newTertiaryColorSetD,
      newTertiaryColorSetE,
      newTertiaryColorSetF,
    ] = expandColor(colorHex);
    setPrimaryColorSetA(newPrimaryColorSetA);
    setPrimaryColorSetB(newPrimaryColorSetB);
    setPrimaryColorSetC(newPrimaryColorSetC);
    setSecondaryColorSetA(newSecondaryColorSetA);
    setSecondaryColorSetB(newSecondaryColorSetB);
    setSecondaryColorSetC(newSecondaryColorSetC);
    setTertiaryColorSetA(newTertiaryColorSetA);
    setTertiaryColorSetB(newTertiaryColorSetB);
    setTertiaryColorSetC(newTertiaryColorSetC);
    setTertiaryColorSetD(newTertiaryColorSetD);
    setTertiaryColorSetE(newTertiaryColorSetE);
    setTertiaryColorSetF(newTertiaryColorSetF);
    return;
  };

  const handleKeyDown = ({ key }) => key === 'Enter' && handleClick();

  return (
    <StyledApp>
      <GlobalStyles />
      Color Expander
      <Input onChange={handleChange} value={inputValue} onKeyDown={handleKeyDown} />
      <button onClick={handleClick}>Go</button>
      Primary
      {!!primaryColorSetA.length && (
        <Results>
          {primaryColorSetA.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!primaryColorSetB.length && (
        <Results>
          {primaryColorSetB.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!primaryColorSetC.length && (
        <Results>
          {primaryColorSetC.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      Secondary
      {!!secondaryColorSetA.length && (
        <Results>
          {secondaryColorSetA.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!secondaryColorSetB.length && (
        <Results>
          {secondaryColorSetB.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!secondaryColorSetC.length && (
        <Results>
          {secondaryColorSetC.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      Tertiary
      {!!tertiaryColorSetA.length && (
        <Results>
          {tertiaryColorSetA.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!tertiaryColorSetB.length && (
        <Results>
          {tertiaryColorSetB.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!tertiaryColorSetC.length && (
        <Results>
          {tertiaryColorSetC.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!tertiaryColorSetD.length && (
        <Results>
          {tertiaryColorSetD.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!tertiaryColorSetE.length && (
        <Results>
          {tertiaryColorSetE.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
      {!!tertiaryColorSetF.length && (
        <Results>
          {tertiaryColorSetF.map((color) => <Result key={color} color={color} />)}
        </Results>
      )}
    </StyledApp>
  );
};
