
export function isColorDark(hexColor) {
  hexColor = hexColor.replace('#', '');
  if (hexColor.length === 3) hexColor = hexColor.split('').map(x => x + x).join('');
  const r = parseInt(hexColor.substr(0,2),16);
  const g = parseInt(hexColor.substr(2,2),16);
  const b = parseInt(hexColor.substr(4,2),16);
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
  return luminance < 0.5;
}