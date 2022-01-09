import "../styles/globals.css";
import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_MODAL_LOGIN: "SET_MODAL_LOGIN",
  SET_MODAL_REGISTER: "SET_MODAL_REGISTER",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_MODAL_LOGIN: {
      return { ...state, modalLogin: action.payload.modalLogin };
    }
    case ACTION_TYPES.SET_MODAL_REGISTER: {
      return { ...state, modalRegister: action.payload.modalRegister };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    modalLogin: false,
    modalRegister: false,
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
