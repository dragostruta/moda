const ResultTableModel = ({ id, finalObject }) => {
  const calculateSum = (array) => {
    let sum = 0;

    array?.map((item, index) => {
      sum = sum + parseFloat(item.count);
    });

    return sum.toFixed(2);
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
                    <div className="font-semibold text-center">Categorie</div>
                  </th>
                  <th className="p-2 ">
                    <div className="font-semibold text-center">
                      Pret per ora
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {finalObject ? (
                  finalObject.map((item, index) => {
                    return (
                      <tr className="border-b" key={index}>
                        <td className="p-2">
                          <div className="font-semibold text-center">
                            {index}
                          </div>
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
                      </tr>
                    );
                  })
                ) : (
                  <tr></tr>
                )}
              </tbody>
            </table>
            <div>
              <div className="text-[18px] flex justify-end font-semibold p-2 pr-5">
                Total: {calculateSum(finalObject)} lei
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultTableModel;
