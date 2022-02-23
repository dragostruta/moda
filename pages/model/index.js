import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/nav/navbar";
import { toggleLoadingSpinner } from "../../lib/utils";
import { StoreContext } from "../../store/store-context";
import SideBar from "../../components/nav/sidebar";
import Model from "../../components/content/model";
import GetOperationAll from "../../components/fetcher/getOperationsAll";
import GetModelOperationAll from "../../components/fetcher/getModelOperationAll";
import { mutate } from "swr";
import { findOperationFromArray } from "../../lib/utils";

const _ = require("lodash");

// Component Operation Row
const OperationRow = ({
  operationId,
  lastOne,
  time,
  cost,
  total,
  multiply,
  category,
  priceHour,
  operationList,
  handleSelectOperation,
  handleSumTotal,
  handleAddOperationRow,
  handleDelete,
}) => {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap w-24">
        <div className="font-medium text-center">
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <select
                className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-400 focus:outline-none"
                aria-label="Default select example"
                onChange={(e) => {
                  handleSelectOperation(e.target.value);
                }}
                value={operationId}
              >
                <option defaultValue value={""}>
                  Alege operatiune
                </option>
                {operationList
                  ? operationList.length > 0
                    ? operationList.map((item, key) => {
                        return (
                          <option key={key} value={item.id}>
                            {" "}
                            {item.fields.Name}
                          </option>
                        );
                      })
                    : ""
                  : ""}
              </select>
            </div>
          </div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-center">{category ?? ""}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-center font-medium text-teal-400">
          {priceHour ?? 0}
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-center">{time ?? "00:00"}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-center font-medium text-teal-400">{cost ?? 0}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="font-medium text-teal-400 w-6 flex">
          {operationId ? (
            !multiply ? (
              <input
                className="border border-solid p-1 w-24 text-center focus:border-teal-400 focus:outline-none py-1.5"
                type="number"
                onChange={(e) => {
                  handleSumTotal(+e.target.value);
                }}
              />
            ) : (
              multiply
            )
          ) : (
            ""
          )}
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="font-medium text-center">
          {cost && multiply ? (cost * multiply).toFixed(2) : 0}
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="font-medium text-center">
          {lastOne && operationId ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                handleAddOperationRow(operationId);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          ) : !lastOne ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                handleDelete(operationId);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  );
};

// Component Operation Table
const OperationTable = ({
  operationsSelectedList,
  currentOperation,
  handleSelectOperation,
  handleSumTotal,
  handleAddOperationRow,
  handleDelete,
  operationList,
}) => {
  return (
    <>
      {operationsSelectedList.map((item, key) => {
        return (
          <OperationRow
            key={key}
            operationId={operationsSelectedList[key].id}
            time={operationsSelectedList[key].fields.time}
            cost={operationsSelectedList[key].fields.cost}
            category={operationsSelectedList[key].fields.category}
            priceHour={operationsSelectedList[key].fields.priceHour}
            total={operationsSelectedList[key].fields.total}
            multiply={operationsSelectedList[key].fields.multiply}
            operationList={operationList}
            handleSelectOperation={handleSelectOperation}
            handleSumTotal={handleSumTotal}
            handleAddOperationRow={handleAddOperationRow}
            handleDelete={handleDelete}
          />
        );
      })}
      <OperationRow
        operationId={currentOperation.id}
        lastOne={true}
        time={currentOperation.fields?.time}
        cost={currentOperation.fields?.cost}
        category={currentOperation.fields?.category}
        priceHour={currentOperation.fields?.priceHour}
        total={currentOperation.fields?.total}
        multiply={currentOperation.fields?.multiply}
        operationList={operationList}
        handleSelectOperation={handleSelectOperation}
        handleSumTotal={handleSumTotal}
        handleAddOperationRow={handleAddOperationRow}
        handleDelete={handleDelete}
      />
    </>
  );
};

