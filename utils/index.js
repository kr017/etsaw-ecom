export const isItemAdded = (list, id) => {
  if (list) {
    return list.find(item => {
      return item?.id === id;
    });
  }
  return false;
};
