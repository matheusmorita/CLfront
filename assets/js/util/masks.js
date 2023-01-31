export const getCurrencyMask = (value, locale = "pt-BR", currency = "BRL") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

export const getDateMask = (date, locale = "pt-BR", format = "medium") => {
    return new Intl.DateTimeFormat(locale, {
      format
    }).format(new Date(date));
};

export const getLotMask = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getQuantityMask = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Aqui interpretei que os valores futuros para finalização do lote serão lançados em segundos
export const getLotPeriodMask = (value) => {
    if(value){
      var date = new Date(value*1000);
      var day = date.getUTCDate();
      var month = date.getUTCMonth() + 1;
      var year = date.getUTCFullYear();
      return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`
    }else{
      return '';
    }
}