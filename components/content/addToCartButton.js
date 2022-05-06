import { useState, useContext, useEffect, Fragment } from "react";
import { StoreContext, ACTION_TYPES } from "../../store/store-context";
import { Dialog, Transition } from "@headlessui/react";

const AddToCartButton = ({ product }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 500);
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      setDone(false);
    }, 500);
  }, [done]);

  return (
    <>
      <div className="flex">
        <Transition.Root show={loading} as="div">
          <Transition.Child
            as="div"
            enter="ease-in-out duration-1500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-1500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {loading ? (
              <div className="w-5 h-5 border-t-transparent border-4 border-teal-400 border-solid rounded-full animate-spin mt-1"></div>
            ) : (
              ""
            )}
          </Transition.Child>
        </Transition.Root>
        <Transition.Root show={loading} as="div">
          <Transition.Child
            as="div"
            enter="ease-in-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {done ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-400 transition duration-300 delay-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              ""
            )}
          </Transition.Child>
        </Transition.Root>

        <span
          onClick={() => {
            setLoading(true);
            let exists = state.cartItems.filter(
              (data) => data.id === product.id
            );
            if (exists.length > 0) {
              let items = state.cartItems;
              items.map((value) => {
                if (value.id === product.id) {
                  value.quantity += 1;
                }
              });
              dispatch({
                type: ACTION_TYPES.SET_CART_ITEMS,
                payload: { cartItems: items },
              });
            } else {
              product.quantity += 1;
              dispatch({
                type: ACTION_TYPES.SET_CART_ITEMS,
                payload: { cartItems: state.cartItems.concat(product) },
              });
            }
          }}
          className="bg-teal-400 rounded shadow-md cursor-pointer text-white p-1 text-sm ml-2"
        >
          Add to cart
        </span>
      </div>
    </>
  );
};

export default AddToCartButton;
