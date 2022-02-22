export const generateCrewInformation = (crews, mekaList, roboList) => {
  if (crews?.length > 0 && mekaList?.length > 0 && mekaList?.length > 0) {
    let allCrews = [];
    crews.forEach((crew) => {
      let item = {
        owner: crew.owner,
        id: crew.id,
        mekaApe: null,
        roboOogas: [],
      };
      let meka = mekaList.find((meka) => +meka.id === +crew?.tokens[0]);
      if (meka) {
        item.mekaApe = meka;
      }
      if (crew?.tokens?.length > 0) {
        crew.tokens.forEach((token, index) => {
          if (index > 0) {
            let robo = roboList.find((robo) => +robo.id === +token);
            if (robo) {
              item.roboOogas = [...item.roboOogas, robo];
            }
          }
        });
      }
      allCrews.push(item);
    });
    return allCrews;
  } else {
    return [];
  }
};
