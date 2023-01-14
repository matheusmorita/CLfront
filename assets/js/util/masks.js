export const getCurrencyMask = (value, locale = "pt-BR", currency = "BRL") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
