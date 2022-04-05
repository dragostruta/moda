import { useContext, useEffect, useRef, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const ResultTable = () => {
  const { dispatch, state } = useContext(StoreContext);

  const calculateSum = (array) => {
    let sum = 0;

    array?.map((item, index) => {
      item?.map((element) => {
        sum = sum + parseFloat(element);
      });
    });

    return sum.toFixed(2);
  };

  const calculateTotalSum = () => {
    let sum = 0;
    state.finalObject.map((item) => {
      return item.fields.operationsSelectedList.map((element) => {
        sum += parseInt(element.fields.total);
      });
    });
    return sum.toFixed(2);
  };

  const calculatePricePerModel = () => {
    return (
      <div>
        {state.finalModelList.map((item) => {
          let sum = 0;
          let print = false;
          state.finalObject.map((element) => {
            if (element.fields.model === item.fields.id) {
              print = true;
            }
            if (!element.fields.operationsSelectedList) {
              element.fields.operationsSelectedList = [];
            }
            element.fields.operationsSelectedList?.map((item2) => {
              if (item2.fields.model === item.fields.id) {
                sum += parseFloat(item2.fields.cost);
              }
            });
          });
          if (print) {
            return (
              <div>
                Total {item.fields.id + " - " + item.fields.name} :{" "}
                {sum.toFixed(2)} lei
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="grid grid-cols-3 gap-4 py-4">
        <div></div>
        <div>{calculatePricePerModel()}</div>
        <div>Total: {calculateTotalSum()} lei</div>
      </div>

      {state.finalEmployeeList.length > 0
        ? state.finalEmployeeList.map((item, index) => {
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
                              {state.finalObject.find(
                                (element) => element.fields.id === item
                              ).fields.FirstName +
                                " " +
                                state.finalObject.find(
                                  (element) => element.fields.id === item
                                ).fields.LastName}
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
                            return element.fields.operationsSelectedList?.map(
                              (subItem, subIndex) => {
                                return (
                                  <tr key={subIndex} className="border-b">
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.model}
                                      </div>
                                    </td>
                                    <td className="p-2">
                                      <div className="font-semibold text-center">
                                        {subItem.fields.id +
                                          " - " +
                                          subItem.fields.Name}
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
                        {calculateSum(
                          state.finalObject.map((element, index) => {
                            if (element.fields.id === item) {
                              return element.fields.operationsSelectedList?.map(
                                (subItem) => {
                                  return subItem.fields.total;
                                }
                              );
                            }
                          })
                        )}{" "}
                        lei
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
