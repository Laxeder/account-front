// Verifica contem números, letras acento
export const hasNumber = new RegExp(/[0-9]/i);
export const notHasNumber = new RegExp(/^[0-9]+/i);
export const hasLetter = new RegExp(/[a-zA-Z\u00C0-\u00FF]+/i);
export const hasLetterPhone = new RegExp('^[0-9+()-]+$');
export const notHasLetter = new RegExp(/^[a-zA-Z\u00C0-\u00FF]+/i);
export const hasAccent = new RegExp(/[\u00C0-\u00FF]+/i);

// Verifica se há somente números e letras
export const onlyNumbers = new RegExp('^[0-9]+$');
export const onlyNumbersRG = new RegExp('^[0-9-.]+$');
export const onlyLetters = new RegExp('^[a-zA-Z\u00C0-\u00FF ]+$');
export const onlyLettersNickname = new RegExp('^[a-zA-Z\u00C0-\u00FF]+$');

// Verifica se há letras maiúsculas e minúsculas
export const hasLetterUpperCase = new RegExp(/[A-Z]/i);
export const hasLetterLowerCase = new RegExp(/[a_z]/i);

// Verifica se contem caracteres especiais
export const hasCharSpecials = new RegExp(
  /[!@#$%^&*()\-,.?"~`'¨:;_{}|<>/|\\°£¢¬¹²³]/i
);
export const hasCharSpecialsRG = new RegExp(
  /[!@#$%^&*(),?"~`'¨:;_{}|<>|\\°£¢¬¹²³]/g
);
