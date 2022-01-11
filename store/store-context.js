import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_MODAL_LOGIN: "SET_MODAL_LOGIN",
  SET_MODAL_REGISTER: "SET_MODAL_REGISTER",
  SET_LOADING_SPINNER: "SET_LOADING_SPINNER"
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_MODAL_LOGIN: {
      return { ...state, modalLogin: action.payload.modalLogin };
    }
    case ACTION_TYPES.SET_MODAL_REGISTER: {
      return { ...state, modalRegister: action.payload.modalRegister };
    }
    case ACTION_TYPES.SET_LOADING_SPINNER: {
        return { ...state, loadingSpinner: action.payload.loadingSpinner };
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    modalLogin: false,
    modalRegister: false,
    loadingSpinner: false
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
