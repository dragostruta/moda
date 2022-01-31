import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import { StoreContext } from "../../store/store-context";
import SideBar from "../../components/nav/sidebar";
import Operations from "../../components/content/operations";
import { mutate } from "swr";

const ModalAdd = ({
  handleSetToggleModalAdd,
  handleChange,
  formValue,
  handleCreateObject,
}) => {
  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-40 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleSetToggleModalAdd(false);
        }
      }}
    >
      <div className="p-10 text-2xl font-bold w-[25%] ">
        <div className="bg-white rounded-lg shadow relative p-3">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                handleSetToggleModalAdd(false);
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
          <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900">
              Adaugare operatiune
            </h3>
            <div>
              <label
                htmlFor="id"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Cod
              </label>
              <input
                type="text"
                name="id"
                id="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
                placeholder="001"
                required
                value={formValue.id}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p className="p-2 text-red-500 font-semibold text-sm">{""}</p>
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Nume
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
                placeholder="Ambalare"
                required
                value={formValue.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p className="p-2 text-red-500 font-semibold text-sm">{""}</p>
            </div>
            <div>
              <label
                htmlFor="time"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Timp
              </label>
              <input
                type="text"
                name="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
                placeholder="03:00"
                required
                value={formValue.time}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p className="p-2 text-red-500 font-semibold text-sm">{""}</p>
            </div>
            <div>
              <label
                htmlFor="cost"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Cost
              </label>
              <input
                type="text"
                name="cost"
                id="cost"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
                placeholder="2.00"
                required
                value={formValue.cost}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <p className="p-2 text-red-500 font-semibold text-sm">{""}</p>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-teal-400 hover:bg-teal-300 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={(e) => {
                handleCreateObject(e);
              }}
            >
              Salvare!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const ModalDelete = ({
  handleSetToggleModalDelete,
  handleToBeDeletedId,
  toBeDeletedId,
}) => {
  const handleDelete = (id) => {
    fetch("/api/operation/deleteOperation", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleSetToggleModalDelete(false);
        handleToBeDeletedId("");
        mutate("/api/operation/getOperationAll");
      });
  };

  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-40 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleSetToggleModalDelete(false);
        }
      }}
    >
      <div className="p-10 text-2xl font-bold w-[25%] ">
        <div className="bg-white rounded-lg shadow relative p-3">
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                handleSetToggleModalDelete(false);
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
          <div className="text-md p-3">
            Esti sigur ca vrei sa stergi acesta operatiune?
          </div>
          <div className="flex justify-evenly py-3">
            <button
              onClick={() => {
                handleDelete(toBeDeletedId);
              }}
              className="p-2 bg-red-500 rounded text-white px-10 hover:bg-red-400"
            >
              Da
            </button>
            <button
              onClick={() => {
                handleSetToggleModalDelete(false);
              }}
              className="p-2 bg-teal-400 rounded text-white px-10 hover:bg-teal-300"
            >
              Nu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { dispatch } = useContext(StoreContext);
  const [toggleModalAdd, setToggleModalAdd] = useState(false);
  const [toggleModalDelete, setToggleModalDelete] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState("");
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
    time: "",
    cost: "",
  });

  const handleToBeDeletedId = (value) => {
    setToBeDeletedId(value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleCreateObject = (e) => {
    e.preventDefault();
    fetch("/api/operation/createOperation", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formValue.id,
        Name: formValue.name,
        time: formValue.time,
        cost: formValue.cost,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleSetToggleModalAdd(false);
        setFormValue({
          id: "",
          name: "",
          time: "",
          cost: "",
        });
        mutate("/api/operation/getOperationAll");
      });
  };

  const handleSetToggleModalAdd = (value) => {
    setToggleModalAdd(value);
  };

  const handleSetToggleModalDelete = (value) => {
    setToggleModalDelete(value);
  };

  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 lg:pt-20">
      <section>
        <NavBar />
      </section>
      <SideBar />
      {toggleModalAdd ? (
        <ModalAdd
          handleSetToggleModalAdd={handleSetToggleModalAdd}
          handleChange={handleChange}
          formValue={formValue}
          handleCreateObject={handleCreateObject}
        />
      ) : (
        ""
      )}
      {toggleModalDelete ? (
        <ModalDelete
          handleSetToggleModalDelete={handleSetToggleModalDelete}
          handleToBeDeletedId={handleToBeDeletedId}
          toBeDeletedId={toBeDeletedId}
        />
      ) : (
        ""
      )}
      <Operations
        handleSetToggleModalAdd={handleSetToggleModalAdd}
        handleSetToggleModalDelete={handleSetToggleModalDelete}
        handleToBeDeletedId={handleToBeDeletedId}
      />
    </div>
  );
};

export default Dashboard;
