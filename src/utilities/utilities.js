import Color from 'colorjs.io';

const rotateHue = (color, degrees) => {
  return color.clone().set({
    h: (color.h + degrees) % 360,
  });
};

const expandLightness = (color, increment) => {
  const colorSet = [color];
  let loopCount = 0;
  while (colorSet[0].l !== 0) {
    if (loopCount > 100) break;
    colorSet.unshift(colorSet[0].clone().set({
      l: colorSet[0].l - increment < 0 ? 0 : colorSet[0].l - increment,
    }));
    loopCount++;
  }
  while (colorSet[colorSet.length - 1].l !== 100) {
    if (loopCount > 100) break;
    colorSet.push(colorSet[colorSet.length - 1].clone().set({ 
      l: colorSet[colorSet.length - 1].l + increment > 100 ? 100 : colorSet[colorSet.length - 1].l + increment,
    }));
    loopCount++;
  }
  if (loopCount > 100) console.error('LOOP LIMIT REACHED...');
  return colorSet;
};

export const expandColor = (colorInput, increment) => {
  const formattedColorInput = colorInput[0] === '#' ? colorInput : '#' + colorInput;

  const primaryColorA = new Color(formattedColorInput).to('hsl');
  const primaryColorB = rotateHue(primaryColorA, 360 / 3);
  const primaryColorC = rotateHue(primaryColorB, 360 / 3);
  const secondaryColorA = rotateHue(primaryColorA, 360 / 6);
  const secondaryColorB = rotateHue(secondaryColorA, 360 / 3);
  const secondaryColorC = rotateHue(secondaryColorB, 360 / 3);
  const tertiaryColorA = rotateHue(primaryColorA, 360 / 12);
  const tertiaryColorB = rotateHue(tertiaryColorA, 360 / 6);
  const tertiaryColorC = rotateHue(tertiaryColorB, 360 / 6);
  const tertiaryColorD = rotateHue(tertiaryColorC, 360 / 6);
  const tertiaryColorE = rotateHue(tertiaryColorD, 360 / 6);
  const tertiaryColorF = rotateHue(tertiaryColorE, 360 / 6);

  const primaryColorSetA = expandLightness(primaryColorA, increment);
  const primaryColorSetB = expandLightness(primaryColorB, increment);
  const primaryColorSetC = expandLightness(primaryColorC, increment);
  const secondaryColorSetA = expandLightness(secondaryColorA, increment);
  const secondaryColorSetB = expandLightness(secondaryColorB, increment);
  const secondaryColorSetC = expandLightness(secondaryColorC, increment);
  const tertiaryColorSetA = expandLightness(tertiaryColorA, increment);
  const tertiaryColorSetB = expandLightness(tertiaryColorB, increment);
  const tertiaryColorSetC = expandLightness(tertiaryColorC, increment);
  const tertiaryColorSetD = expandLightness(tertiaryColorD, increment);
  const tertiaryColorSetE = expandLightness(tertiaryColorE, increment);
  const tertiaryColorSetF = expandLightness(tertiaryColorF, increment);
  const colorWheel = [
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

  return {
    primary: [
      primaryColorSetA,
      primaryColorSetB,
      primaryColorSetC,
    ],
    secondary: [
      secondaryColorSetA,
      secondaryColorSetB,
      secondaryColorSetC,
    ],
    tertiary: [
      tertiaryColorSetA,
      tertiaryColorSetB,
      tertiaryColorSetC,
      tertiaryColorSetD,
      tertiaryColorSetE,
      tertiaryColorSetF,
    ],
    colorWheel,
  };
};

export const getContrastColor = (color) => {
  const black = new Color('black');
  const white = new Color('white');
  const blackDelta = color.contrast(black, 'WCAG21');
  const whiteDelta = color.contrast(white, 'WCAG21');
  return whiteDelta > blackDelta ? white : black;
};

export const generateFavicon = (color) => {
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
  canvasContext.fillStyle = color.toString();
  canvasContext.fill();
  faviconLink.href = faviconImage.toDataURL();
  headElement.appendChild(faviconLink);
}

export const copyColorToClipboard = (color) => {
  const newInput = document.createElement('input');
  newInput.value = `${color.to('srgb').toString({ format: 'hex' })}`;
  document.body.appendChild(newInput);
  newInput.select();
  document.execCommand('copy');
  newInput.remove();
}

export const isValidColor = (color) => {
  try {
    new Color(color);
  } catch {
    return false;
  }
  return true;
})