import hmacSHA256 from 'crypto-js/hmac-sha256';
import forge from 'node-forge';

export function formatCurrency(number, havingCurrency=true) {
  if (!number) return "0₫";
  let currency = havingCurrency ? " HTG" : "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + currency;
}
export function formatNumber(number) {
  if (!number) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function formatPhoneNumber(phone) {
  if (!phone) return "0";
  let cleaned = ("" + phone).replace(/\D/g, "");

  //Check if the input is of correct length
  let match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return "(+" + match[1] + ") " + match[2] + " " + match[3] + " " + match[4];
  }
  return "+ " + phone;
}
//Check if the string has character utf8
export function hasUnicode(str) {
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) return true;
  }
  return false;
}
//Check if the string has Uppercase
export function hasUpperCase(str) {
  if (str.replace(/[^A-Z]/g, "").length > 0) {
    return true;
  } else {
    return false;
  }
}
//Check if the string has LowerCase
export function hasLowerCase(str) {
  return /[a-z]/.test(str);
}
//Check if the string has WhiteSpace
export function hasWhiteSpace(str) {
  return /\s/g.test(str);
}
//Check if the string has Number
export function hasNumber(str) {
  return /\d/.test(str);
}
//Check if the string has at least {number} digits
export function hasLeastDigits(str, number) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (hasNumber(str[i])) {
      count += 1;
    }
  }
  if (count >= number) {
    return true;
  } else {
    return false;
  }
}

export function previewUploadImage(e) {
  if (!e.target.files) return null;

  const imgFile = e.target.files[0];
  const previewImageSrc = URL.createObjectURL(imgFile);
  URL.revokeObjectURL(imgFile); // avoid memory leak

  return { imgSrc: previewImageSrc, imgFile: imgFile };
}

export const encryptString = async (text, publicRsa = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtHUg6FifQflG3uRAK1LsW3J+PSw6IxNbnHqZFHqiFxOtlqg80HOORW4hifSUS0wF+oW20wRdqI4RhJ2ddh8NX1psDX4KYw1OZkI8oiXSUc8Ang+fqaYLC1OkT8yBGV6OBGneetgTbqNdOr6QuHADtKzzd2DorPyKkU/V95t5TE4go9JtRV/nxqkpvf0KVz+/DdVsQzXs2o5DkLKLELZwaouCtCbZv8LDOXWTHtE6hHQaF4kPcNUPXfFt8yWt+k6vVH6XFaAJQlurpl7ukCio9y5ETitFXhQa4uMAoKwgQsj0FzYwTvZi/OjLBjjsy9eFizOzTDD0bUWoDNMvfK+UfQIDAQAB') => {
  const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----\n${publicRsa}\n-----END PUBLIC KEY-----`;
  try {
    const publicKeyObj = forge.pki.publicKeyFromPem(PUBLIC_KEY);
    const encrypted = publicKeyObj.encrypt(forge.util.encodeUtf8(text), 'RSAES-PKCS1-V1_5');
    return forge.util.encode64(encrypted).replace(/(\r\n|\n|\r)/gm, '').trim();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const encryptSha256 = async (text, signature) => {
  try {
    const hash = hmacSHA256(text, signature).toString();
    console.log('dvht1', hash)
    return hash;

  } catch (error) {
    return `${signature}`;
  }
};

export const decryptString = async (text, privateRsa) => {
  const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----\n${privateRsa}\n-----END RSA PRIVATE KEY-----`;
  try {
    const privateKey = forge.pki.privateKeyFromPem(PRIVATE_KEY);
    const decryptedData = privateKey.decrypt(forge.util.decode64(text), 'RSAES-PKCS1-V1_5');
  } catch (error) {
      return `${privateRsa}`;
  }
};