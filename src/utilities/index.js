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
    let nextRedChannel = ((parseInt(redChannel, 16) - 17 < 0)
      ? parseInt(0).toString()
      : parseInt(redChannel, 16) - 17).toString(16);
    let nextGreenChannel = ((parseInt(greenChannel, 16) - 17 < 0)
      ? parseInt(0).toString()
      : parseInt(greenChannel, 16) - 17).toString(16);
    let nextBlueChannel = ((parseInt(blueChannel, 16) - 17 < 0)
      ? parseInt(0).toString()
      : parseInt(blueChannel, 16) - 17).toString(16);
    if (nextRedChannel.length === 1) nextRedChannel = `0${nextRedChannel}`;
    if (nextGreenChannel.length === 1) nextGreenChannel = `0${nextGreenChannel}`;
    if (nextBlueChannel.length === 1) nextBlueChannel = `0${nextBlueChannel}`;
    nextColor = `${nextRedChannel}${nextGreenChannel}${nextBlueChannel}`;
    darkenedColors.push(nextColor);
  }
  return darkenedColors.reverse();
}

function lightenColor(color) {
  let nextColor = color;
  const lightenedColors = [];
  while (nextColor !== 'ffffff') {
    const [redChannel, greenChannel, blueChannel] = splitChannels(nextColor);
    let nextRedChannel = ((parseInt(redChannel, 16) + 17 > 255)
      ? parseInt(255).toString(16)
      : parseInt(redChannel, 16) + 17).toString(16);
    let nextGreenChannel = ((parseInt(greenChannel, 16) + 17 > 255)
      ? parseInt(255).toString(16)
      : parseInt(greenChannel, 16) + 17).toString(16);
    let nextBlueChannel = ((parseInt(blueChannel, 16) + 17 > 255)
      ? parseInt(255).toString(16)
      : parseInt(blueChannel, 16) + 17).toString(16);  
    if (nextRedChannel.length === 1) nextRedChannel = `0${nextRedChannel}`;
    if (nextGreenChannel.length === 1) nextGreenChannel = `0${nextGreenChannel}`;
    if (nextBlueChannel.length === 1) nextBlueChannel = `0${nextBlueChannel}`;
    nextColor = `${nextRedChannel}${nextGreenChannel}${nextBlueChannel}`;
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

function addColors(colorA, colorB) {
  const [redChannelA, greenChannelA, blueChannelA] = splitChannels(colorA);
  const [redChannelB, greenChannelB, blueChannelB] = splitChannels(colorB);
  const mixedRed = parseInt(redChannelA, 16) + parseInt(redChannelB, 16);
  const mixedGreen = parseInt(greenChannelA, 16) + parseInt(greenChannelB, 16);
  const mixedBlue = parseInt(blueChannelA, 16) + parseInt(blueChannelB, 16);
  let redChannel = (mixedRed > 255)
    ? parseInt(255).toString(16)
    : mixedRed.toString(16);
  let greenChannel = (mixedGreen > 255)
    ? parseInt(255).toString(16)
    : mixedGreen.toString(16);
  let blueChannel = (mixedBlue > 255)
    ? parseInt(255).toString(16)
    : mixedBlue.toString(16);
  if (redChannel.length === 1) redChannel = `0${redChannel}`;
  if (greenChannel.length === 1) greenChannel = `0${greenChannel}`;
  if (blueChannel.length === 1) blueChannel = `0${blueChannel}`;
  return `${redChannel}${greenChannel}${blueChannel}`;
}

function subtractColors(colorA, colorB) {
  const [redChannelA, greenChannelA, blueChannelA] = splitChannels(colorA);
  const [redChannelB, greenChannelB, blueChannelB] = splitChannels(colorB);
  const mixedRed = parseInt(redChannelA, 16) - parseInt(redChannelB, 16);
  const mixedGreen = parseInt(greenChannelA, 16) - parseInt(greenChannelB, 16);
  const mixedBlue = parseInt(blueChannelA, 16) - parseInt(blueChannelB, 16);
  let redChannel = (mixedRed < 0)
    ? parseInt(0).toString(16)
    : mixedRed.toString(16);
  let greenChannel = (mixedGreen < 0)
    ? parseInt(0).toString(16)
    : mixedGreen.toString(16);
  let blueChannel = (mixedBlue < 0)
    ? parseInt(0).toString(16)
    : mixedBlue.toString(16);
  if (redChannel.length === 1) redChannel = `0${redChannel}`;
  if (greenChannel.length === 1) greenChannel = `0${greenChannel}`;
  if (blueChannel.length === 1) blueChannel = `0${blueChannel}`;
  return `${redChannel}${greenChannel}${blueChannel}`;
}

function averageColors(colorA, colorB) {
  const [redChannelA, greenChannelA, blueChannelA] = splitChannels(colorA);
  const [redChannelB, greenChannelB, blueChannelB] = splitChannels(colorB);
  const mixedRed = Math.round((parseInt(redChannelA, 16) + parseInt(redChannelB, 16)) / 2);
  const mixedGreen = Math.round((parseInt(greenChannelA, 16) + parseInt(greenChannelB, 16)) / 2);
  const mixedBlue = Math.round((parseInt(blueChannelA, 16) + parseInt(blueChannelB, 16)) / 2);
  let redChannel = (mixedRed > 255)
    ? parseInt(255).toString(16)
    : mixedRed.toString(16);
  let greenChannel = (mixedGreen > 255)
    ? parseInt(255).toString(16)
    : mixedGreen.toString(16);
  let blueChannel = (mixedBlue > 255)
    ? parseInt(255).toString(16)
    : mixedBlue.toString(16);
  if (redChannel.length === 1) redChannel = `0${redChannel}`;
  if (greenChannel.length === 1) greenChannel = `0${greenChannel}`;
  if (blueChannel.length === 1) blueChannel = `0${blueChannel}`;
  return `${redChannel}${greenChannel}${blueChannel}`;
}

function generateSecondaryColors(primaryColorA, primaryColorB, primaryColorC, blendType) {
  const blendColors = blendType === 'additive'
    ? addColors
    : blendType === 'subtractive'
    ? subtractColors
    : averageColors;
  const secondaryColorA = blendColors(primaryColorA, primaryColorB);
  const secondaryColorB = blendColors(primaryColorB, primaryColorC);
  const secondaryColorC = blendColors(primaryColorC, primaryColorA);
  return [secondaryColorA, secondaryColorB, secondaryColorC];
}

function generateTertiaryColors(
  primaryColorA,
  primaryColorB,
  primaryColorC,
  secondaryColorA,
  secondaryColorB,
  secondaryColorC,
  blendType,
) {
  const blendColors = blendType === 'additive'
    ? addColors
    : blendType === 'subtractive'
    ? subtractColors
    : averageColors;
  const tertiaryColorA = blendColors(primaryColorA, secondaryColorA);
  const tertiaryColorB = blendColors(secondaryColorA, primaryColorB);
  const tertiaryColorC = blendColors(primaryColorB, secondaryColorB);
  const tertiaryColorD = blendColors(secondaryColorB, primaryColorC);
  const tertiaryColorE = blendColors(primaryColorC, secondaryColorC);
  const tertiaryColorF = blendColors(secondaryColorC, primaryColorA);
  return [
    tertiaryColorA,
    tertiaryColorB,
    tertiaryColorC,
    tertiaryColorD,
    tertiaryColorE,
    tertiaryColorF,
  ];
}

export function expandColor(color, blendType) {
  const [primaryColorA, primaryColorB, primaryColorC] = rotateHue(color);
  const primaryColorSetA = expandLightness(primaryColorA);
  const primaryColorSetB = expandLightness(primaryColorB);
  const primaryColorSetC = expandLightness(primaryColorC);
  const [secondaryColorA, secondaryColorB, secondaryColorC] = generateSecondaryColors(primaryColorA, primaryColorB, primaryColorC, blendType);
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
    blendType,
  );
  const tertiaryColorSetA = expandLightness(tertiaryColorA);
  const tertiaryColorSetB = expandLightness(tertiaryColorB);
  const tertiaryColorSetC = expandLightness(tertiaryColorC);
  const tertiaryColorSetD = expandLightness(tertiaryColorD);
  const tertiaryColorSetE = expandLightness(tertiaryColorE);
  const tertiaryColorSetF = expandLightness(tertiaryColorF);
  const colorWheelData = [
    primaryColorA,
    primaryColorB,
    primaryColorC,
    secondaryColorA,
    secondaryColorB,
    secondaryColorC,
    tertiaryColorA,
    tertiaryColorB,
    tertiaryColorC,
    tertiaryColorD,
    tertiaryColorE,
    tertiaryColorF,
  ];
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
    colorWheelData,
  ];
}

// return true if black text is suitable overlay for given color
export function validateBlackContrast(color) {
  const [redChannel, greenChannel, blueChannel] = splitChannels(color);
  const red = parseInt(redChannel, 16);
  const green = parseInt(greenChannel, 16);
  const blue = parseInt(blueChannel, 16);
  const contrast = red * 0.299 + green * 0.587 + blue * 0.114;
  return contrast > 125 ? true : false;
}
