import Head from "next/head";
import NavBar from "../components/core/navbar";
import Footer from "../components/core/footer";
import Image from "next/image";
import RegisterModal from "../components/modals/registerModal";
import { useContext, useState } from "react";
import LoginModal from "../components/modals/loginModal";
import { ACTION_TYPES, StoreContext } from "../store/store-context";
import LoadingSpinner from "../components/loading/loadingSpinner";

export default function Home() {
  const { dispatch, state } = useContext(StoreContext);
  const { modalLogin, modalRegister, loadingSpinner } = state;

  const handleToggleRegisterModal = (value) => {
    dispatch({
      type: ACTION_TYPES.SET_MODAL_REGISTER,
      payload: { modalRegister: value },
    });
  };

  const handleToggleLoginModal = (value) => {
    dispatch({
      type: ACTION_TYPES.SET_MODAL_LOGIN,
      payload: { modalLogin: value },
    });
  };

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Moda</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar
        handleToggleRegisterModal={handleToggleRegisterModal}
        handleToggleLoginModal={handleToggleLoginModal}
      />

      <main className="flex-1 lg:mt-20 bg-white">
        <section className="container px-4 py-6 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
          <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
            <h1 className="text-3xl leading-snug text-gray-800 md:text-4xl">
              Demo-ul unei <span className="font-semibold">aplicatii web</span>
              <br className="hidden lg:block" /> pentru{" "}
              <span className="text-teal-400 font-bold">Moda SCM </span>
            </h1>
          </div>
          <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
            <Image
              src="/images/hero-bg.svg"
              height={800}
              width={800}
              className="w-full h-full max-w-md mx-auto"
            />
          </div>
        </section>
        <section>
          {modalRegister ? (
            <RegisterModal
              handleToggleRegisterModal={handleToggleRegisterModal}
            />
          ) : (
            ""
          )}
          {modalLogin ? (
            <LoginModal
              handleToggleLoginModal={handleToggleLoginModal}
              handleToggleRegisterModal={handleToggleRegisterModal}
            />
          ) : (
            ""
          )}
        </section>
        <section>{loadingSpinner ? <LoadingSpinner /> : ""}</section>
      </main>

      <Footer />
    </div>
  );
}
