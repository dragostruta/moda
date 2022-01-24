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
  const [currentId, setCurrentId] = useState("");
  const { dispatch, state } = useContext(StoreContext);

  const EmployeeRow = ({ defaultValue, lastOne }) => {
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
                  value={defaultValue}
                >
                  <option defaultValue value={""}>
                    Open this select menu
                  </option>
                  {employeesList &&
                    employeesList.map((item, key) => {
                      return (
                        <option key={key} value={item.id}>
                          {" "}
                          {item.fields.FirstName + " " + item.fields.LastName}
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
                {defaultValue ? (
                  <button
                    className="bg-teal-400 rounded p-2 text-white font-semibold"
                    onClick={() => {
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
          <div className="text-center font-medium text-teal-400">0</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">0</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="font-medium text-center">
            {lastOne ? (
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

  const EmployeeTable = () => {
    return (
      <>
        {state.finalObject.map((item, key) => {
          return (
            <EmployeeRow key={key} defaultValue={state.finalObject[key].id} />
          );
        })}
        <EmployeeRow defaultValue={currentId} lastOne={true} />
      </>
    );
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleAddEmployeeRow = (value) => {
    if (value) {
      dispatch({
        type: ACTION_TYPES.SET_FINAL_OBJECT,
        payload: { finalObject: state.finalObject.concat(value) },
      });
    }
    setCurrentId("");
  };

  const handleSelectEmployee = (value) => {
    setCurrentId(value);
    const employee = findEmployeeFromArray(value, employeesList);
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
                        <div className="font-semibold text-center">
                          Manopera
                        </div>
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
