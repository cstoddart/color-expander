import styled from 'styled-components';

import { getContrastColor } from '../../utilities';
import { ClipboardIcon } from '../clipboardIcon';

const ColorWheelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 210px;
  width: 210px;
  margin-bottom: 50px;
`;

const ColorWheelCenter = styled.div`
  position: relative;
  height: 0;
  width: 0;
  z-index: 1;
`;

const wheelRadius = 80;
const colorRadius = 30;
/*
    a   /|
      /  |  b
    /____|
      c
*/
// 30-60-90 triangle trigonometry
const a = wheelRadius - colorRadius;
const b = (wheelRadius / 2) * Math.sqrt(3) - colorRadius;
const c = wheelRadius / 2 - colorRadius;

const ColorWheelColor = styled.div`
  position: absolute;
  height: ${colorRadius * 2}px;
  width: ${colorRadius * 2}px;
  background-color: ${({ color }) => color};
  border-radius: ${colorRadius}px;
  z-index: ${({ index }) => 0 - index};
  transition: 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 7px;
  border: 1px solid ${({ borderColor }) => borderColor};

  ${({ index }) => {
    return (
      index === 0 ? `
        bottom: ${a}px;
        right: -${colorRadius}px;
      ` : index === 1 ? `
        top: ${c}px;
        left: ${b}px;
      ` : index === 2 ? `
        top: ${c}px;
        right: ${b}px;
      ` : index === 3 ? `
        bottom: ${c}px;
        left: ${b}px;
      ` : index === 4 ? `
        top: ${a}px;
        right: -${colorRadius}px;
      ` : index === 5 ? `
        bottom: ${c}px;
        right: ${b}px;
      ` : index === 6 ? `
        bottom: ${b}px;
        left: ${c}px;
      ` : index === 7 ? `
        left: ${a}px;
        bottom: -${colorRadius}px;
      ` : index === 8 ? `
        top: ${b}px;
        left: ${c}px;
      ` : index === 9 ? `
        top: ${b}px;
        right: ${c}px;
      ` : index === 10 ? `
        right: ${a}px;
        bottom: -${colorRadius}px;
      ` : index === 11 ? `
        bottom: ${b}px;
        right: ${c}px;
      ` : null
    );
  }}

  &:hover {
    transform: scale(1.3);
    z-index: 12;
  }

  ${ClipboardIcon} {
    transform: scale(0.8) translateX(8px);
    align-self: center;
  }

  &:hover ${ClipboardIcon} {
    opacity: 1;
    visibility: visible;
  }
`;

const ColorLabel = styled.div`
  z-index: 1;
  color: ${({ color }) => color};
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s linear 0.1s;
  font-size: 10px;
  align-self: center;
  padding-bottom: 5px;
  letter-spacing: 0;

  ${ColorWheelColor}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;
  
export const ColorWheel = ({ borderColor, colorSets, handleColorClick }) => (
  <ColorWheelContainer>
    <ColorWheelCenter>
        {colorSets?.map((color, index) => (
          <ColorWheelColor key={index} borderColor={borderColor} color={color} index={index} onClick={() => handleColorClick(color)}>
            <ClipboardIcon color={getContrastColor(color)} backgroundColor={color} />
            <ColorLabel color={getContrastColor(color)}>{color.to('srgb').toString({ format: 'hex' })}</ColorLabel>
          </ColorWheelColor>
        ))}
    </ColorWheelCenter>
  </ColorWheelContainer>
);
