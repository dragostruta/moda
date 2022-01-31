import { useContext, useEffect, useRef } from "react";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const ResultTable = () => {
  const { dispatch, state } = useContext(StoreContext);
  console.log(state);

  const calculateSum = (array) => {
    let sum = 0;

    array.map((item, index) => {
      sum = sum + parseFloat(item.fields.total);
    });

    return sum;
  };

  return (
    <div className="flex flex-col justify-center h-full">
      {state.finalObject.map((item, index) => {
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
                          {item.fields.FirstName + " " + item.fields.LastName}
                        </div>
                      </th>
                      <th className="p-2 ">
                        <div className="font-semibold text-center">
                          Numar Marca:
                        </div>
                      </th>
                      <th className="p-2 ">
                        <div className="font-semibold text-center">
                          Loc de munca: {item.fields.id}
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
                <table className="w-[100%] table-auto">
                  <thead className="text-xs font-semibold uppercase text-gray-800 border-2 border-black">
                    <tr>
                      <th className="p-2  ">
                        <div className="font-semibold text-center">Model</div>
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
                    {item.fields.operationsSelectedList.map(
                      (subItem, subIndex) => {
                        return (
                          <tr key={subIndex} className="border-b">
                            <td className="p-2">
                              <div className="font-semibold text-center"></div>
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
                    )}
                  </tbody>
                </table>
                <div>
                  <div className="text-[18px] flex justify-end font-semibold p-2 pr-5">
                    Total castiguri individuale:{" "}
                    {calculateSum(item.fields.operationsSelectedList)} lei
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ResultTable;
