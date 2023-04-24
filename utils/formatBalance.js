export const formatValueBalance = (balance) => {
  const balanceNumber = Number(balance)
  let balanceToFixed = balanceNumber.toFixed(2)
  let balanceString = balanceToFixed.toString()
  if (balanceString.includes('.')) {
    balanceString = balanceString.replace('.', ',')
  }
  return balanceString
}

export const formatValueWithoutComma = (balance) => {
  const balanceNumber = Number(balance) / 10 ** 18
  const balanceString = balanceNumber.toLocaleString('pt-BR')

  return balanceString
}