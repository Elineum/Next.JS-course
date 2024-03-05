import getSlicedNum from "./getSlicedNum";

function getCalculatedRate(
  amount: number,
  firstRate: number,
  secondRate: number
): number {
  return getSlicedNum(+(amount * (firstRate / secondRate)));
}

export default getCalculatedRate;
