export function formatHex (hex) {
  if (hex.length === 3) return hex;
  if (hex.length === 6) {
    if (
      hex[0] === hex[1] &&
      hex[2] === hex[3] &&
      hex[4] === hex[5]
    ) {
      return `${hex[0]}${hex[2]}${hex[4]}`;
    } else {
      return hex;
    }
  }
}

function splitChannels(color) {
  const redChannel = `${color[0]}${color[1]}`;
  const greenChannel = `${color[2]}${color[3]}`;
  const blueChannel = `${color[4]}${color[5]}`;
  return [redChannel, greenChannel, blueChannel]
}

function rotateHue(color) {
  const [redChannel, greenChannel, blueChannel] = splitChannels(color);
  const primaryColorA = `${redChannel}${greenChannel}${blueChannel}`;
  const primaryColorB = `${blueChannel}${redChannel}${greenChannel}`;
  const primaryColorC = `${greenChannel}${blueChannel}${redChannel}`;
  return [primaryColorA, primaryColorB, primaryColorC];
}

function darkenColor(color) {
  let nextColor = color;
  const darkenedColors = [];
  while (nextColor !== '000000') {
    const [redChannel, greenChannel, blueChannel] = splitChannels(nextColor);
    const nextRedChannel = ((parseInt(redChannel, 16) - 17 < 0) ? 0 : parseInt(redChannel, 16) - 17).toString(16);
    const nextGreenChannel = ((parseInt(greenChannel, 16) - 17 < 0) ? 0 : parseInt(greenChannel, 16) - 17).toString(16);
    const nextBlueChannel = ((parseInt(blueChannel, 16) - 17 < 0) ? 0 : parseInt(blueChannel, 16) - 17).toString(16);
    nextColor = `${nextRedChannel.length === 1
      ? `0${nextRedChannel}`
      : nextRedChannel}${nextGreenChannel.length === 1
        ? `0${nextGreenChannel}`
        : nextGreenChannel}${nextBlueChannel.length === 1
          ? `0${nextBlueChannel}`
          : nextBlueChannel}`;
    darkenedColors.push(nextColor);
  }
  return darkenedColors.reverse();
}

function lightenColor(color) {
  let nextColor = color;
  const lightenedColors = [];
  while (nextColor !== 'ffffff') {
    const [redChannel, greenChannel, blueChannel] = splitChannels(nextColor);
    const nextRedChannel = ((parseInt(redChannel, 16) + 17 > 255) ? parseInt(255).toString(16) : parseInt(redChannel, 16) + 17).toString(16);
    const nextGreenChannel = ((parseInt(greenChannel, 16) + 17 > 255) ? parseInt(255).toString(16) : parseInt(greenChannel, 16) + 17).toString(16);
    const nextBlueChannel = ((parseInt(blueChannel, 16) + 17 > 255) ? parseInt(255).toString(16) : parseInt(blueChannel, 16) + 17).toString(16);
    nextColor = `${nextRedChannel.length === 1
      ? `0${nextRedChannel}`
      : nextRedChannel}${nextGreenChannel.length === 1
        ? `0${nextGreenChannel}`
        : nextGreenChannel}${nextBlueChannel.length === 1
          ? `0${nextBlueChannel}`
          : nextBlueChannel}`;
    lightenedColors.push(nextColor);
  }
  return lightenedColors;
}

function expandLightness(color) {
  if (color === 'ffffff') {
    return [...darkenColor(color), color];
  } else if (color === '000000') {
    return [color, ...lightenColor(color)];
  }
  return [...darkenColor(color), color, ...lightenColor(color)];
}

