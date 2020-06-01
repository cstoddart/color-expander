import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { expandColor, formatHex, validateBlackContrast } from './utilities';
import { GlobalStyles } from './globalStyles';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 25px;
`;

const Input = styled.input``;

const ResultsGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & + & {
    margin-top: 25px;
  }
`;

const ResultsGroupTitle = styled.div`
  color: white;
`;

const Results = styled.div`
  display: flex;
  align-items: center;
`;

const ResultTooltip = styled.div`
  letter-spacing: 0.5px;
  z-index: 1;
  color: ${({ color }) => color};
  opacity: 0;
  visibility: hidden;
  padding: 10px;
  transition: opacity 0.2s linear 0.1s;
`;
  
const StyledResult = styled.div.attrs(({ color }) => ({
  style: { background: `#${color}` },
}))`
  flex: 1;
  height: 100px;
  min-width: 0;
  position: relative;
  transition: 0.3s;
  display: flex;
  align-items: flex-end;

  &:hover {
    min-width: 100px;
    border: ${({ contrastColor }) => `
      2px solid ${contrastColor}
    `};
  }

  &:hover ${ResultTooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const Result = ({ color }) => {
  const contrastColor = validateBlackContrast(color) ? 'black' : 'white';
  return (
    <StyledResult color={color} contrastColor={contrastColor}>
      <ResultTooltip color={contrastColor}>#{formatHex(color)}</ResultTooltip>
    </StyledResult>
  );
};

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
      <ResultsGroup>
        <ResultsGroupTitle>Primary</ResultsGroupTitle>
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
      </ResultsGroup>
      <ResultsGroup>
        <ResultsGroupTitle>Secondary</ResultsGroupTitle>
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
      </ResultsGroup>
      <ResultsGroup>
        <ResultsGroupTitle>Tertiary</ResultsGroupTitle>
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
      </ResultsGroup>
    </StyledApp>
  );
};
