import Color from 'colorjs.io';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { ClipboardIcon, ColorSets, ColorWheel, GitHubIcon, TexasIcon } from './components';
import { copyColorToClipboard, expandColor, generateFavicon, getContrastColor, isValidColor } from './utilities';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ backgroundColor }) => backgroundColor === 'black' ? 'white' : 'black'};
    font-family: sans-serif;
    margin: 0;
  }

  input {
    padding: 0;
    border: none;
    outline: none;
  }

  button {
    border: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const PageContainer = styled.div`
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const CopiedToClipboardMessage = styled.div`
  position: fixed;
  top: -100px;
  font-size: 14px;
  padding: 5px 10px;
  background-color: white;
  color: black;
  border: 2px solid black;
  opacity: 0;
  z-index: 1;
  transition: 0.3s;

  ${({ active }) => active && `
    opacity: 1;
    top: 0;
  `}
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const InputRow = styled.div`
  display: flex;
`;

const ColorInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  border-radius: 4px;
  border: 2px solid black;
`;

const IncrementInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 65px;
  border: 2px solid black;
`;

const ExpandButton = styled.button`
  color: ${({ contrastColor }) => contrastColor};
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
  margin-bottom: 50px;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    letter-spacing: 2px;
    transform: scale(1.1);
  }
`;

const BackgroundColorToggle = styled.div`
  position: absolute;
  top: 35px;
  right: 35px;
  cursor: pointer;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-top: auto;
  padding-top: 25px;
`;

const StyledTexasIcon = styled(TexasIcon)`
  margin-left: 5px;
  margin-right: 25px;
`;

const GitHubLink = styled.a`
  display: inline-flex;
  align-items: center;
`;

const StyledGitHubIcon = styled(GitHubIcon)`
  margin-left: 5px;
`;

export const App = () => {
  const [colorInput, setColorInput] = useState('#05f');
  const [increment, setIncrement] = useState(10);
  const [colorSets, setColorSets] = useState();
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('black');
  const formattedColorInput = colorInput[0] === '#' ? colorInput : '#' + colorInput;
  const handleColorInputChange = ({ target: { value } }) => setColorInput(value);
  const handleIncrementChange = ({ target: { value } }) => setIncrement(parseInt(value));
  const handleButtonClick = () => {
    const newColorSets = expandColor(colorInput, increment);
    setColorSets(newColorSets);
    generateFavicon(newColorSets.colorWheel[0]);
  };
  const handleColorClick = (color) => {
    copyColorToClipboard(color);
    setShowClipboardMessage(true);
    setTimeout(() => {
      setShowClipboardMessage(false);
    }, 3000);
  };
  const handleBackgroundColorToggle = () => {
    setBackgroundColor(backgroundColor === 'black' ? 'white' : 'black');
  }

  return (
    <>
      <GlobalStyles backgroundColor={backgroundColor} />
      <PageContainer>
        <CopiedToClipboardMessage active={showClipboardMessage}>Copied To Clipboard</CopiedToClipboardMessage>
        <Logo>Color Expander</Logo>
        <InputRow>
          <ColorInput onChange={handleColorInputChange} value={colorInput} />
          <IncrementInput onChange={handleIncrementChange} type="number" value={increment} />
        </InputRow>
        {isValidColor(colorInput) && <ExpandButton
          backgroundColor={new Color(colorInput)}
          contrastColor={getContrastColor(new Color(colorInput))}
          onClick={handleButtonClick}
        >
          Expand
        </ExpandButton>}
        <ColorWheel
          borderColor={backgroundColor}
          colorSets={colorSets?.colorWheel}
          handleColorClick={handleColorClick}
        />
        <ColorSets
          backgroundColor={backgroundColor}
          colorSets={colorSets?.primary}
          handleColorClick={handleColorClick}
          isInputColor={(color) => colorSets.colorWheel[0].distance(color) === 0}
          title="Primary"
        />
        <ColorSets
          backgroundColor={backgroundColor}
          colorSets={colorSets?.secondary}
          handleColorClick={handleColorClick}
          title="Secondary"
        />
        <ColorSets
          backgroundColor={backgroundColor}
          colorSets={colorSets?.tertiary}
          handleColorClick={handleColorClick}
          title="Tertiary"
        />
        <BackgroundColorToggle onClick={handleBackgroundColorToggle}>{backgroundColor === 'black' ? 'Light' : 'Dark'}</BackgroundColorToggle>
        <Footer>
          Made In<StyledTexasIcon fill={isValidColor(colorInput) ? new Color(colorInput) : backgroundColor === 'black' ? 'white' : 'black'} />
          <GitHubLink href="https://github.com/cstoddart/color-expander" target="_blank">
            View Source<StyledGitHubIcon fill={isValidColor(colorInput) ? new Color(colorInput) : backgroundColor === 'black' ? 'white' : 'black'} />
          </GitHubLink>
        </Footer>
      </PageContainer>
    </>
  );
}
