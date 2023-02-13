export const dynamicBackground = (bgImage) => {
  return bgImage ? {background: `linear-gradient(to right, black, transparent), url(${bgImage})`} : undefined;
}