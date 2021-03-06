import { useContext, useState, useEffect } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { findEmployeeFromArray } from "../../lib/utils";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ChartsContent = ({
  handleToggleAddOperationsModal,
  employeesList,
  handleSelectCurrentEmployee,
  currentEmployee,
  handlePreview,
  handleAddEmployeeToFinalObject,
  currentEmployeeId,
  handleCurrentEmployeeId,
  handleSelectCurrentModel,
  currentModel,
  saveFinalObject,
}) => {
  // Context State initialization
  const { dispatch, state } = useContext(StoreContext);
  const { data, error } = useSWR("/api/model/getModelAll", fetcher);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    if (state.finalObject) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(state.finalObject.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(state.finalObject.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, state.finalObject]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % state.finalObject.length;
    setItemOffset(newOffset);
  };

  // Component for an entire row
  // employeeId - current employee id
  // lastOne - bool if the row is the last one from the table
  const EmployeeRow = ({
    employeeId,
    lastOne,
    total,
    totalTime,
    currentModelId,
  }) => {
    return (
      <tr>
        <td className="p-5 whitespace-nowrap w-24">
          <div className="font-medium text-center">
            <div className="flex justify-center">
              <div className="mb-3 xl:w-56">
                <select
                  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleSelectCurrentModel(e.target.value);
                  }}
                  value={currentModelId}
                >
                  <option defaultValue value={""}>
                    Alege model
                  </option>
                  {data &&
                    data.map((item, key) => {
                      return (
                        <option key={key} value={item.fields.id}>
                          {item.fields.id + " - " + item.fields.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </td>
        <td className="p-5 whitespace-nowrap w-24">
          <div className="font-medium text-center">
            <div className="flex justify-center">
              <div className="mb-3 xl:w-56">
                <select
                  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleSelectEmployee(e.target.value);
                  }}
                  value={employeeId}
                >
                  <option defaultValue value={""}>
                    Alege angajat
                  </option>
                  {employeesList &&
                    employeesList.map((item, key) => {
                      return (
                        <option key={key} value={item.id}>
                          {" "}
                          {item.fields.id +
                            " - " +
                            item.fields.FirstName +
                            " " +
                            item.fields.LastName}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap w-24">
          <div className="font-medium text-center">
            <div className="flex justify-center">
              <div className="mb-3 xl:w-56">
                {employeeId ? (
                  <button
                    className="bg-teal-400 rounded p-2 text-white font-semibold"
                    onClick={() => {
                      handleSelectCurrentEmployee(
                        findEmployeeFromArray(employeeId, employeesList)
                      );
                      handleSelectCurrentModel(currentModelId);
                      handleToggleAddOperationsModal(true);
                    }}
                  >
                    Adauga
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center">{totalTime ?? "00:00"}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium text-teal-400">
            {total ?? 0}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">
            {lastOne && employeeId ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => {
                  handleAddEmployeeToFinalObject(currentEmployee);
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
                  handleDelete(employeeId);
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

  const calculateTotalPriceForEmplyee = (employee) => {
    let sum = 0;
    employee.fields.operationsSelectedList?.map((item, key) => {
      sum += parseFloat(item.fields.total);
    });
    return sum.toFixed(2);
  };

  const calculateTotalTimeForEmployee = (employee) => {
    let minutes = 0;
    let seconds = 0;
    employee.fields.operationsSelectedList?.map((item, key) => {
      let time = item.fields.time.split(":");
      minutes +=
        parseInt(time[0]) * item.fields.multiply +
        (parseInt(time[1]) > 0
          ? Math.floor((parseInt(time[1]) * item.fields.multiply) / 60)
          : parseInt(time[1]));
      seconds += (parseInt(time[1]) * item.fields.multiply) % 60;
    });
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  // Emplyee Table Component
  const EmployeeTable = () => {
    return (
      <>
        {currentItems.map((item, key) => {
          return (
            <EmployeeRow
              key={key}
              employeeId={currentItems[key].id}
              currentModelId={currentItems[key].fields.model}
              total={calculateTotalPriceForEmplyee(currentItems[key])}
              totalTime={calculateTotalTimeForEmployee(currentItems[key])}
            />
          );
        })}
        {pageCount * itemsPerPage === itemOffset + itemsPerPage ? (
          <EmployeeRow
            employeeId={currentEmployeeId}
            lastOne={true}
            currentModelId={currentModel}
          />
        ) : (
          <tr>
            <td></td>
          </tr>
        )}
        {currentItems.length === 0 ? (
          <EmployeeRow
            employeeId={currentEmployeeId}
            lastOne={true}
            currentModelId={currentModel}
          />
        ) : (
          <tr>
            <td></td>
          </tr>
        )}
      </>
    );
  };

  const handleDelete = (id) => {
    if (state.finalObject.find((item) => item.id === id)) {
      let employeeToBeDeleted = state.finalObject.filter(
        (item) => item.id === id
      );
      let filteredArrayObject = state.finalObject.filter(
        (item) => item.id !== id
      );
      dispatch({
        type: ACTION_TYPES.SET_FINAL_OBJECT,
        payload: { finalObject: filteredArrayObject },
      });

      saveFinalObject(filteredArrayObject, "0");

      let filteredArrayEmployees = state.finalEmployeeList.filter(
        (item) => item !== employeeToBeDeleted[0].fields.id
      );

      dispatch({
        type: ACTION_TYPES.SET_FINAL_EMPLOYEE_LIST,
        payload: { finalEmployeeList: filteredArrayEmployees },
      });
      saveFinalObject(filteredArrayEmployees, "1");
    }
    handleSelectCurrentEmployee("");
    handleCurrentEmployeeId("");
  };

  // Once the Employee is selected from the list, on click the current employee id is set
  // And searches for the employee after that id
  // And sends to the parent component state the current employee in order to know
  const handleSelectEmployee = (id) => {
    if (
      !state.finalObject.find(
        (item) => item.id === id && item.fields.model === currentModel
      )
    ) {
      handleCurrentEmployeeId(id);
      const employee = findEmployeeFromArray(id, employeesList);
      handleSelectCurrentEmployee(employee);
    }
  };

  return (
    <div className="p-10 text-2xl font-bold flex-1 ">
      <section className="antialiased bg-gray- px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Norma</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap ">
                        <div className="font-semibold text-center">Model</div>
                      </th>
                      <th className="p-2 whitespace-nowrap ">
                        <div className="font-semibold text-center">Angajat</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Castig</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Timp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Tarif</div>
                      </th>

                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center"></div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    <EmployeeTable />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
      </section>
      <div
        onClick={() => {
          handlePreview(true);
          handleCurrentEmployeeId("");
        }}
        className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5"
      >
        Inainte
      </div>
    </div>
  );
};

export default ChartsContent;
