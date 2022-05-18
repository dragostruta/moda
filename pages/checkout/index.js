import NavBar from "../../components/nav/navbar";
import SideBar from "../../components/nav/sidebar";
import { StoreContext, ACTION_TYPES } from "../../store/store-context";
import { useContext, useState, useEffect } from "react";

const CheckoutPage = () => {

    const { state, dispatch } = useContext(StoreContext);

    const [totalPrice, setTotalPrice] = useState(0);

    const shipping = 50;

    const [payment, setPayment] = useState(false);

    useEffect(() => {
        calculateTotalPrice();
    });

    const removeFromCart = () => {
        let remainingArr = [];
        dispatch({
            type: ACTION_TYPES.SET_CART_ITEMS,
            payload: { cartItems: remainingArr },
        });
    };

    const calculateTotalPrice = () => {
        let sum = 0;
        state.cartItems.map((item, key) => {
            sum = sum + parseInt(item.price) * item.quantity;
        });
        sum += 50;
        setTotalPrice(sum)
    };

    return (
        <div className="relative min-h-screen md:flex bg-gray-100 lg:pt-20">
            <section>
                <NavBar />
            </section>
            <SideBar />
            <div className="p-10 text-2xl font-bold flex-1">
                <section className="antialiased px-4 w-2/4 mx-auto">
                    <div className="flex flex-col justify-center h-full">
                        <div className="max-w-8xl bg-white shadow-lg rounded-lg border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100 flex">
                                <h2 className="font-semibold text-gray-800">Checkout</h2>
                            </header>
                            {!payment ? (
                                <div className="divide-y divide-gray-200">
                                    <div className="mt-8 p-10">
                                        <div className="flow-root">
                                            <ul
                                                role="list"
                                                className="-my-6 divide-y divide-gray-200"
                                            >
                                                {state.cartItems.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={product.image.url}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <a href={product.href}>
                                                                            {" "}
                                                                            {product.name}{" "}
                                                                        </a>
                                                                    </h3>
                                                                    <p className="ml-4">${product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    {product.color}
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <p className="text-gray-500">
                                                                    Buc. {product.quantity}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex pl-10 pr-10 pt-5 justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${totalPrice - 50}</p>
                                        </div>
                                        <div className="flex pl-10 pr-10 pt-5 justify-between text-base font-medium text-gray-900">
                                            <p>Shipping and taxes </p>
                                            <p>${shipping}</p>
                                        </div>
                                        <div className="flex pl-10 pr-10 pt-5 justify-between text-base font-medium text-gray-900">
                                            <p>Total </p>
                                            <p>${totalPrice}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="flex space-x-2 justify-center mt-10 mb-10">
                                            <button
                                                type="button"
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                                onClick={() => {
                                                    setPayment(true)
                                                    removeFromCart()
                                                }
                                                }
                                                class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            >Pay now</button>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div class="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                                    <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                                        <div class="text-green-500">
                                            <svg class="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div class="text-sm font-medium ml-3">Success Payment.</div>
                                    </div>
                                    <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Your Payment was Successful!</div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CheckoutPage;