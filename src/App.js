import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Input } from './components';

const Result = styled.div`
  width: 500px;
  height: 500px;
  background-color: #${({ color }) => color};
`;

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [colorHex, setColorHex] = useState('');
  const [lightColorSet, setLightColorSet] = useState([]);
  const [lightColorGenerationComplete, setLightColorGenerationComplete] = useState(false);
  const [darkColorSet, setDarkColorSet] = useState([]);
  const [darkColorGenerationComplete, setDarkColorGenerationComplete] = useState(false);

  const handleChange = ({ target: { value } }) => {
    console.log('HANDLE CHANGE...', );
    setInputValue(value);
    if (value[0] === '#') {
      const [hashSign, ...hexCode] = value;
      if (hexCode.length !== 3 && hexCode.length !== 6) return hashSign;
      setLightColorSet([]);
      setLightColorGenerationComplete(false);
      setDarkColorSet([]);
      setDarkColorGenerationComplete(false);
      setColorHex(hexCode);
    }
    if (value.length !== 3 && value.length !== 6) return;
    setLightColorSet([]);
    setLightColorGenerationComplete(false);
    setDarkColorSet([]);
    setDarkColorGenerationComplete(false);
    setColorHex(value);
  }

  useEffect(() => {
    if (darkColorGenerationComplete) return;
    if (colorHex === '000000' || colorHex === '000') return;
    let nextColorHex = colorHex;
    let newColorSet = [colorHex];
    while(nextColorHex !== '000000' && nextColorHex !== '000') {
      let redChannel = '';
      let greenChannel = '';
      let blueChannel = '';
      if (nextColorHex.length === 3) {
        redChannel = nextColorHex[0];
        greenChannel = nextColorHex[1];
        blueChannel = nextColorHex[2];
      } else if (nextColorHex.length === 6) {
        redChannel = `${nextColorHex[0]}${nextColorHex[1]}`;
        greenChannel = `${nextColorHex[2]}${nextColorHex[3]}`;
        blueChannel = `${nextColorHex[4]}${nextColorHex[5]}`;
      }
      const nextRed = parseInt(redChannel) - 1 > -1 ? parseInt(redChannel) - 1 : 0;
      const nextGreen = parseInt(greenChannel) - 1 > -1 ? parseInt(greenChannel) - 1 : 0;
      const nextBlue = parseInt(blueChannel) - 1 > -1 ? parseInt(blueChannel) - 1 : 0;
      nextColorHex = `${nextRed.toString(16)}${nextGreen.toString(16)}${nextBlue.toString(16)}`;
      newColorSet.push(nextColorHex);
      if (nextColorHex === '000000' || nextColorHex === '000') setDarkColorGenerationComplete(true);
    }
    setDarkColorSet(newColorSet);
  }, [colorHex, darkColorSet, darkColorGenerationComplete]);

  useEffect(() => {
    if (lightColorGenerationComplete) return;
    if (colorHex === 'ffffff' || colorHex === 'fff') return;
    let nextColorHex = colorHex;
    let newColorSet = [];
    while(nextColorHex !== 'ffffff' && nextColorHex !== 'fff') {
      let redChannel = '';
      let greenChannel = '';
      let blueChannel = '';
      if (nextColorHex.length === 3) {
        redChannel = nextColorHex[0];
        greenChannel = nextColorHex[1];
        blueChannel = nextColorHex[2];
      } else if (nextColorHex.length === 6) {
        redChannel = `${nextColorHex[0]}${nextColorHex[1]}`;
        greenChannel = `${nextColorHex[2]}${nextColorHex[3]}`;
        blueChannel = `${nextColorHex[4]}${nextColorHex[5]}`;
      }
      const nextRed = parseInt(redChannel) + 1 < 16 ? parseInt(redChannel) + 1 : 15;
      const nextGreen = parseInt(greenChannel) + 1 < 16 ? parseInt(greenChannel) + 1 : 15;
      const nextBlue = parseInt(blueChannel) + 1 < 16 ? parseInt(blueChannel) + 1 : 15;
      nextColorHex = `${nextRed.toString(16)}${nextGreen.toString(16)}${nextBlue.toString(16)}`;
      newColorSet.push(nextColorHex);
      if (nextColorHex === 'ffffff' || nextColorHex === 'fff') setLightColorGenerationComplete(true);
    }
    setLightColorSet(newColorSet);
  }, [colorHex, lightColorSet, lightColorGenerationComplete]);

  return (
    <div>
      Color Expander
      <Input onChange={handleChange} value={inputValue} />
      {lightColorSet.slice(0).reverse().map((color) => <Result key={color} color={color} />)}
      {darkColorSet.map((color) => <Result key={color} color={color} />)}
    </div>
  );
};
