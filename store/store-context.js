import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_MODAL_LOGIN: "SET_MODAL_LOGIN",
  SET_LOADING_SPINNER: "SET_LOADING_SPINNER",
  SET_LOGGED_USER: "SET_LOGGED_USER",
  SET_FINAL_OBJECT: "SET_FINAL_OBJECT",
  SET_FINAL_EMPLOYEE_LIST: "SET_FINAL_EMPLOYEE_LIST",
  SET_FINAL_MODEL_LIST: "SET_FINAL_MODEL_LIST",
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_FAVORITE_ITEMS: "SET_FAVORIE_ITEMS",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_MODAL_LOGIN: {
      return { ...state, modalLogin: action.payload.modalLogin };
    }
    case ACTION_TYPES.SET_LOADING_SPINNER: {
      return { ...state, loadingSpinner: action.payload.loadingSpinner };
    }
    case ACTION_TYPES.SET_LOGGED_USER: {
      return { ...state, loggedUser: action.payload.loggedUser };
    }
    case ACTION_TYPES.SET_FINAL_OBJECT: {
      return { ...state, finalObject: action.payload.finalObject };
    }
    case ACTION_TYPES.SET_FINAL_EMPLOYEE_LIST: {
      return { ...state, finalEmployeeList: action.payload.finalEmployeeList };
    }
    case ACTION_TYPES.SET_FINAL_MODEL_LIST: {
      return { ...state, finalModelList: action.payload.finalModelList };
    }
    case ACTION_TYPES.SET_CART_ITEMS: {
      return { ...state, cartItems: action.payload.cartItems };
    }
    case ACTION_TYPES.SET_FAVORITE_ITEMS: {
      return { ...state, favoriteItems: action.payload.favoriteItems };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    modalLogin: false,
    loadingSpinner: false,
    loggedUser: null,
    finalObject: [],
    finalEmployeeList: [],
    finalModelList: [],
    cartItems: [],
    favoriteItems: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
