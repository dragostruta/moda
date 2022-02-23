import { useContext, useEffect, useRef, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const ResultTable = () => {
  const { dispatch, state } = useContext(StoreContext);
  const [employeeList, setEmplyeeList] = useState([]);

  useEffect(() => {
    let list = employeeList;
    state.finalObject.map((item, index) => {
      if (list.indexOf(item.fields.id) === -1) {
        list.push(item.fields.id);
      }
    });
    setEmplyeeList(list);
  }, []);

  useEffect(() => {
    console.log(state.finalObject);
    console.log(employeeList);
  }, [employeeList]);

  const calculateSum = (array) => {
    let sum = 0;

    array?.map((item, index) => {
      sum = sum + parseFloat(item.fields.total);
    });

    return sum.toFixed(2);
  };

  return (
    <div className="flex flex-col justify-center h-full">
      {employeeList.length > 0
        ? employeeList.map((item, index) => {
            let employeeObject = state.finalObject.find(
              (element) => element.fields.id === item
            );
            return (
              <div
                key={index}
                className="w-[100%] bg-white shadow-lg rounded-lg border border-gray-200"
              >
                <div className="p-3 py-10">
                  <div>
                    <div className="text-sm text-gray-400 p-2">
                      Castiguri individuale din norma
                    </div>
                    <table className="w-[100%]">
                      <thead className="text-xs font-semibold uppercase text-gray-800">
                        <tr>
                          <th className="p-2  ">
                            <div className="font-semibold text-center">
                              {employeeObject.fields.FirstName +
                                " " +
                                employeeObject.fields.LastName}
                            </div>
                          </th>
                          <th className="p-2 ">
                            <div className="font-semibold text-center">
                              Numar Marca:
                            </div>
                          </th>
                          <th className="p-2 ">
                            <div className="font-semibold text-center">
                              Loc de munca: {item}
                            </div>
                          </th>
                        </tr>
                      </thead>
                    </table>
                    <table className="w-[100%] table-auto">
                      <thead className="text-xs font-semibold uppercase text-gray-800 border-2 border-black">
                        <tr>
                          <th className="p-2  ">
                            <div className="font-semibold text-center">
                              Model
                            </div>
                          </th>
                          <th className="p-2 ">
                            <div className="font-semibold text-center">
                              Operatia
                            </div>
                          </th>
                          <th className="p-2 ">
                            <div className="font-semibold text-center">
                              Timp/Operatie
                            </div>
                          </th>
                          <th className="p-2 ">
                            <div className="font-semibold text-center">
                              Cantitate
                            </div>
                          </th>

                          <th className="p-2 ">
                            <div className="font-semibold text-center">
                              {" "}
                              Valoare Manopera
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {state.finalObject.map((element, index) => {
                          if (element.fields.id === item) {
                            element.fields.operationsSelectedList?.map(
                              (subItem, subIndex) => {
                                console.log(subItem);
                                return (
                                  <tr key={subIndex} className="border-b">
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.model}
                                      </div>
                                    </td>
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.Name}
                                      </div>
                                    </td>
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.time}
                                      </div>
                                    </td>
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.multiply}
                                      </div>
                                    </td>
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.total}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              }
                            );
                          }
                        })}
                      </tbody>
                    </table>
                    <div>
                      <div className="text-[18px] flex justify-end font-semibold p-2 pr-5">
                        Total castiguri individuale:{" "}
                        {/* {calculateSum(item.fields.operationsSelectedList)} lei */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};
export default ResultTable;
