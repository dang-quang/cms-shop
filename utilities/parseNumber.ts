// export const parseNumber = (val: string) => {
//   const numericValue = val.replace(/[^\d.-]/g, ''); // Remove any non-digit, non-period, and non-minus characters
//   return numericValue.replace(/^-/, ''); // Remove leading minus sign, if present
// };

export const parseNumber = (text: string) => {
  const regex = /^[0-9]+$/;

  if (regex.test(text)) {
    return text;
  } else {
    return '';
  }
};
