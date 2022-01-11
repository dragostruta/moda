import { ACTION_TYPES } from "../store/store-context";

export const toggleLoadingSpinner = (value, dispatch) => {
  dispatch({
    type: ACTION_TYPES.SET_LOADING_SPINNER,
    payload: { loadingSpinner: value },
  });
};
