import { useContext, useEffect, useRef, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../../store/store-context";

const ResultTableModel = ({ id, model }) => {
  const { dispatch, state } = useContext(StoreContext);
  const [finalObject, setFinalObject] = useState([]);

  const calculateSum = (array) => {
    let sum = 0;

    array?.map((item, index) => {
      sum = sum + parseFloat((item.cost * item.count).toFixed(2));
    });

    return sum.toFixed(2);
  };

  useEffect(() => {
    getOperationAllFunc();
  }, []);

  const filterOperationList = (data) => {
    let list = [];
    data.filter((item) => {
      model.filter((element) => {
        if (
          item.fields.id === element.fields.operation_id &&
          element.fields.model_id === id
        ) {
          list.push({
            id: item.fields.id,
            name: item.fields.Name,
            time: item.fields.time,
            cost: item.fields.cost,
            category: item.fields.category,
            priceHour: item.fields.priceHour,
            count: element.fields.count,
          });
        }
      });
    });
    console.log(list);
    setFinalObject(list);
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
    filterOperationList(data);
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="w-[100%] bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-3 py-10">
          <div>
            <div className="text-sm text-gray-400 p-2">Model</div>
            <table className="w-[100%]">
              <thead className="text-xs font-semibold uppercase text-gray-800">
                <tr>
                  <th className="p-2  ">
                    <div className="font-semibold text-center">{id}</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center"></div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center"></div>
                  </th>
                </tr>
              </thead>
            </table>
            <table className="w-[100%] table-auto">
              <thead className="text-xs font-semibold uppercase text-gray-800 border-2 border-black">
                <tr>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">Faza</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">
                      Cod Operatie
                    </div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">
                      Denumire operatie
                    </div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">Timp</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">Tarif</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">Bucati</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">Categorie</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">
                      Pret per ora
                    </div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">Total</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {finalObject.map((item, index) => {
                  return (
                    <tr className="border-b" key={index}>
                      <td className="p-2">
                        <div className="font-semibold text-center">{index}</div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.id}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.name}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.time}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.cost}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.count}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.category}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {item.priceHour}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="font-semibold text-center">
                          {(item.cost * item.count).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <div className="text-[18px] flex justify-end font-semibold p-2 pr-5">
                Total castiguri: {calculateSum(finalObject)} lei
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultTableModel;
