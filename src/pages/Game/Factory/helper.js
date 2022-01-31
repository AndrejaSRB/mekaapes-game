import { v4 as uuidv4 } from "uuid";
import { BigNumber } from 'ethers';
// ******** Images ********
import PlaceholderApe from "../../../assets/placeholder_ape.png";
// ******** Services ********
import metamask from "../../../services/metamask";

export const getListLength = (list) => {
  if (list && list.length > 0) {
    return list.length;
  } else {
    return 0;
  }
};

export const getIfSelected = (selectAll, selected, id) => {
  if (selectAll) {
    return true;
  } else {
    if (selected && selected.length > 0) {
      return selected.find((item) => item.id === id);
    } else {
      return false;
    }
  }
};

export const handleClickApe =
  (ape, setSelectAll, selectAll, setSelected, selected) => () => {
    if (selectAll) {
      setSelectAll(false);
      setSelected([ape]);
    } else {
      if (selected && selected.length > 0) {
        if (selected.indexOf(ape) === -1) {
          setSelected([...selected, ape]);
        } else {
          let array = [...selected];
          let index = null;
          selected.forEach((baby, i) => {
            if (baby.id === ape.id) {
              index = i;
            }
          });
          array.splice(index, 1);
          setSelected(array);
        }
      } else {
        setSelected([ape]);
      }
    }
  };

const checkIfIsSelected = (selected, ape) => {
  if (selected?.length > 0) {
    let token = selected.find((item) => item.id === ape.id);
    if (token) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const handleClickStakedApe =
  (ape, isPlaceholder, selectAll, setSelectAll, selected, setSelected) =>
  () => {
    if (!isPlaceholder) {
      if (selectAll) {
        setSelectAll(false);
        setSelected([ape]);
      } else {
        if (selected && selected.length > 0) {
          if (!checkIfIsSelected(selected, ape)) {
            setSelected([...selected, ape]);
          } else {
            let array = [...selected];
            let index = null;
            selected.forEach((baby, i) => {
              if (baby.id === ape.id) {
                index = i;
              }
            });
            array.splice(index, 1);
            setSelected(array);
          }
        } else {
          setSelected([ape]);
        }
      }
    }
  };

export const generateMobilePlacholders = (list) => {
  let array = [...list];
  let length = list.length;
  if (length < 6) {
    let placeholderArray = Array.from({ length: 6 - length }, () => ({
      img: PlaceholderApe,
      name: "ape",
      placeholder: true,
      id: uuidv4(),
    }));
    array = [...list, ...placeholderArray];
  }
  return array;
};

export const shareApeList = (list, array) => {
  let apes = [...list];
  let totalLength = apes.length;
  if (totalLength > 6) {
    let box = apes.splice(0, 6);
    array.push(box);
    shareApeList(apes, array);
  } else {
    let box = generateMobilePlacholders(apes);
    array.push(box);
  }
};

export const arrangeStakedMobileList = (list) => {
  if (list && list.length > 0) {
    let array = [];
    shareApeList(list, array);
    return array;
  }
};

export const getApeName = (ape) => {
  let name = "";
  if (ape) {
    if (ape.oogaType === 0) {
      name = "Robo Ooga";
    } else {
      if (ape.level > 0) {
        name = "Mega Meka";
      } else {
        name = "MekaApe";
      }
    }
  }
  return name;
};

// not used anymore
export const getCurrentGasFee = async () => {
  let gasFeeMainnet = await metamask.signer.getFeeData(); // mainnet
  let gasPriceMainnet = gasFeeMainnet.gasPrice;
  let price = gasPriceMainnet.mul(107).div(100);
  return price;
};

export const getStakedRoboAmount = (list) => {
  let amount = 0;
  if (list?.length > 0) {
    list.forEach((item) => {
      if (item.oogaType === 0) {
        amount = amount + 1;
      }
    });
  }
  return amount;
};

export const beautifyNumber = (value) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formattedNumber = Number(value).toLocaleString("en", options);
  return formattedNumber;
};

export const beautifyPrice = (value) => {
  const formattedNumber = Number(value).toLocaleString("en");
  return formattedNumber;
};

export const getRandomArbitrary = () => {
  return Math.random() * (100 * 10 ** 9 - 1) + 1;
};

export const getReducedEstimatedGas = (gasEstimation) => {
  let totalGasEstimation = null;
  if (BigNumber.isBigNumber(gasEstimation)) {
    totalGasEstimation = gasEstimation.add(30000);
  }
  return totalGasEstimation;
};
