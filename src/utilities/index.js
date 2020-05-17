export function expandColor(color) {
  if (color === 'ffffff') {
    return [...darkenColor(color), color];
  } else if (color === '000000') {
    return [color, ...lightenColor(color)];
  }
  return [...darkenColor(color), color, ...lightenColor(color)];
}

function splitChannels(color) {
  const redChannel = `${color[0]}${color[1]}`;
  const greenChannel = `${color[2]}${color[3]}`;
  const blueChannel = `${color[4]}${color[5]}`;
  return [redChannel, greenChannel, blueChannel]
}

function lightenColor(color) {
  let nextColor = color;
  const lightenedColors = [];
  while (nextColor !== 'ffffff') {
    const [redChannel, greenChannel, blueChannel] = splitChannels(nextColor);
    const nextRedChannel = ((parseInt(redChannel, 16) + 17 > 255) ? 255 : parseInt(redChannel, 16) + 17).toString(16);
    const nextGreenChannel = ((parseInt(greenChannel, 16) + 17 > 255) ? 255 : parseInt(greenChannel, 16) + 17).toString(16);
    const nextBlueChannel = ((parseInt(blueChannel, 16) + 17 > 255) ? 255 : parseInt(blueChannel, 16) + 17).toString(16);
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

function darkenColor(color) {
  let nextColor = color;
  const darkenedColors = [];
  while (nextColor !== '000000') {
    const [redChannel, greenChannel, blueChannel] = splitChannels(nextColor);
    const nextRedChannel = ((parseInt(redChannel, 16) - 17 <= 0) ? 0 : parseInt(redChannel, 16) - 17).toString(16);
    const nextGreenChannel = ((parseInt(greenChannel, 16) - 17 <= 0) ? 0 : parseInt(greenChannel, 16) - 17).toString(16);
    const nextBlueChannel = ((parseInt(blueChannel, 16) - 17 <= 0) ? 0 : parseInt(blueChannel, 16) - 17).toString(16);
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
