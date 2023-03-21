import styled from 'styled-components';

import { getContrastColor } from '../../utilities';
import { ClipboardIcon } from '../clipboardIcon';

const ColorSetsContainer = styled.div`
  width: 100%;
  margin-bottom: 35px;
`;

const ColorSetsTitle = styled.div`
  text-transform: capitalize;
  margin-bottom: 15px;
  font-size: 18px;
`;

const ColorSet = styled.div`
  display: flex;
`;

const Color = styled.div.attrs(({ color }) => ({
  style: {
    backgroundColor: color.toString(),
  },
}))`
  border-radius: 3px;
  margin: 1px;
  flex: 1;
  height: 75px;
  transition: min-width 0.3s, transform 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  z-index: ${({ isInputColor }) => isInputColor && 1};
  outline: ${({ inputColorBorderColor, isInputColor }) => isInputColor && `
    2px solid ${inputColorBorderColor}
  `};
  min-width: 0;

  &:hover {
    min-width: 100px;
    transform: scale(1.1);
    z-index: 2;
    outline: ${({ contrastColor }) => `
      2px solid ${contrastColor}
    `};
  }

  &:hover ${ClipboardIcon}{
    opacity: 1;
    visibility: visible;
  }
`;

const ColorLabel = styled.div`
  letter-spacing: 0.5px;
  z-index: 1;
  color: ${({ color }) => color};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s linear 0.1s;
  align-self: flex-start;
  position: absolute;
  bottom: 10px;
  left: 10px;

  ${Color}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

export const ColorSets = ({
  backgroundColor,
  colorSets,
  handleColorClick,
  isInputColor = () => {},
  title,
}) => (
  <ColorSetsContainer>
    {colorSets && (
      <>
        <ColorSetsTitle>{title}</ColorSetsTitle>
        {colorSets.map((colorSet) => (
          <ColorSet key={colorSet[parseInt(colorSet.length / 2)].toString()}>
            {colorSet.map((color) => (
              <Color
                color={color}
                contrastColor={getContrastColor(color)}
                inputColorBorderColor={backgroundColor === 'black' ? 'white' : 'black'}
                isInputColor={isInputColor(color)}
                key={`${colorSet[parseInt(colorSet.length / 2)].toString()}_${color.toString()}`}
                onClick={() => handleColorClick(color)}
              >
                <ClipboardIcon color={getContrastColor(color)} backgroundColor={color} />
                <ColorLabel color={getContrastColor(color)}>{color.to('srgb').toString({ format: 'hex' })}</ColorLabel>
              </Color>
            ))}
          </ColorSet>
        ))}
      </>
    )}
  </ColorSetsContainer>
);
