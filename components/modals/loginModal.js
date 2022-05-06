import { useContext, useState } from "react";
import validator from "validator";
import { useRouter } from "next/router";
import { getMetaData, magic } from "../../lib/magic-client";
import { StoreContext } from "../../store/store-context";
import { toggleLoadingSpinner } from "../../lib/utils";
import { ACTION_TYPES } from "../../store/store-context";

const LoginModal = ({ handleToggleLoginModal }) => {
  const [userMsg, setUserMsg] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { dispatch } = useContext(StoreContext);

  const router = useRouter();

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (validator.isEmail(userEmail)) {
      try {
        toggleLoadingSpinner(true, dispatch);
        const didToken = await magic.auth.loginWithMagicLink({
          email: userEmail,
        });
        if (didToken) {
          dispatch({
            type: ACTION_TYPES.SET_LOGGED_USER,
            payload: { loggedUser: await getMetaData() },
          });
          router.push("/");
        }
      } catch {
        console.error("Something went wrong");
        toggleLoadingSpinner(false, dispatch);
      }
    } else {
      setUserMsg("*Introduce-ti o adresa de email valida");
    }
  };

  const handleOnChangeEmail = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    setUserMsg("");
  };

  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-40 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleToggleLoginModal(false);
        }
      }}
    >
      <div className="lg:w-1/4 md:w-1/3">
        <div className="bg-white rounded-lg shadow relative p-2">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                handleToggleLoginModal(false);
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form
            className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
            action="#"
          >
            <h3 className="text-xl font-medium text-gray-900">
              Autentificare pe platforma
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Adresa de email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
                placeholder="name@company.com"
                required
                onChange={(e) => {
                  handleOnChangeEmail(e);
                }}
              />
              <p className="p-2 text-red-500 font-semibold text-sm">
                {userMsg}
              </p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-teal-400 hover:bg-teal-300 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={(e) => {
                handleLoginWithEmail(e);
              }}
            >
              Autentificare!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
