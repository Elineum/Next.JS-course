function getConvertiongValue(
  amount: number,
  fromCurr: number,
  toCurr: number
): number {
  return Number((amount * (toCurr / fromCurr)).toFixed(4));
}

export default getConvertiongValue;
