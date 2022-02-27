export const getAddedRobos = (newRobos, originalRobos) => {
  let added = [];
  if (newRobos?.length > 0) {
    newRobos.forEach((robo) => {
      if (originalRobos?.length > 0) {
        let token = originalRobos.find((item) => item.id === robo.id);
        if (!token) {
          added.push(robo);
        }
      } else {
        added.push(robo);
      }
    });
  }
  return added;
};

export const getDeletedRobos = (clickedRobos, originalRobos) => {
  let deleted = [];
  if (originalRobos?.length > 0) {
    originalRobos.forEach((robo) => {
      if (originalRobos?.length > 0) {
        let token = clickedRobos.find((item) => item.id === robo.id);
        if (!token) {
          deleted.push(robo);
        }
      } else {
        deleted.push(robo);
      }
    });
  }
  return deleted;
};

export const getListIds = (list) => {
  let ids = [];
  if (list?.length > 0) {
    list.forEach((item) => ids.push(item.id));
  }
  return ids;
};
