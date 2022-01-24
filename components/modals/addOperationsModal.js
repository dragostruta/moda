import { useContext, useEffect, useState } from "react";
import { findOperationFromArray } from "../../lib/utils";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

import getOperationAll from "../fetcher/getOperationsAll";
const AddOperationsModal = ({
  handleToggleAddOperationsModal,
  currentEmployee,
  handleSelectCurrentEmployee,
}) => {
  const { operationsData, isLoading, isError } = getOperationAll();
  const [operationsList, setOperationsList] = useState([]);
  const [currentOperationId, setCurrentOperationId] = useState("");
  const { dispatch, state } = useContext(StoreContext);
  const [currentEmployeeKey, setCurrentEmployeeKey] = useState("");
  const [operationsSelectedList, setOperationsSelectedList] = useState([]);
  const [currentOperation, setCurrentOperation] = useState("");
  const [dataReadyToBeSent, setDataReadyToBeSent] = useState(false);

  useEffect(() => {
    if (operationsData) {
      operationsData.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
      setOperationsList(operationsData);
    }
  }, [operationsData]);

  const OperationRow = ({ defaultValue, lastOne }) => {
    return (
      <tr>
        <td className="p-2 whitespace-nowrap w-24">
          <div className="font-medium text-center">
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select
                  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleSelectOperation(e.target.value);
                  }}
                  value={defaultValue}
                >
                  <option defaultValue value={""}>
                    Open this select menu
                  </option>
                  {operationsList &&
                    operationsList.map((item, key) => {
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
          <div className="text-center">03:00</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium text-teal-400">2,890.66</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">2,890.66</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">
            {lastOne ? (
              <button
                className="bg-teal-400 rounded font-semibold p-2 text-white"
                onClick={() => {
                  handleAddOperationRow(currentOperationId);
                }}
              >
                +
              </button>
            ) : (
              ""
            )}
          </div>
        </td>
      </tr>
    );
  };

  useEffect(() => {
    state.finalObject.filter((item, key) => {
      if (key === currentEmployee.id) {
        setCurrentEmployeeKey(key);
      }
    });
  }, []);

  const OperationTable = () => {
    return (
      <>
        {operationsSelectedList.map((item, key) => {
          return (
            <OperationRow
              key={key}
              defaultValue={operationsSelectedList[key].id}
            />
          );
        })}
        <OperationRow defaultValue={currentOperationId} lastOne={true} />
      </>
    );
  };

  useEffect(() => {
    if (dataReadyToBeSent) {
      const result = currentEmployee;
      result.fields.operationsSelectedList = operationsSelectedList;
      handleSelectCurrentEmployee(result);
      handleToggleAddOperationsModal(false);
    }
  }, [dataReadyToBeSent]);

  const handleAddOperationRow = (value) => {
    const operation = findOperationFromArray(value, operationsList);
    setOperationsSelectedList(operationsSelectedList.concat(operation));
    setCurrentOperationId("");
    setCurrentOperation("");
  };

  const handleSaveButton = () => {
    if (currentOperation) {
      setOperationsSelectedList(
        operationsSelectedList.concat(currentOperation)
      );
    }
    setDataReadyToBeSent(true);
  };

  const handleSelectOperation = (value) => {
    const operation = findOperationFromArray(value, operationsList);
    setCurrentOperationId(value);
    setCurrentOperation(operation);
  };

  return (
    <div
      className="bg-black bg-opacity-50 absolute inset-0 z-40 flex justify-center items-center"
      data-close={true}
      onClick={(event) => {
        if (event.target.getAttribute("data-close")) {
          handleToggleAddOperationsModal(false);
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
                handleToggleAddOperationsModal(false);
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
