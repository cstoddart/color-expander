import React, { useState, useEffect, useCallback, Fragment } from 'react';
import styled from 'styled-components';

import { expandColor, formatHex, validateBlackContrast } from './utilities';
import { GlobalStyles } from './globalStyles';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  position: relative;

  @media (max-width: 1000px) {
    paddin5: 25px;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const BackgroundColorToggle = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;
`;

const ColorInput = styled.input`
  padding: 15px;
  border: none;
  margin-bottom: 25px;
  background-color: white;
  color: black;
  border: 2px solid black;
`;

const BlendTypes = styled.div`
  display: flex;
`;

const BlendType = styled.div`
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ active }) => active
    ? 'var(--text-color)'
    : 'transparent'
  };
  color: ${({ active }) => active
    ? 'var(--background-color)'
    : 'var(--text-color)'
  };
`;

const ColorSets = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ColorSetTitle = styled.div`
  text-transform: capitalize;
  margin-top: 50px;
  margin-bottom: 25px;
  font-size: 18px;
`;

const ColorSet = styled.div`
  display: flex;
  align-items: center;
`;

const CopyToClipboardIcon = styled.div.attrs(({ backgroundColor }) => ({
  style: {
    color: `#${backgroundColor}`,
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
    border: 1px solid ${({ color }) => color};
    border-radius: 2px;
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

const Tooltip = styled.div`
  letter-spacing: 0.5px;
  z-index: 1;
  color: ${({ color }) => color};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s linear 0.1s;
  align-self: flex-start;
`;

// box-shadow added to address glitchy lines between elements after flex resizing
const Color = styled.div.attrs(({ color, isLast }) => ({
  style: {
    background: `#${color}`,
    boxShadow: isLast || `1px 0 0 0 #${color}`,
  },
}))`
  flex: 1;
  height: 100px;
  min-width: 0;
  position: relative;
  transition: min-width 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  border: ${({ contrastColor, isSelected }) => isSelected && `
    2px solid ${contrastColor}
  `};

  &:hover {
    min-width: 100px;
    border: ${({ contrastColor }) => `
      2px solid ${contrastColor}
    `};
  }

  &:hover ${CopyToClipboardIcon},
  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

function validateInput(input) {
  if (input.length !== 3 && input.length !== 6) return false;
  for (let i = 0; i < input.length; i++) {
    if (isNaN(parseInt(input[i], 16))) return false;
  }
  return true;
}

function generateFavicon(color) {
  const headElement = document.getElementsByTagName('head')[0];
  const oldFavicon = document.querySelector('link[rel="icon"]');
  if (oldFavicon) oldFavicon.remove();
  const faviconLink = document.createElement("link");
  faviconLink.rel = "icon";
  const faviconImage = document.createElement('canvas');
  faviconImage.width = 200;
  faviconImage.height = 200;
  const canvasContext = faviconImage.getContext('2d');
  canvasContext.beginPath();
  canvasContext.rect(0, 0, 200, 200);
  canvasContext.fillStyle = `#${color}`;
  canvasContext.fill();
  faviconLink.href = faviconImage.toDataURL();
  headElement.appendChild(faviconLink);
}

