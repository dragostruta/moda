import Image from "next/image";

const NavBar = ({ handleToggleRegisterModal, handleToggleLoginModal }) => {
  return (
    <div className="bg-white bo rder-b lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-40">
      <div className="container px-4 py-5 mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-10">
        <div className="flex justify-between">
          <div className="text-gray-800">
            <div className="flex items-center cursor-default">
              <Image src="/images/hanger.svg" width={32} height={32} />
              <p className="ml-2 text-2xl">
                Moda <strong>SCM</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1">
          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-6 xl:space-x-8 lg:items-center">
            <div className="text-gray-500 hover:text-gray-800 cursor-pointer font-semibold">
              Acasa
            </div>
          </div>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
            <button
              className="flex items-center justify-center h-12 px-4 text-sm font-semibold text-center transition-colors duration-200 transform text-white rounded-md lg:h-10 bg-teal-400 hover:bg-teal-300 cursor-pointer"
              data-modal-toggle="authentication-modal"
              type="button"
              onClick={() => {
                handleToggleRegisterModal(true);
              }}
            >
              Inregistrare
            </button>
            <div
              className="flex items-center justify-center h-12 px-4 mt-2 text-sm text-center text-gray-600 transition-colors duration-200 transform border rounded-lg lg:h-10 hover:bg-gray-100 focus:outline-none cursor-pointer"
              onClick={() => {
                handleToggleLoginModal(true);
              }}
            >
              Autentificare
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
