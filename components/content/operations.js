import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Operations = () => {
  const { data, error } = useSWR("/api/operation/getOperationAll", fetcher);

  console.log(data);

  return (
    <div className="p-10 text-2xl font-bold flex-1 ">
      <section className="antialiased bg-gray- px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-8xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Operatiuni</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Nume</div>
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
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {data
                      ? data.map((item, key) => {
                          return (
                            <tr key={key}>
                              <td className="p-5 whitespace-nowrap">
                                <div className="font-medium text-center">
                                  {item.fields.Name}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-center">03:00</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-center font-medium text-teal-400">
                                  2,890.66
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="font-medium text-center">
                                  2,890.66
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Operations;
