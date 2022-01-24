import { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { findEmployeeFromArray } from "../../lib/utils";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const ChartsContent = ({
  handleToggleAddOperationsModal,
  employeesList,
  handleSelectCurrentEmployee,
  currentEmployee,
}) => {
  // Component State The id of the current empolyee selected.
  const [currentId, setCurrentId] = useState("");
  // Context State initialization
  const { dispatch, state } = useContext(StoreContext);

  // Component for an entire row
  // employeeId - current employee id
  // lastOne - bool if the row is the last one from the table
  const EmployeeRow = ({ employeeId, lastOne, total }) => {
    return (
      <tr>
        <td className="p-5 whitespace-nowrap w-24">
          <div className="font-medium text-center">
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select
                  className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handleSelectEmployee(e.target.value);
                  }}
                  value={employeeId}
                >
                  <option defaultValue value={""}>
                    Open this select menu
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
              <div className="mb-3 xl:w-96">
                {employeeId ? (
                  <button
                    className="bg-teal-400 rounded p-2 text-white font-semibold"
                    onClick={() => {
                      handleSelectCurrentEmployee(
                        findEmployeeFromArray(employeeId, employeesList)
                      );
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
          <div className="text-center">00:00</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium text-teal-400">
            {total ?? 0}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">
            {lastOne && employeeId ? (
              <button
                className="bg-teal-400 rounded font-semibold p-2 text-white"
                onClick={() => {
                  handleAddEmployeeRow(currentEmployee);
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

  const calculateTotalPriceForEmplyee = (employee) => {
    let sum = 0;
    employee.fields.operationsSelectedList?.map((item, key) => {
      sum += parseFloat(item.fields.total);
    });
    return sum;
  };

  // Emplyee Table Component
  const EmployeeTable = () => {
    return (
      <>
        {state.finalObject.map((item, key) => {
          return (
            <EmployeeRow
              key={key}
              employeeId={state.finalObject[key].id}
              total={calculateTotalPriceForEmplyee(state.finalObject[key])}
            />
          );
        })}
        <EmployeeRow employeeId={currentId} lastOne={true} />
      </>
    );
  };

  // Saves the current Employee in the Context State and resets the current employee id
  const handleAddEmployeeRow = (employeeObject) => {
    if (employeeObject) {
      dispatch({
        type: ACTION_TYPES.SET_FINAL_OBJECT,
        payload: { finalObject: state.finalObject.concat(employeeObject) },
      });
    }
    setCurrentId("");
  };

  // Once the Employee is selected from the list, on click the current employee id is set
  // And searches for the employee after that id
  // And sends to the parent component state the current employee in order to know
  const handleSelectEmployee = (id) => {
    setCurrentId(id);
    const employee = findEmployeeFromArray(id, employeesList);
    handleSelectCurrentEmployee(employee);
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
                        <div className="font-semibold text-center">Angajat</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          Operatiune
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Timp</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Tarf</div>
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
            <footer className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 ">
                <div className="font-medium text-center">Total: 0 Lei</div>
              </h2>
            </footer>
          </div>
        </div>
      </section>
      <div className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5">
        Next
      </div>
    </div>
  );
};

export default ChartsContent;
