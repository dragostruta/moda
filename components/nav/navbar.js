import Logo from "../core/logo";

const NavBar = ({ handleToggleRegisterModal, handleToggleLoginModal }) => {
  return (
    <div className="bg-white border-b lg:fixed lg:w-full lg:top-0 lg:left-0 lg:z-40">
      <div className="container px-4 py-5 mx-auto space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:space-x-10">
        <div className="flex justify-between">
          <div className="text-gray-800">
            <Logo />
          </div>
        </div>
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:flex-1">
          <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:space-x-6 xl:space-x-8 lg:items-center"></div>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
            <div
              className="flex items-center justify-center h-12 px-4 text-sm font-semibold text-center transition-colors duration-200 transform text-white rounded-md lg:h-10 bg-teal-400 hover:bg-teal-300 cursor-pointer"
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