const ModalAddOperation = ({
  handleSetToggleModalAddOperation,
  currentModelId,
}) => {
  //   const { modelsOperationsData } = GetModelOperationAll();
  const [modelsOperationList, setModelsOperationList] = useState([]);
  const [modelsOperationListAllModels, setModelsOperationListAllModels] =
    useState([]);
  const [currentModelObject, setCurrentModelObject] = useState("");
  const [operationsSelectedList, setOperationsSelectedList] = useState([]);
  const [currentOperation, setCurrentOperation] = useState("");
  const [currentOperationId, setCurrentOperationId] = useState("");
  const [operationList, setOperationList] = useState([]);
  //   const { operationsData, isLoading, isError } = GetOperationAll();
  const [dataReadyToBeSent, setDataReadyToBeSent] = useState(false);

  const getModelOperationAllFunc = async () => {
    const response = await fetch(
      `/api/modelOperation/getModelOperationAll?model_id=${currentModelId}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    data.sort((a, b) => {
      return a.fields.id - b.fields.id;
    });

    setModelsOperationList(data);
  };

  const getModelOperationAllModelsFunc = async () => {
    const response = await fetch(`/api/modelOperation/getModelOperationAll`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.sort((a, b) => {
      return a.fields.id - b.fields.id;
    });

    setModelsOperationListAllModels(data);
  };

  const getOperationAllFunc = async () => {
    const response = await fetch("/api/operation/getOperationAll", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    data.sort((a, b) => {
      return a.fields.id - b.fields.id;
    });
    setOperationList(data);
  };

  useEffect(() => {
    if (operationList && modelsOperationList) {
      let list = [];
      modelsOperationList.map((item, key) => {
        operationList.map((element) => {
          if (element.fields.id === item.fields.operation_id) {
            element.fields.multiply = item.fields.count;
            list.push(element);
          }
        });
      });

      setOperationsSelectedList(list);
      setCurrentOperation("");
      setCurrentOperationId("");
    }
  }, [operationList, modelsOperationList]);

  useEffect(() => {
    getModelOperationAllFunc();
    getOperationAllFunc();
    getModelOperationAllModelsFunc();
  }, []);

  const saveObject = (operation, key) => {
    if (
      !modelsOperationList.find(
        (item) =>
          item.fields.model_id == currentModelObject.fields.id &&
          item.fields.operation_id == operation.fields.id &&
          item.fields.count == operation.fields.multiply
      ) ||
      modelsOperationList.length === 0
    ) {
      fetch("/api/modelOperation/createModelOperation", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "" + parseInt(modelsOperationListAllModels.length + key + 1),
          model_id: currentModelObject.fields.id,
          operation_id: operation.fields.id,
          count: "" + operation.fields.multiply,
        }),
      })
        .then((response) => response.json())
        .then((data) => {});
    }
  };

  useEffect(() => {
    if (dataReadyToBeSent) {
      operationsSelectedList.map((item, key) => {
        saveObject(item, key);
      });
      handleSetToggleModalAddOperation(false);
    }
  }, [dataReadyToBeSent]);

  const getCurrentModelObject = () => {
    fetch(`/api/model/getModelById?id=${currentModelId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentModelObject(data[0]);
      });
  };

  const handleSelectOperation = (value) => {
    if (!operationsSelectedList.find((item) => item.id === value)) {
      const operation = findOperationFromArray(value, operationList);
      setCurrentOperationId(value);
      operation.fields.total = 0;
      setCurrentOperation(operation);
    }
  };

  const handleSumTotal = (value) => {
    const operation = currentOperation;
    operation.fields.total = (value * currentOperation.fields.cost).toFixed(2);
    operation.fields.multiply = value;
    setCurrentOperation(operation);
  };

  const handleAddOperationRow = (id) => {
    const operation = findOperationFromArray(id, operationList);
    setOperationsSelectedList(operationsSelectedList.concat(operation));
    setCurrentOperationId("");
    setCurrentOperation("");
  };

  const handleDelete = (id) => {
    if (operationsSelectedList.find((item) => item.id === id)) {
      let filteredArray = operationsSelectedList.filter(
        (item) => item.id !== id
      );
      operationList.map((item) => {
        if (item.id === id) {
          delete item.fields.multiply;
        }
      });
      let itemToBeDeleted = operationsSelectedList.find(
        (item) => item.id === id
      );
      let modelOperationToBeDeleted = modelsOperationList.find(
        (item) => item.fields.operation_id === itemToBeDeleted.fields.id
      );
      if (modelOperationToBeDeleted) {
        fetch("/api/modelOperation/deleteModelOperation", {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: modelOperationToBeDeleted.fields.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            mutate("/api/modelOperation/getModelOperationAll");
          });
      }

      setOperationsSelectedList(filteredArray);
      setCurrentOperation("");
      setCurrentOperationId("");
    }
  };

  const handleSaveButton = () => {
    if (currentOperation) {
      setOperationsSelectedList(
        operationsSelectedList.concat(currentOperation)
      );
    }
    setDataReadyToBeSent(true);
  };

  useEffect(() => {
    getCurrentModelObject();
  }, []);

  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-40 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleSetToggleModalAddOperation(false);
        }
      }}
    >
      <div className="p-10 text-2xl font-bold flex-1 ">
        <div className="bg-white rounded-lg shadow relative p-3">
          <div className="flex justify-end p-2">
            <header className="px-5 py-4">
              <h2 className="font-semibold text-gray-800">
                {currentModelObject ? currentModelObject.fields.name : ""}
              </h2>
            </header>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                handleSetToggleModalAddOperation(false);
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
          <table className="w-full table-auto">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Operatiune</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">
                    Categorie lucrari
                  </div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lei/Ora</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Timp</div>
                </th>

                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Tarif</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Buc.</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Manopera</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center"></div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              <OperationTable
                operationsSelectedList={operationsSelectedList}
                currentOperation={currentOperation}
                handleSelectOperation={handleSelectOperation}
                handleSumTotal={handleSumTotal}
                handleAddOperationRow={handleAddOperationRow}
                handleDelete={handleDelete}
                operationList={operationList}
              />
            </tbody>
          </table>
          <div className="flex justify-end p-4">
            <button
              className="bg-teal-400 rounded p-2 font-semibold text-white"
              onClick={() => {
                handleSaveButton();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              Adaugare model
            </h3>
            <div>
              <label
                htmlFor="id"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Cod model
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
                htmlFor="firstName"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Nume
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-400 focus:border-teal-400 block w-full p-2.5"
                required
                value={formValue.name}
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
    fetch("/api/model/deleteModel", {
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
        mutate("/api/model/getModelAll");
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
            Esti sigur ca vrei sa stergi acest model?
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
  const [toggleModalAddOperation, setToggleModalAddOperation] = useState(false);
  const [toBeDeletedId, setToBeDeletedId] = useState("");
  const [formValue, setFormValue] = useState({
    id: "",
    name: "",
  });
  const [currentModelId, setCurrentModelId] = useState("");

  const handleToBeDeletedId = (value) => {
    setToBeDeletedId(value);
  };

  const handleSetCurrentModelId = (value) => {
    setCurrentModelId(value);
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
    fetch("/api/model/createModel", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: formValue.id,
        name: formValue.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleSetToggleModalAdd(false);
        setFormValue({
          id: "",
          name: "",
        });
        mutate("/api/model/getModelAll");
      });
  };

  const handleSetToggleModalAdd = (value) => {
    setToggleModalAdd(value);
  };

  const handleSetToggleModalAddOperation = (value) => {
    setToggleModalAddOperation(value);
  };

  const handleSetToggleModalDelete = (value) => {
    setToggleModalDelete(value);
  };

  useEffect(() => {
    toggleLoadingSpinner(false, dispatch);
  }, []);

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 pt-20">
      <section>
        <NavBar />
      </section>
      <SideBar />
      {toggleModalAddOperation ? (
        <ModalAddOperation
          handleSetToggleModalAddOperation={handleSetToggleModalAddOperation}
          currentModelId={currentModelId}
        />
      ) : (
        ""
      )}
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
      <Model
        handleSetToggleModalAdd={handleSetToggleModalAdd}
        handleSetToggleModalDelete={handleSetToggleModalDelete}
        handleSetToggleModalAddOperation={handleSetToggleModalAddOperation}
        handleToBeDeletedId={handleToBeDeletedId}
        handleSetCurrentModelId={handleSetCurrentModelId}
        currentModelId={currentModelId}
      />
    </div>
  );
};

export default Dashboard;