function copyColorToClipboard(color) {
  const newInput = document.createElement('input');
  newInput.value = `#${color}`;
  document.body.appendChild(newInput);
  newInput.select();
  document.execCommand('copy');
  newInput.remove();
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
  const [selectedColors, setSelectedColors] = useState([{ color: '123456', set: 'primaryA' }]);
  const [backgroundColor, setBackgroundColor] = useState('dark'); // dark \ light
  const [blendType, setBlendType] = useState('additive'); // additive | subtractive | average

  const updateColorSets = useCallback(() => {
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
    ] = expandColor(colorHex, blendType);
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
    setSelectedColors([{ color: colorHex, set: 'primaryA' }]);
    generateFavicon(colorHex);
  }, [blendType, inputValue])

  useEffect(() => {
    updateColorSets()
  }, [updateColorSets]);

  useEffect(() => {
    document.body.style.setProperty(
      '--background-color',
      backgroundColor === 'dark' ? 'black' : 'white',
    );
    document.body.style.setProperty(
      '--text-color',
      backgroundColor === 'dark' ? 'white' : 'black',
    );
  }, [backgroundColor]);

  const handleColorChange = ({ target: { value } }) => inputValue[0] === '#'
    ? setInputValue(value.substring(1))
    : setInputValue(value);

  const colorIsSelected = (color, set) => selectedColors.find((selectedColor) => (
    selectedColor.color === color && selectedColor.set === set
  ));

  const toggleBackgroundColor = () => setBackgroundColor(backgroundColor === 'dark' ? 'light' : 'dark');

  const blendTypes = [
    { id: 'additive', setFunction: () => setBlendType('additive'), label: 'Add'},
    { id: 'subtractive', setFunction: () => setBlendType('subtractive'), label: 'Subtract'},
    { id: 'average', setFunction: () => setBlendType('average'), label: 'Average'},
  ];

  const colorSets = [
    { id: 'primaryA', set: primaryColorSetA, group: 'primary' },
    { id: 'primaryB', set: primaryColorSetB, group: 'primary' },
    { id: 'primaryC', set: primaryColorSetC, group: 'primary' },
    { id: 'secondaryA', set: secondaryColorSetA, group: 'secondary' },
    { id: 'secondaryB', set: secondaryColorSetB, group: 'secondary' },
    { id: 'secondaryC', set: secondaryColorSetC, group: 'secondary' },
    { id: 'tertiaryA', set: tertiaryColorSetA, group: 'tertiary' },
    { id: 'tertiaryB', set: tertiaryColorSetB, group: 'tertiary' },
    { id: 'tertiaryC', set: tertiaryColorSetC, group: 'tertiary' },
    { id: 'tertiaryD', set: tertiaryColorSetD, group: 'tertiary' },
    { id: 'tertiaryE', set: tertiaryColorSetE, group: 'tertiary' },
    { id: 'tertiaryF', set: tertiaryColorSetF, group: 'tertiary' },
  ];

  return (
    <StyledApp>
      <GlobalStyles />
      <BackgroundColorToggle onClick={toggleBackgroundColor}>
        {backgroundColor === 'dark' ? 'Light' : 'Dark'}
      </BackgroundColorToggle>
      <Logo>Color Expander</Logo>
      <ColorInput onChange={handleColorChange} value={inputValue} />
      <BlendTypes>
        {blendTypes.map(({ id, setFunction, label }) => (
          <BlendType
            key={id}
            onClick={setFunction}
            active={blendType === id}
          >
            {label}
          </BlendType>
        ))}
      </BlendTypes>
      <ColorSets>
        {colorSets.map((colorSet, colorSetIndex) => (
          <Fragment key={colorSet.id}>
            {colorSet.group !== colorSets[colorSetIndex - 1]?.group && (
              <ColorSetTitle>{colorSet.group}</ColorSetTitle>
            )}
            <ColorSet>
              {colorSet.set.map((color, colorIndex) => (
                <Color
                  key={color}
                  color={color}
                  contrastColor={validateBlackContrast(color) ? 'black' : 'white'}
                  isSelected={colorIsSelected(color, colorSet.id)}
                  isLast={colorIndex === colorSet.length - 1}
                  onClick={() => copyColorToClipboard(color)}
                >
                  <CopyToClipboardIcon color={validateBlackContrast(color) ? 'black' : 'white'} backgroundColor={color} />
                  <Tooltip color={validateBlackContrast(color) ? 'black' : 'white'}>#{formatHex(color)}</Tooltip>
                </Color>
              ))}
            </ColorSet>
          </Fragment>
        ))}
      </ColorSets>
    </StyledApp>
  );
};
