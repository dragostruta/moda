import { useContext, useEffect, useState } from "react";
import { findOperationFromArray } from "../../lib/utils";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const _ = require("lodash");

import getOperationAll from "../fetcher/getOperationsAll";
const AddOperationsModal = ({
  handleToggleAddOperationsModal,
  currentEmployee,
  handleSelectCurrentEmployee,
  handleAddEmployeeToFinalObject,
  handleCurrentEmployeeId,
}) => {
  //  Operations list data fetched from the databasae
  const { operationsData, isLoading, isError } = getOperationAll();
  // Component State Current Operation id
  const [currentOperationId, setCurrentOperationId] = useState("");
  // Context State initialization
  const { dispatch, state } = useContext(StoreContext);
  // Component State The list of operations for Current Employee ready to be sent
  const [operationsSelectedList, setOperationsSelectedList] = useState([]);
  // Component State The current Operation selected
  const [currentOperation, setCurrentOperation] = useState("");
  // Bool if set to true the data will be sent to the parent component
  const [dataReadyToBeSent, setDataReadyToBeSent] = useState(false);

  const [operationList, setOperationList] = useState([]);

  // At every change of the OperationsData value we sort it.
  useEffect(() => {
    if (operationsData) {
      operationsData.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
      setOperationList(_.cloneDeep(operationsData));
    }
  }, [operationsData]);

  // At the first render of the page we populate the table if the current employee
  // has already some operations saved and reset the current operation
  useEffect(() => {
    if (
      state.finalObject.length > 0 &&
      state.finalObject?.find((item) => item.id === currentEmployee.id)
    ) {
      setOperationsSelectedList(
        state.finalObject?.find((item) => item.id === currentEmployee.id).fields
          ?.operationsSelectedList ?? []
      );
    }
    setCurrentOperation("");
    setCurrentOperationId("");
    setOperationList(_.cloneDeep(operationsData));
  }, []);

  // Component Operation Row
  const OperationRow = ({
    operationId,
    lastOne,
    time,
    cost,
    total,
    multiply,
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
                    Open this select menu
                  </option>
                  {operationList &&
                    operationList.map((item, key) => {
                      return (
                        <option key={key} value={item.id}>
                          {" "}
                          {item.fields.Name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center">{time ?? "00:00"}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium text-teal-400">
            {cost ?? 0}
          </div>
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
          <div className="font-medium text-center">{total ?? 0}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">
            {lastOne && operationId ? (
              <button
                className="bg-teal-400 rounded font-semibold p-2 text-white"
                onClick={() => {
                  handleAddOperationRow(operationId);
                }}
              >
                +
              </button>
            ) : !lastOne ? (
              <button
                className="bg-red-400 rounded text-md p-2 text-white"
                onClick={() => {
                  handleDelete(operationId);
                }}
              >
                -
              </button>
            ) : (
              ""
            )}
          </div>
        </td>
      </tr>
    );
  };

  // Component Operation Table
  const OperationTable = () => {
    return (
      <>
        {operationsSelectedList.map((item, key) => {
          return (
            <OperationRow
              key={key}
              operationId={operationsSelectedList[key].id}
              time={operationsSelectedList[key].fields.time}
              cost={operationsSelectedList[key].fields.cost}
              total={operationsSelectedList[key].fields.total}
              multiply={operationsSelectedList[key].fields.multiply}
            />
          );
        })}
        <OperationRow
          operationId={currentOperationId}
          lastOne={true}
          time={currentOperation.fields?.time}
          cost={currentOperation.fields?.cost}
          total={currentOperation.fields?.total}
          multiply={currentOperation.fields?.multiply}
        />
      </>
    );
  };

  // When the data is ready to be sent we add a operations list to the currentEmployee and send it
  // to the parent component
  useEffect(() => {
    if (dataReadyToBeSent) {
      const result = _.cloneDeep(currentEmployee);
      result.fields.operationsSelectedList = operationsSelectedList;
      handleAddEmployeeToFinalObject(result);
      handleSelectCurrentEmployee("");
      handleCurrentEmployeeId("");
      handleToggleAddOperationsModal(false);
    }
  }, [dataReadyToBeSent]);

  // Adding a new row and saving the data from the previous row into a list
  const handleAddOperationRow = (id) => {
    const operation = findOperationFromArray(id, operationList);
    setOperationsSelectedList(operationsSelectedList.concat(operation));
    setCurrentOperationId("");
    setCurrentOperation("");
  };

  const handleCloseButton = () => {
    // handleSelectCurrentEmployee("");
    // handleCurrentEmployeeId("");
    handleToggleAddOperationsModal(false);
  };

  // it Handles the save button and saves the last row data if the operation is selected
  const handleSaveButton = () => {
    if (currentOperation) {
      setOperationsSelectedList(
        operationsSelectedList.concat(currentOperation)
      );
    }
    setDataReadyToBeSent(true);
  };

  useEffect(() => {
    console.log(operationsSelectedList);
  }, [operationsSelectedList]);

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
      console.log(filteredArray);

      setOperationsSelectedList(filteredArray);
      setCurrentOperation("");
      setCurrentOperationId("");
    }
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

  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-40 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleCloseButton(false);
        }
      }}
    >
      <div className="p-10 text-2xl font-bold flex-1 ">
        <div className="bg-white rounded-lg shadow relative p-3">
          <div className="flex justify-end p-2">
            <header className="px-5 py-4">
              <h2 className="font-semibold text-gray-800">
                {currentEmployee
                  ? "Norma lui " +
                    currentEmployee.fields.FirstName +
                    " " +
                    currentEmployee.fields.LastName
                  : "Norma"}
              </h2>
            </header>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={() => {
                handleCloseButton(false);
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
                  <div className="font-semibold text-center">Timp</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Tarf</div>
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
              <OperationTable />
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

export default AddOperationsModal;
