import { ethers, BigNumber } from "ethers";

export const getLevelText = (level) => {
  switch (level) {
    case 1:
      return (
        <>
          <li>Position: Scrap Scout</li>
          <li>Produce 100 $OG per day</li>
        </>
      );
    case 2:
      return (
        <>
          <li>Position: Garbage Compactor</li>
          <li>Produce 200 $OG per day</li>
        </>
      );
    case 3:
      return (
        <>
          <li>Position: Factory Worker</li>
          <li>Produce 400 $OG per day</li>
        </>
      );
    case 4:
      return (
        <>
          <li>Position: Executive Bot</li>
          <li>Produce 700 $OG per day</li>
        </>
      );
    case 5:
      return (
        <>
          <li>Position: Degen</li>
          <li>Produce 1,200 $OG per day</li>
        </>
      );
    case 6:
      return (
        <>
          <li>Position: Super Elite</li>
          <li>Produce 2,000 $OG per day</li>
        </>
      );
    default:
      break;
  }
};

export const convertBigNumberToPrice = (price) => {
  if (price) {
    if (BigNumber.isBigNumber(price)) {
      return ethers.utils.formatUnits(price);
    } else {
      return price;
    }
  } else {
    return price;
  }
};

export const getAllPrices = (allPrices, level, counter) => {
  if (allPrices?.length > 0) {
    let totalPrice = BigNumber.from(0);
    let prices = [...allPrices];
    const slicedPrices = prices.slice(level, +level + +counter);
    slicedPrices.forEach((price) => {
      if (BigNumber.isBigNumber(price)) {
        totalPrice = totalPrice.add(price);
      }
    });
    return totalPrice;
  }
};
