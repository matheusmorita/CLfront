export const captureEmail = (input) => {
  const regexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regexp.test(input) ? false : true;
}
