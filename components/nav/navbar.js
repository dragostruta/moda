import { useContext, useEffect, useState } from "react";
import { getMetaData, isLoggedIn, logout } from "../../lib/magic-client";
import Logo from "../core/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { StoreContext } from "../../store/store-context";
import { ACTION_TYPES } from "../../store/store-context";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { toggleLoadingSpinner } from "../../lib/utils";

const NavBar = ({ handleToggleLoginModal }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const { state, dispatch } = useContext(StoreContext);

  const router = useRouter();

  useEffect(async () => {
    if (state.loggedUser) {
      setLoggedUser(state.loggedUser);
    } else {
      if (await isLoggedIn()) {
        const metaData = await getMetaData();
        setLoggedUser(metaData);
        dispatch({
          type: ACTION_TYPES.SET_LOGGED_USER,
          payload: { loggedUser: metaData },
        });
      }
    }
  }, []);

  const handleLogout = async () => {
    toggleLoadingSpinner(true, dispatch);
    dispatch({
      type: ACTION_TYPES.SET_LOGGED_USER,
      payload: { loggedUser: null },
    });
    await logout();
    router.push("/");
  };

  return (
    <div className="bg-white border-b lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-40">
      <div className="px-12 py-5 mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-10">
        <div className="flex justify-between">
          <div className="text-gray-800">
            <Logo />
          </div>
        </div>
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1">
          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-6 xl:space-x-8 lg:items-center">
            {router.route === "/" && loggedUser ? (
              <Link href={"/charts"}>
                <a>
                  <span className="font-semibold hover:text-teal-400 text-md">
                    Acasa
                  </span>
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
            {loggedUser === "" ? (
              <div
                className="flex items-center justify-center h-12 px-4 text-sm font-semibold text-center transition-colors duration-200 transform text-white rounded-md lg:h-10 bg-teal-400 hover:bg-teal-300 cursor-pointer"
                onClick={() => {
                  handleToggleLoginModal(true);
                }}
              >
                Autentificare
              </div>
            ) : (
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button>
                    <div className="flex items-center justify-center h-12 px-4 text-xl font-semibold text-center transition-colors duration-200 transform  rounded-md lg:h-10 text-teal-400 cursor-pointer ">
                      <span className="text-black pr-2">Buna</span>
                      {loggedUser}
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {() => (
                        <a
                          onClick={() => {
                            handleLogout();
                          }}
                          className="hover:bg-gray-50 block px-4 py-2 text-sm font-semibold "
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
