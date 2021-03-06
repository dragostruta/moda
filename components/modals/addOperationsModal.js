import { useContext, useEffect, useState } from "react";
import { findOperationFromArray } from "../../lib/utils";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";
import GetOperationAll from "../fetcher/getOperationsAll";
import ReactPaginate from "react-paginate";

const _ = require("lodash");

const AddOperationsModal = ({
  handleToggleAddOperationsModal,
  currentEmployee,
  handleSelectCurrentEmployee,
  handleAddEmployeeToFinalObject,
  handleCurrentEmployeeId,
  currentModel,
}) => {
  //  Operations list data fetched from the databasae
  const { operationsData, isLoading, isError } = GetOperationAll();
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

  const [modelsOperationList, setModelsOperationList] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    if (operationsSelectedList) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(operationsSelectedList.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(operationsSelectedList.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, operationsSelectedList]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % operationsSelectedList.length;
    setItemOffset(newOffset);
  };

  const getModelOperationAllFunc = async () => {
    const response = await fetch(
      `/api/modelOperation/getModelOperationAll?model_id=${currentModel}`,
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

  // At the first render of the page we populate the table if the current employee
  // has already some operations saved and reset the current operation
  useEffect(() => {
    if (
      state.finalObject.length > 0 &&
      state.finalObject?.find(
        (item) =>
          item.id === currentEmployee.id && item.fields.model === currentModel
      )
    ) {
      setOperationsSelectedList(
        state.finalObject?.find(
          (item) =>
            item.id === currentEmployee.id && item.fields.model === currentModel
        ).fields?.operationsSelectedList ?? []
      );
    }
    setCurrentOperation("");
    setCurrentOperationId("");
    getModelOperationAllFunc();
  }, []);

  // At every change of the OperationsData value we sort it.
  useEffect(() => {
    if (operationsData) {
      let list = [];
      modelsOperationList.map((element) => {
        operationsData.map((item) => {
          if (item.fields.id == element.fields.operation_id) {
            list.push(_.cloneDeep(item));
          }
        });
      });
      list.sort((a, b) => {
        return a.fields.id - b.fields.id;
      });
      console.log(list);
      setOperationList(list);
    }
  }, [operationsData, modelsOperationList]);

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
                  {operationList &&
                    operationList.map((item, key) => {
                      return (
                        <option key={key} value={item.id}>
                          {" "}
                          {item.fields.id + " - " + item.fields.Name}
                        </option>
                      );
                    })}
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
  const OperationTable = () => {
    return (
      <>
        {currentItems.map((item, key) => {
          return (
            <OperationRow
              key={key}
              operationId={currentItems[key].id}
              time={currentItems[key].fields.time}
              cost={currentItems[key].fields.cost}
              category={currentItems[key].fields.category}
              priceHour={currentItems[key].fields.priceHour}
              total={currentItems[key].fields.total}
              multiply={currentItems[key].fields.multiply}
            />
          );
        })}
        {pageCount * itemsPerPage === itemOffset + itemsPerPage ? (
          <OperationRow
            operationId={currentOperationId}
            lastOne={true}
            time={currentOperation.fields?.time}
            cost={currentOperation.fields?.cost}
            category={currentOperation.fields?.category}
            priceHour={currentOperation.fields?.priceHour}
            total={currentOperation.fields?.total}
            multiply={currentOperation.fields?.multiply}
          />
        ) : (
          <tr>
            <td></td>
          </tr>
        )}
        {currentItems.length === 0 ? (
          <OperationRow
            operationId={currentOperationId}
            lastOne={true}
            time={currentOperation.fields?.time}
            cost={currentOperation.fields?.cost}
            category={currentOperation.fields?.category}
            priceHour={currentOperation.fields?.priceHour}
            total={currentOperation.fields?.total}
            multiply={currentOperation.fields?.multiply}
          />
        ) : (
          <tr>
            <td></td>
          </tr>
        )}
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
    operation.fields["model"] = currentModel;
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

      setOperationsSelectedList(filteredArray);
      setCurrentOperation("");
      setCurrentOperationId("");
    }
  };

  const handleSelectOperation = async (value) => {
    if (!operationsSelectedList.find((item) => item.id === value)) {
      const operation = findOperationFromArray(value, operationList);
      const response = await fetch(
        `/api/modelOperation/getModelOperationAll?model_id=${currentModel}&operation_id=${operation.fields.id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCurrentOperationId(value);
      operation.fields.total = 0;
      operation.fields.cost = data.fields.count;
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
              <OperationTable />
            </tbody>
          </table>
          <ReactPaginate
            nextLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            }
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item pt-1"
            previousLinkClassName="page-link"
            nextClassName="page-item pt-1"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active bg-teal-400 rounded-full px-3 py-0.5 border-1.5 shadow text-white"
            renderOnZeroPageCount={null}
            className="flex justify-evenly px-[30rem] py-6 text-md"
          />
          <div className="flex justify-end p-4">
            <button
              className="bg-teal-400 rounded p-2 font-semibold text-white"
              onClick={() => {
                handleSaveButton();
              }}
            >
              Salvare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOperationsModal;