function combineColors(colorA, colorB) {
  const [redChannelA, greenChannelA, blueChannelA] = splitChannels(colorA);
  const [redChannelB, greenChannelB, blueChannelB] = splitChannels(colorB);
  let redChannel = (parseInt(redChannelA, 16) + parseInt(redChannelB, 16) > 255) ? parseInt(255).toString(16) : (parseInt(redChannelA, 16) + parseInt(redChannelB, 16)).toString(16);
  let greenChannel = (parseInt(greenChannelA, 16) + parseInt(greenChannelB, 16) > 255) ? parseInt(255).toString(16) : (parseInt(greenChannelA, 16) + parseInt(greenChannelB, 16)).toString(16);
  let blueChannel = (parseInt(blueChannelA, 16) + parseInt(blueChannelB, 16) > 255) ? parseInt(255).toString(16) : (parseInt(blueChannelA, 16) + parseInt(blueChannelB, 16)).toString(16);
  if (redChannel === '0') redChannel = '00';
  if (greenChannel === '0') greenChannel = '00';
  if (blueChannel === '0') blueChannel = '00';
  console.log('COLOR',  `${redChannel}${greenChannel}${blueChannel}`);
  return `${redChannel}${greenChannel}${blueChannel}`;
}

function generateSecondaryColors(primaryColorA, primaryColorB, primaryColorC) {
  const secondaryColorA = combineColors(primaryColorA, primaryColorB);
  const secondaryColorB = combineColors(primaryColorB, primaryColorC);
  const secondaryColorC = combineColors(primaryColorC, primaryColorA);
  return [secondaryColorA, secondaryColorB, secondaryColorC];
}

function generateTertiaryColors(
  primaryColorA,
  primaryColorB,
  primaryColorC,
  secondaryColorA,
  secondaryColorB,
  secondaryColorC,
) {
  const tertiaryColorA = combineColors(primaryColorA, secondaryColorA);
  const tertiaryColorB = combineColors(secondaryColorA, primaryColorB);
  const tertiaryColorC = combineColors(primaryColorB, secondaryColorB);
  const tertiaryColorD = combineColors(secondaryColorB, primaryColorC);
  const tertiaryColorE = combineColors(primaryColorC, secondaryColorC);
  const tertiaryColorF = combineColors(secondaryColorC, primaryColorA);
  return [
    tertiaryColorA,
    tertiaryColorB,
    tertiaryColorC,
    tertiaryColorD,
    tertiaryColorE,
    tertiaryColorF,
  ];
}

export function expandColor(color) {
  const [primaryColorA, primaryColorB, primaryColorC] = rotateHue(color);
  const primaryColorSetA = expandLightness(primaryColorA);
  const primaryColorSetB = expandLightness(primaryColorB);
  const primaryColorSetC = expandLightness(primaryColorC);
  const [secondaryColorA, secondaryColorB, secondaryColorC] = generateSecondaryColors(primaryColorA, primaryColorB, primaryColorC);
  const secondaryColorSetA = expandLightness(secondaryColorA);
  const secondaryColorSetB = expandLightness(secondaryColorB);
  const secondaryColorSetC = expandLightness(secondaryColorC);
  const [
    tertiaryColorA,
    tertiaryColorB,
    tertiaryColorC,
    tertiaryColorD,
    tertiaryColorE,
    tertiaryColorF,
  ] = generateTertiaryColors(
    primaryColorA,
    primaryColorB,
    primaryColorC,
    secondaryColorA,
    secondaryColorB,
    secondaryColorC,
  );
  const tertiaryColorSetA = expandLightness(tertiaryColorA);
  const tertiaryColorSetB = expandLightness(tertiaryColorB);
  const tertiaryColorSetC = expandLightness(tertiaryColorC);
  const tertiaryColorSetD = expandLightness(tertiaryColorD);
  const tertiaryColorSetE = expandLightness(tertiaryColorE);
  const tertiaryColorSetF = expandLightness(tertiaryColorF);
  return [
    primaryColorSetA,
    primaryColorSetB,
    primaryColorSetC,
    secondaryColorSetA,
    secondaryColorSetB,
    secondaryColorSetC,
    tertiaryColorSetA,
    tertiaryColorSetB,
    tertiaryColorSetC,
    tertiaryColorSetD,
    tertiaryColorSetE,
    tertiaryColorSetF,
  ];
}
