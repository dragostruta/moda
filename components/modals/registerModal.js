const RegisterModal = ({ handleToggleRegisterModal }) => {
  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-50 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleToggleRegisterModal(false);
        }
      }}
    >
      <div className="relative w-full max-w-md px-4 h-full md:h-auto">
        <div className="bg-white rounded-lg shadow relative">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                handleToggleRegisterModal(false);
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
              Inregistrare pe platforma
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Parola
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-300 focus:border-teal-300 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-teal-400 hover:bg-teal-300 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Inregistrare!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
