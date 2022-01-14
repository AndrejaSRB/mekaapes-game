import { ethers, BigNumber } from "ethers";

export const getLevelText = (level) => {
  switch (level) {
    case 1:
      return (
        <>
          <li>Position: Scrap Scout</li>
          <li>Produce 1,000 $OG per day</li>
        </>
      );
    case 2:
      return (
        <>
          <li>Position: Garbage Compactor</li>
          <li>Produce 1,250 $OG per day</li>
          <li>Decrease the risk of $OG getting stolen to 25% when unstaking</li>
        </>
      );
    case 3:
      return (
        <>
          <li>Position: Factory Worker</li>
          <li>Produce 1,500 $OG per day</li>
          <li>Decrease the unstaking time by 25%</li>
        </>
      );
    case 4:
      return (
        <>
          <li>Position: Executive Bot</li>
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
