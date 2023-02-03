export const captureEmail = (input) => {
  const regexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return !regexp.test(input);
};

export const captureName = (input) => {
  const regexp = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
  return !regexp.test(input);
};