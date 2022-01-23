import { ACTION_TYPES } from "../store/store-context";

export const toggleLoadingSpinner = (value, dispatch) => {
  dispatch({
    type: ACTION_TYPES.SET_LOADING_SPINNER,
    payload: { loadingSpinner: value },
  });
};

export const findEmployeeFromArray = (id, list) => {
  const returnedValue = list.filter((item, key) => {
    if (item.id === id) {
      return item;
    }
  });
  return returnedValue[0];
};

export const findOperationFromArray = (id, list) => {
  const returnedValue = list.filter((item, key) => {
    if (item.id === id) {
      return item;
    }
  });
  return returnedValue[0];
};
